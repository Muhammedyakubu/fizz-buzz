const Alexa = require('ask-sdk-core');
const { messages } = require("../utils/messages");

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {

        //initialize game attributes
        const { attributesManager } = handlerInput;
        const attributes = attributesManager.getSessionAttributes();
        attributes.lastOutput = 1;

        const speakOutput = messages.LAUNCH;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
exports.LaunchRequestHandler = LaunchRequestHandler;
