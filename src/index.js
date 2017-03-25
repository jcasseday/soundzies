'use strict';
const Alexa = require("alexa-sdk");
const request = require("request");

const APP_ID = 'amzn1.ask.skill.ad0f5ffe-fb94-4fef-840c-ef7bce48225d';
const SLACK_HOOK = 'https://hooks.slack.com/services/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';

const WELCOME_MESSAGE = 'Welcome to Soundzies. Ask me to play a sound like, what does a cow say?';
const WELCOME_REPROMPT = 'For instructions on what to say, please say help me';
const FOUND_REPROMPT = 'try another sound or say stop';
const NOTFOUND_MESSAGE = 'I do not know that sound. Please try again';
const HELP_MESSAGE = 'You can ask me to play a sound like, what does a cow say?';
const HELP_REPROMPT = 'What sound would you like to hear?';
const EXIT_MESSAGE = 'See you later alligator';

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function() {
        this.emit(':ask', WELCOME_MESSAGE, WELCOME_REPROMPT);
    },
    'SoundIntent': function() {
        var outer = this;
        var itemSlot = this.event.request.intent.slots.Item;
        if (itemSlot && itemSlot.value) {
            var itemName = itemSlot.value.toLowerCase();
            if (audioData.hasOwnProperty(itemName)) {
                var slackBody = `{"channel": "#sound-played", "username": "soundziesbot", "text": "itemName=${itemName}", "icon_emoji": ":robot_face:"}`;
                request.post(SLACK_HOOK, {form:{payload:slackBody}}, function (error, response, body) {
                  outer.emit(':ask', `A ${itemName} goes ${audioData[itemName]}, ... ${FOUND_REPROMPT}`, FOUND_REPROMPT);
                });

            } else {
                var slackBody = `{"channel": "#unknown-sounds", "username": "soundziesbot", "text": "itemName=${itemName}", "icon_emoji": ":robot_face:"}`;
                request.post(SLACK_HOOK, {form:{payload:slackBody}}, function (error, response, body) {
                  outer.emit(':ask', `Sorry, I do not know what a ${itemName} says. Please try again`, WELCOME_REPROMPT);
                });
            }
        } else {
            var slackBody = `{"channel": "#unknown-sounds", "username": "soundziesbot", "text": "itemName=not_found", "icon_emoji": ":robot_face:"}`;
            request.post(SLACK_HOOK, {form:{payload:slackBody}}, function (error, response, body) {
              outer.emit(':ask', NOTFOUND_MESSAGE, WELCOME_REPROMPT);
            });
        }
    },
    'AMAZON.HelpIntent': function () {    
        this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', EXIT_MESSAGE);
    },
    'Unhandled' : function () {
        this.emit(':ask', FOUND_REPROMPT);
    }
};

const audioData = {
  'alexis': '<audio src="https://s3.amazonaws.com/soundzies/audio/Alexis_alexa.mp3" />',
  'bunny': '<audio src="https://s3.amazonaws.com/soundzies/audio/Bunny_alexa.mp3" />',
  'cat': '<audio src="https://s3.amazonaws.com/soundzies/audio/Cat_alexa.mp3" />',
  'chicken': '<audio src="https://s3.amazonaws.com/soundzies/audio/Chicken_alexa.mp3" />',
  'cow': '<audio src="https://s3.amazonaws.com/soundzies/audio/Cow_alexa.mp3" />',
  'coyote': '<audio src="https://s3.amazonaws.com/soundzies/audio/Coyote_alexa.mp3" />',
  'crocodile': '<audio src="https://s3.amazonaws.com/soundzies/audio/Crocodile_alexa.mp3" />',
  'crow': '<audio src="https://s3.amazonaws.com/soundzies/audio/Crow_alexa.mp3" />',
  'dog': '<audio src="https://s3.amazonaws.com/soundzies/audio/Dog_alexa.mp3" />',
  'elephant': '<audio src="https://s3.amazonaws.com/soundzies/audio/Elephant_alexa.mp3" />',
  'fox': '<audio src="https://s3.amazonaws.com/soundzies/audio/Fox_alexa.mp3" />',
  'frog': '<audio src="https://s3.amazonaws.com/soundzies/audio/Frog_alexa.mp3" />',
  'gorilla': '<audio src="https://s3.amazonaws.com/soundzies/audio/Gorilla_alexa.mp3" />',
  'horse': '<audio src="https://s3.amazonaws.com/soundzies/audio/Horse_alexa.mp3" />',
  'monkey': '<audio src="https://s3.amazonaws.com/soundzies/audio/Monkey_alexa.mp3" />',
  'lion': '<audio src="https://s3.amazonaws.com/soundzies/audio/Lion_alexa.mp3" />',
  'sheep': '<audio src="https://s3.amazonaws.com/soundzies/audio/Sheep_alexa.mp3" />',
  'snake': '<audio src="https://s3.amazonaws.com/soundzies/audio/Snake_alexa.mp3" />',
  'swan': '<audio src="https://s3.amazonaws.com/soundzies/audio/Swan_alexa.mp3" />',
  'test': 'sound test'
};
