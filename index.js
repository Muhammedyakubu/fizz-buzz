
const Alexa = require('ask-sdk-core');

const messages = {
    LAUNCH: `Welcome to Fizz Buzz. We’ll each take turns counting up from one. However, you must replace numbers divisible by 3 with the word “fizz”,and you must replace numbers divisible by 5 with the word “buzz”. If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. If you get one wrong, you lose. I'll go first... 1.`,
    HELP: `This is Fizz Buzz. We'll take turns counting up from 1. Replace numbers divisible by 3 with the word “fizz”, and you must replace numbers divisible by 5 with the word “buzz”. You can say help, repeat, or exit.`,
    STOP: `Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!`,
    ERROR: "I'm sorry, there was an error. Please try again."
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {

        //initialize game attributes
        const {attributesManager} = handlerInput;
        const attributes = attributesManager.getSessionAttributes();
        attributes.lastOuput = 1;

        const speakOutput = messages.LAUNCH;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        //access session attributes 
        const lastNum = attributesManager.getSessionAttributes().lastOutput;
        
        //Output both alexa's output and user's previous input. This is in case lastSpeakOut is of type fizz_or_buzz.
        //This way, the user can determine what the next correct input is

        const speakOutput = `I just said ${toFizzBuzz(lastNum)}. Before that you said ${toFizzBuzz(lastNum - 1)}. It's your turn.`;
 
        const cardOuput = `You last said ${toFizzBuzz(lastNum - 1)}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(cardOuput)
            .reprompt()
            .getResponse();
    }
};

function toFizzBuzz (value) {
    let num = parseInt(value,10);
    if (num % 15 === 0)
        return "fizz buzz";
    if (num % 5 === 0)
        return "buzz";
    if (num % 3 === 0)
        return "fizz";
    else 
        return value;
}

const GameHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GameIntent';
    },
    async handle(handlerInput) { 
        var speakOutput = "";
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        //Parse user input 

        //first check if it's a number
        var userInput = Alexa.getSlotValue(handlerInput.requestEnvelope,'number');

        //check it's a fizz/buzz
        if (userInput == null) {
            userInput = Alexa.getSlotValue(handlerInput.requestEnvelope,'fizz_or_buzz');
        }

        //if not fizz or buzz then incorrect answer

        var correctAnswer = toFizzBuzz(attributes.lastOuput + 1);

        //make userinput lowercase to compare with correct Answer
        if (userInput.toLowerCase === correctAnswer){
            //if user says the correct answer the output the correct answer and update it for the next cycle
            let nextOutput = parseInt(attributes.lastOutput += 2, 10);
            speakOutput = toFizzBuzz(nextOutput);

            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();

        }
        //else gameover

        speakOutput = `Oops, the correct answer was ` + correctAnswer +`. You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!`

        return handlerInput.responseBuilder
        .speak(speakOutput)
        .withSimpleCard("You Lose!", speakOutput)
        .getResponse();
        
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = messages.HELP;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

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


const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t('REFLECTOR_MSG', {intentName: intentName});

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = messages.ERROR;
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RepeatIntentHandler,
        GameHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
