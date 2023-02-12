
import * as nearApi from 'near-api-js';
import getConfig from './config';
import { serialize } from 'near-api-js/lib/utils/serialize';
import { SCHEMA, functionCall } from 'near-api-js/lib/transaction';
import { DEFAULT_FUNCTION_CALL_GAS, utils } from 'near-api-js';
import { TransactionManager } from 'near-transaction-manager';
import axios from 'axios';
import BN from 'bn.js';

const config = getConfig();

export async function getAccount(account_id: string, private_key: string) {

    const keyPair = nearApi.utils.KeyPair.fromString(private_key);
    const keyStore = new nearApi.keyStores.InMemoryKeyStore();
    keyStore.setKey("default", account_id, keyPair);

    const connectionConfig = {
        networkId: "default",
        keyStore: keyStore, // first create a key store
        nodeUrl: config.nodeUrl,
        walletUrl: config.walletUrl,
        helperUrl: config.helperUrl,
        explorerUrl: config.explorerUrl,
    };

    const near = await nearApi.connect(connectionConfig);
    return await near.account(account_id);
}

export function signMessage(input: string, private_key: string) {
    const keyPair = nearApi.utils.KeyPair.fromString(private_key);
    return keyPair.sign(new TextEncoder().encode(input));
}

export async function getAnonAccount() {
    const keyStore = new nearApi.keyStores.InMemoryKeyStore();

    const connectionConfig = {
        networkId: config.networkId,
        keyStore: keyStore, // first create a key store
        nodeUrl: config.nodeUrl,
        walletUrl: config.walletUrl,
        helperUrl: config.helperUrl,
        explorerUrl: config.explorerUrl,
    };

    const near = await nearApi.connect(connectionConfig);
    return await near.account("");
}

export function getSigningTransactionsWalletUrl(transactions: any[], referrer: string, callbackUrl?: string) {
    const newUrl = new URL('sign', config.walletUrl);

    newUrl.searchParams.set('transactions', transactions
        .map(transaction => serialize(SCHEMA, transaction))
        .map(serialized => Buffer.from(serialized).toString('base64'))
        .join(','));

    newUrl.searchParams.set('referrer', referrer);
    //#TODO: close window/tab automatically when no callbackurl is set?
    if (callbackUrl) newUrl.searchParams.set('callbackUrl', callbackUrl);

    return newUrl.toString();
}

export async function viewFunction(contract: string, method: string, args: any) {
    const account = await getAnonAccount();
    return await account.viewFunction(contract, method, args);
}

export async function changeFunctionWithoutAttachment(account_id: string, privatekey: string, contract_id: any, method: any, args: any, gas = DEFAULT_FUNCTION_CALL_GAS) {
    try {
        const nearAccount = await getAccount(account_id, privatekey);
        const response = await nearAccount.functionCall({ contractId: contract_id, methodName: method, args, gas, attachedDeposit: new BN("0") });

        //@ts-ignore
        if (response.status["SuccessValue"]) {
            //@ts-ignore
            return JSON.parse(Buffer.from(response.status["SuccessValue"], 'base64').toString());
        }

        return null
    }
    catch (err) {
        console.log(err);
        return err
    }
}

export async function changeFunctionWithAttachment(account_id: string, privatekey: string, contract_id: any, method: string, args: any, attachedDeposit: string, callbackUrl: string | undefined, gas = DEFAULT_FUNCTION_CALL_GAS) {
    try {
        const nearAccount = await getAccount(account_id, privatekey);

        const transactionManager = TransactionManager.fromAccount(nearAccount);
        const transaction = await transactionManager.createTransaction({
            receiverId: contract_id,
            actions: [functionCall(method, args || {}, gas, new BN(utils.format.parseNearAmount(attachedDeposit || "0") as string))],
        });

        const walletUrl = getSigningTransactionsWalletUrl([transaction], process.env.app_name || "NEAR Custom API", callbackUrl);
        return { success: true, data: walletUrl };
    }
    catch (err) {
        console.log(err);
        return { success: false, error: err };
    }
}

export async function isAccessKeyValid(account_id: any, publickey: any) {
    const response = await axios.post(config.nodeUrl, {
        jsonrpc: '2.0',
        id: 'dontcare',
        method: 'query',
        params: {
            request_type: 'view_access_key',
            finality: 'final',
            account_id: account_id,
            public_key: publickey
        }
    });

    if (response.data.result && response.data.result.error || response.data.error) {
        return { valid: false, allowance: 0, fullAccess: false };
    }
    if (response.data.result.permission == "FullAccess") {
        return { valid: true, allowance: 20000000000000000000000000, fullAccess: true };
    }
    return { valid: true, allowance: response.data.result.permission.FunctionCall.allowance, fullAccess: false };
}



export function checkFunctionResponse(response: any) {
    const HandledErrorTypes: string[] = ["LackBalanceForState", "NotEnoughAllowance"]

    if (!response.success) {
        if (!HandledErrorTypes.includes(response.error.type)) {
            throw response.error;
        }
        return false;
    }
    return true;
}