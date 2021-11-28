const Alexa = require('ask-sdk-core');
const { messages } = require("../utils/messages");

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = messages.STOP;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
exports.CancelAndStopIntentHandler = CancelAndStopIntentHandler;
