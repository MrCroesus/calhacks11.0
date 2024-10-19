//@input SceneObject sphere

const SIK = require('SpectaclesInteractionKit/SIK').SIK;
const handInputData = SIK.HandInputData;

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
    onPinched();
    print(
      `The left hand has pinched. The tip of the left index finger is: ${leftHand.indexTip.position}.`
    );
  });
  rightHand.onPinchDown.add(() => {
    onPinched();
    print(
      `The right hand has pinched. The tip of the right index finger is: ${rightHand.indexTip.position}.`
    );
  });
}

function onPinched() {
    script.sphere.enabled = false;
}

onAwake();