//@input SceneObject descriptionWindow
//@input Component.Text description
//@input Asset.RemoteServiceModule remoteServiceModule

var store = global.persistentStorageSystem.store;

script.onPinch = function() {
    print("touch!");
    owner = store.getString("owner");
    repo = store.getString("repo");
    
    hashItem = script.getSceneObject().name;
    items = hashItem.split("/");
    hash = items[1];
    print(hash);
    script.descriptionWindow.enabled = true;
    
    var myRemoteServiceModule = script.remoteServiceModule;    
    var httpRequest = RemoteServiceHttpRequest.create();
    httpRequest.url = 'https://calhacks11-0.vercel.app/' + 'commit/' + owner + '/' + repo + '/get/' + hash;
    print(httpRequest.url);
    httpRequest.method = RemoteServiceHttpRequest.HttpRequestMethod.Get; 
    print('Sending request!');
    
    myRemoteServiceModule.performHttpRequest(httpRequest, function (response) {
      print('Request response received');
      print('Status code: ' + response.statusCode);
      print('Content type: ' + response.contentType);
      print('Body: ' + response.body);
      print('Headers: ' + response.headers);
      script.description.text = response.body;
    });
}