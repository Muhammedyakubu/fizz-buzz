const Alexa = require('ask-sdk-core');
const { GameHandler } = require("./handlers/GameHandler");
const { LaunchRequestHandler } = require("./handlers/LaunchRequestHandler");
const { RepeatIntentHandler } = require("./handlers/RepeatIntentHandler");
const { HelpIntentHandler } = require("./handlers/HelpIntentHandler");
const { CancelAndStopIntentHandler } = require("./handlers/CancelAndStopIntentHandler");
const { SessionEndedRequestHandler } = require("./handlers/SessionEndedRequestHandler");
const { ErrorHandler } = require("./handlers/ErrorHandler");

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RepeatIntentHandler,
        GameHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
