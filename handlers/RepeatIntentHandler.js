const Alexa = require('ask-sdk-core');
const { toFizzBuzz } = require("../utils/toFizzBuzz");

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        //access session attributes 
        const lastNum = handlerInput.attributesManager.getSessionAttributes().lastOutput;

        //Output both alexa's output and user's previous input. This is in case lastSpeakOut is of type fizz_or_buzz.
        //This way, the user can determine what the next correct input is
        //I also chose to repeat the last game output over the last thing Alexa said because this was I can give Alexa more personality
        const speakOutput = `I just said ${toFizzBuzz(lastNum)}. Before that you said ${toFizzBuzz(lastNum - 1)}. It's your turn.`;

        const cardOutput = `You last said ${toFizzBuzz(lastNum - 1)}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(cardOutput)
            .reprompt()
            .getResponse();
    }
};
exports.RepeatIntentHandler = RepeatIntentHandler;
