//@input SceneObject confirmWindow
//@input SceneObject descriptionWindow
//@input Asset.RemoteServiceModule remoteServiceModule

var store = global.persistentStorageSystem.store;

script.hash1ToHash2 = function() {
    
    hash1_item = store.getString('hash1');
    hash2_item = store.getString('hash2');
    
    let item1 = hash1_item.split("/");
    let item2 = hash2_item.split("/");
    
    let branch1 = item1[0];
    let hash1 = item1[1];
    let branch2 = item2[0];
    let hash2 = item2[1];
    
    var myRemoteServiceModule = script.remoteServiceModule;    
    var httpRequest = RemoteServiceHttpRequest.create();
    httpRequest.url = 'https://calhacks11-0.vercel.app/' + 'createpr/rovirmani/currgoatify/' + branch1 + "/" + branch2;
    httpRequest.method = RemoteServiceHttpRequest.HttpRequestMethod.Get; 
    print('Sending request!');
    
    myRemoteServiceModule.performHttpRequest(httpRequest, function (response) {
      print('Request response received');
      print('Status code: ' + response.statusCode);
      print('Content type: ' + response.contentType);
      print('Body: ' + response.body);
      print('Headers: ' + response.headers);
    });
}

script.hash2ToHash1 = function() {
    hash1_item = store.getString('hash1');
    hash2_item = store.getString('hash2');
    
    let item1 = hash1_item.split("/");
    let item2 = hash2_item.split("/");
    
    let branch1 = item1[0];
    let hash1 = item1[1];
    let branch2 = item2[0];
    let hash2 = item2[1];
    
    var myRemoteServiceModule = script.remoteServiceModule;    
    var httpRequest = RemoteServiceHttpRequest.create();
    httpRequest.url = 'https://calhacks11-0.vercel.app/' + 'createpr/rovirmani/currgoatify/' + branch2 + "/" + branch1;
    httpRequest.method = RemoteServiceHttpRequest.HttpRequestMethod.Get; 
    print('Sending request!');
    
    myRemoteServiceModule.performHttpRequest(httpRequest, function (response) {
      print('Request response received');
      print('Status code: ' + response.statusCode);
      print('Content type: ' + response.contentType);
      print('Body: ' + response.body);
      print('Headers: ' + response.headers);
    });
}

script.confirmCancel = function() {
    script.confirmWindow.enabled = false;
}

script.descriptionCancel = function() {
    script.descriptionWindow.enabled = false;
}