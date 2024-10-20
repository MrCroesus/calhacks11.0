var collider = script.getSceneObject().getComponent("Physics.ColliderComponent");

collider.onOverlapEnter.add(function (e) {
    print("Collision between " + collider.getSceneObject().name + " and " + e.overlap.collider.getSceneObject().name);
    global.behaviorSystem.sendCustomTrigger('test_trigger');
});