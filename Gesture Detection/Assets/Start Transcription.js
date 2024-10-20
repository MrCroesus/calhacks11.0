// -----JS CODE-----
global.startVoiceMLTranscribe(callback);

function callback(eventArgs){
    // intermediate transcription
    if(eventArgs.transcription.trim() == "") return;
    print(eventArgs.transcription);
//    if (eventArgs.transcription == "time") { 
//    var currentDate = new Date();
//    currentDate.setHours(currentDate.getHours() + 2);
//    global.getTTSResults("The time is: " + global.localizationSystem.getTimeFormatted(currentDate)); 
//    print("The current time is: " + global.localizationSystem.getTimeFormatted(currentDate));
//    }
//    if (eventArgs.transcription == "Time") { 
//    var currentDate = new Date();
//    currentDate.setHours(currentDate.getHours() + 2);
//    global.getTTSResults("The time is: " + global.localizationSystem.getTimeFormatted(currentDate)); 
//    print("The current time is: " + global.localizationSystem.getTimeFormatted(currentDate));
//    }    
    // final transcription
    if(!eventArgs.isFinalTranscription) return;
    print("Final Transcription: " + eventArgs.transcription);      
}