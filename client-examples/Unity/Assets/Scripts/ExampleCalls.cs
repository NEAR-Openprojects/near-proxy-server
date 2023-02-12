using Assets.Scenes.Scripts;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class ExampleCalls : MonoBehaviour
{
    public BackendAdapter backendAdapter;

    public void Login()
    {
        StartCoroutine(WebHelper.SendGet<ProxyAccessKeyResponse>(BackendAdapter.BackendUri + "/near/get-ed25519pair", LoginCallback));
    }

    private void LoginCallback(ProxyAccessKeyResponse res)
    {
        PlayerPrefs.SetString("account", BackendAdapter.TestAccount);
        PlayerPrefs.SetString("pkey", res.privateKey);
        PlayerPrefs.SetString("pubkey", res.publicKey);
        Application.OpenURL(res.loginUri + "&contract_id=" + BackendAdapter.ContractId);
    }

    public void LoadScores()
    {
        StartCoroutine(backendAdapter.CallViewMethod<BackendResponse<List<HighScoreReturn>>>(BackendAdapter.ContractId, "get_highscore_list", "", LoadScoresCallback));
    }

    public void LoadScoresCallback(BackendResponse<List<HighScoreReturn>> res)
    {
        Debug.Log(JsonUtility.ToJson(res.data[0]));
    }
}
