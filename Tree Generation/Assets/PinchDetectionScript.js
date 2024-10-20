// @input Component.Text textComponent
// @input Component.ScriptComponent behaviorScript

const SIK = require('SpectaclesInteractionKit/SIK').SIK;
const handInputData = SIK.HandInputData;

var behaviorSystem = global.behaviorSystem;

function onAwake() {
    script.createEvent('OnStartEvent').bind(onStart);
}

function onStart() {
    var leftHand = handInputData.getHand('left');
    var rightHand = handInputData.getHand('right');

    leftHand.onPinchDown.add(() => {
        onPinched('left', leftHand.indexTip.position);
    });
    rightHand.onPinchDown.add(() => {
        onPinched('right', rightHand.indexTip.position);
    });
}

function onPinched(hand, position) {
    global.behaviorSystem.sendCustomTrigger('test_trigger');

    print(`The ${hand} hand has pinched. The tip of the ${hand} index finger is: ${position}.`);
    
    // Directly call the method on the text component if it exists
    if (script.textComponent && script.textComponent.api.onPinchDetected) {
        script.textComponent.api.onPinchDetected(hand, position);
    }
}

onAwake();