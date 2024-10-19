function onTrigger() {
  print('on trigger');
  // Remove our onTrigger() function from the custom trigger's responses
//  global.behaviorSystem.removeCustomTriggerResponse('my_trigger', onTrigger);
}
// Add our onTrigger() function as a response to the custom trigger "my_trigger"
global.behaviorSystem.addCustomTriggerResponse('my_trigger', onTrigger);