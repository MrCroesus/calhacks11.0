//@input SceneObject confirmWindow
//@input Component.Text confirmOption1
//@input Component.Text confirmOption2


var collider = script.getSceneObject().getComponent("Physics.ColliderComponent");
var store = global.persistentStorageSystem.store;

collider.onOverlapEnter.add(function (e) { 
    // Get hashes, hash1 comes first lexographically
    
    var hash1 = collider.getSceneObject().name;
    var hash2 = e.overlap.collider.getSceneObject().name;
    
//    var collisionKey = hash1 + "_" + hash2;
        
    small = hash1;
    large = hash2; 
    if (hash1 > hash2) {
        small = hash2;
        large = hash1; 
    }
    
    // Store in persistent store for API call
    store.putString('hash1', small);
    store.putString('hash2', large);
    
    print("Collision between " + small + " and " + large);
    
    branch_small = small.split("/")[0]
    branch_large = large.split("/")[0]    
    hash_small = small.split("/")[1]
    hash_large = large.split("/")[1]
    
   
    // Format pull request confirmation window
    script.confirmWindow.enabled = true;
    script.confirmOption1.text = "Merge " + branch_large + "/" + hash_large.slice(0, 4) + " into " + branch_small + "/" + hash_small.slice(0, 4);
    script.confirmOption2.text = "Merge " + branch_small + "/" + hash_small.slice(0, 4) + " into " + branch_large + "/" + hash_large.slice(0, 4);
   
    // global.behaviorSystem.sendCustomTrigger('pull_request');
 
});