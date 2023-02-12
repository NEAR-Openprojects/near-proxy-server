using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

public class WebHelper
{

    static public IEnumerator SendPost<T>(string url, string dataString, Action<T> onSuccess)
    {
        var request = new UnityWebRequest(url, "POST");
        byte[] bodyRaw = Encoding.UTF8.GetBytes(dataString);
        request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.error != null)
        {
            //Error Handling
        }
        else
        {
            onSuccess(JsonUtility.FromJson<T>(request.downloadHandler.text));
        }
    }


    static public IEnumerator SendGet<T>(string url, Action<T> onSuccess)
    {
        var request = new UnityWebRequest(url, "GET");

        request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.error != null)
        {
            //Error Handling
        }
        else
        {
            onSuccess(JsonUtility.FromJson<T>(request.downloadHandler.text));
        }
    }
}
