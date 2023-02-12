using System;

[Serializable]
public class BackendResponse<T>
{
    public bool success;
    public T data;
}

[Serializable]
public class RequestParams
{
    public string account_id;
    public string contract_id;
    public string method_name;
    public string args;
    public string privatekey;
    public string publickey;
    public bool attachYoctoNear;

}

[Serializable]
public class ProxyAccessKeyResponse
{
    public string privateKey;
    public string publicKey;
    public string loginUri;
}

[System.Serializable]
public class RequestParamsBuilder
{
    static public RequestParams CreateFunctionCallRequest(string contract_id, string methodName, string args, string accountId = null, string privatekey = null, bool attachYoctoNear = false)
    {
        return new RequestParams
        {
            contract_id = contract_id,
            account_id = accountId,
            method_name = methodName,
            args = args,
            privatekey = privatekey,
            attachYoctoNear = attachYoctoNear
        };
    }

    static public RequestParams CreateFunctionViewRequest<T>(string contract_id, string methodName, string args)
    {
        return new RequestParams
        {
            contract_id = contract_id,
            method_name = methodName,
            args = args,
        };

    }

    static public RequestParams CreateAccessKeyCheckRequest(string accountId, string publickey)
    {
        return new RequestParams
        {
            account_id = accountId,
            publickey = publickey,
        };
    }
}