using System;
using System.Collections;
using UnityEngine;

public class BackendAdapter : MonoBehaviour
{
    public static string BackendUri = "http://localhost:3000/api";
    public static string ContractId = "unity-example.testnet";
    public static string TestAccount = "test.testnet";
    public bool Testnet = true;

    private void Start()
    {
        if (!Testnet)
        {
            BackendUri = "...mainnet";
            ContractId = "....mainnet";
        }
    }

    public IEnumerator CallViewMethod<T>(string contractId, string methodName, string args, Action<T> callbackFunction)
    {
        var requestData = RequestParamsBuilder.CreateFunctionCallRequest(contractId, methodName, args);
        var content = JsonUtility.ToJson(requestData);
        return WebHelper.SendPost<T>(BackendUri + "/near/call-view-function", content, callbackFunction);
    }

    public IEnumerator CallChangeMethod<T>(string contractId, string methodName, string args, Action<T> callbackFunction, string accountId, string privatekey, bool attachYoctoNear)
    {
        var requestData = RequestParamsBuilder.CreateFunctionCallRequest(contractId, methodName, args, accountId, privatekey, attachYoctoNear);
        var content = JsonUtility.ToJson(requestData);

        return WebHelper.SendPost<T>(BackendUri + "/near/call-change-function", content, callbackFunction);
    }

    public IEnumerator CallChangeMethodWithAttachment<T>(string contractId, string methodName, string args, Action<T> callbackFunction, string accountId, string privatekey, bool attachYoctoNear)
    {
        var requestData = RequestParamsBuilder.CreateFunctionCallRequest(contractId, methodName, args, accountId, privatekey, attachYoctoNear);
        var content = JsonUtility.ToJson(requestData);

        return WebHelper.SendPost<T>(BackendUri + "/near/get-transaction-signing-url", content, callbackFunction);
    }

}
