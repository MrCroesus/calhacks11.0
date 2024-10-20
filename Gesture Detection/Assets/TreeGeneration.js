//@input Component.Camera camera
//@input Asset.ObjectPrefab myPrefab

function onTouchStart() {
  if (script.camera) {
//    var touchPosition = e.getTouchPosition();
//    var worldPosition = script.camera.screenSpaceToWorldSpace(
//      touchPosition,
//      200
//    );
    var mySceneObject = createObjectFromPrefab();
//    mySceneObject.getTransform().setWorldPosition(worldPosition);
  }
}
function createObjectFromPrefab() {
  if (script.myPrefab) {
    var instanceObject = script.myPrefab.instantiate(script.getSceneObject());
    return instanceObject;
  } else {
    return undefined;
  }
}

onTouchStart();