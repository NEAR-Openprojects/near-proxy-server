export type WalletRequest = {
    account_id: string,
    private_key: string,
    action: string,
    contract_id: string,
    args: string | object,
    referrer: string,
    callback_url?: string,
    attached_near?: string,
    method_name: string,
    attached_gas?: string,
}