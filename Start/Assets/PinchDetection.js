//@input SceneObject sphere
//@input Component.Camera camera
//@input Asset.ObjectPrefab myPrefab

const SIK = require('SpectaclesInteractionKit/SIK').SIK;
const handInputData = SIK.HandInputData;
const interactionManager = SIK.InteractionManager;
const interactorInputType =
  require('SpectaclesInteractionKit/Core/Interactor/Interactor').InteractorInputType;

function onAwake() {
  // Wait for other components to initialize by deferring to OnStartEvent.
  script.createEvent('OnStartEvent').bind(() => {
    onStart();
  });
}

function onStart() {
  // Fetch the TrackedHand for left and right hands.
  var leftHand = handInputData.getHand('left');
  var rightHand = handInputData.getHand('right');

  // Add print callbacks for whenever these hands pinch.
  leftHand.onPinchDown.add(() => {
    var leftHandInteractor = interactionManager.getInteractorsByType(
      interactorInputType.LeftHand
    )[0];
    print(leftHandInteractor.startPoint);
    onPinched(leftHandInteractor.startPoint);
    print(
      `The left hand has pinched. The tip of the left index finger is: ${leftHand.indexTip.position}.`
    );
  });
  rightHand.onPinchDown.add(() => {
    var rightHandInteractor = interactionManager.getInteractorsByType(
      interactorInputType.RightHand
    )[0];
    print(rightHandInteractor.startPoint);
    onPinched(rightHandInteractor.startPoint);
    print(
      `The right hand has pinched. The tip of the right index finger is: ${rightHand.indexTip.position}.`
    );
  });
}

function onPinched(touchPosition) {
    script.sphere.enabled = false;
    print(touchPosition);
    onTouchStart(touchPosition);
}

function onTouchStart(touchPosition) {
  print(touchPosition);
  if (script.camera) {
    var mySceneObject = createObjectFromPrefab();
    mySceneObject.getTransform().setWorldPosition(touchPosition);
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

onAwake();