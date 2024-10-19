const SIK = require('SpectaclesInteractionKit/SIK').SIK;
const interactionManager = SIK.InteractionManager;
const interactorInputType =
  require('SpectaclesInteractionKit/Core/Interactor/Interactor').InteractorInputType;

function onAwake() {
  // Wait for other components to initialize by deferring to OnStartEvent.
  script.createEvent('UpdateEvent').bind(() => {
    onUpdate();
  });
}

function onUpdate() {
  // Fetch the HandInteractor for left and right hands.
  var leftHandInteractor = interactionManager.getInteractorsByType(
    interactorInputType.LeftHand
  )[0];
  var rightHandInteractor = interactionManager.getInteractorsByType(
    interactorInputType.RightHand
  )[0];

  // Print the position and direction of the HandInteractors each frame.
//  print(
//    `The left hand interactor is at position: ${leftHandInteractor.startPoint} and is pointing in direction: ${leftHandInteractor.direction}.`
//  );
//  print(
//    `The right hand interactor is at position: ${rightHandInteractor.startPoint} and is pointing in direction: ${rightHandInteractor.direction}.`
//  );
}

onAwake();