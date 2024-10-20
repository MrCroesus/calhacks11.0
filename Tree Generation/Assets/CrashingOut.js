//@input SceneObject confirmWindow;

var collider = script.getSceneObject().getComponent("Physics.ColliderComponent");

var store = global.persistentStorageSystem.store;

collider.onOverlapEnter.add(function (e) {
    hash1 = collider.getSceneObject().name;
    hash2 = e.overlap.collider.getSceneObject().name;
    store.putString("hash1", hash1);
    store.putString("hash2", hash2);
    print("Collision between " + hash1 + " and " + hash2);
    
//    global.behaviorSystem.sendCustomTrigger('pull_request');
});