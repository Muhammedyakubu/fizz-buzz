const Alexa = require('ask-sdk-core');
const { toFizzBuzz } = require("../utils/toFizzBuzz");

const GameHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Game';
    },
    async handle(handlerInput) {
        var speakOutput = '';
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        //Parse user input 
        //first check if it's a number
        var userInput = Alexa.getSlotValue(handlerInput.requestEnvelope, 'number');

        //check it's a fizz/buzz
        if (userInput == null) {
            userInput = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizz_or_buzz');
        }

        //if not fizz or buzz then incorrect answer
        var correctAnswer = toFizzBuzz(attributes.lastOutput + 1);

        //make userinput lowercase to compare with correct Answer
        if (userInput.toLowerCase() == correctAnswer) {
            //if user says the correct answer the output the correct answer and update it for the next cycle
            let nextOutput = parseInt(attributes.lastOutput += 2, 10);
            speakOutput = toFizzBuzz(nextOutput);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();

        }
        else {
            //else gameover
            speakOutput = `Oops, the correct answer was ` + correctAnswer + `. You lose! Thanks for playing Fizz Buzz. For another great Alexa game check out Song Quiz!`;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .withSimpleCard("You Lose!", speakOutput)
                .getResponse();
        }
    }
};
exports.GameHandler = GameHandler;
