'use strict';
const Alexa = require("alexa-sdk");

const APP_ID = 'amzn1.ask.skill.ad0f5ffe-fb94-4fef-840c-ef7bce48225d';

const WELCOME_MESSAGE = 'Welcome to Soundzies. Ask me to play a sound like, what does a cow say?';
const WELCOME_REPROMPT = 'For instructions on what to say, please say help me';
const FOUND_REPROMPT = 'try another sound or say stop';
const NOTFOUND_MESSAGE = 'I do not know that sound. Please try again';
const HELP_MESSAGE = 'You can ask me to play a sound like, what does a cow say?';
const HELP_REPROMPT = 'What sound would you like to hear?';
const EXIT_MESSAGE = 'After while crocodile';

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
        var itemSlot = this.event.request.intent.slots.Item;
        if (itemSlot && itemSlot.value) {
            var itemName = itemSlot.value.toLowerCase();

            if (audioData.hasOwnProperty(itemName)) {
                this.emit(':ask', `A ${itemName} goes ${audioData[itemName]}, ... ${FOUND_REPROMPT}`, FOUND_REPROMPT);
            } else {
                this.emit(':ask', `Sorry, I do not know what a ${itemName} says. Please try again`, WELCOME_REPROMPT);
            }
        } else {
            this.emit(':ask', NOTFOUND_MESSAGE, WELCOME_REPROMPT);
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
  'Bunny': '<audio src="https://s3.amazonaws.com/soundzies/audio/Bunny_alexa.mp3" />',
  'Cat': '<audio src="https://s3.amazonaws.com/soundzies/audio/Cat_alexa.mp3" />',
  'Chicken': '<audio src="https://s3.amazonaws.com/soundzies/audio/Chicken_alexa.mp3" />',
  'Cow': '<audio src="https://s3.amazonaws.com/soundzies/audio/Cow_alexa.mp3" />',
  'Coyote': '<audio src="https://s3.amazonaws.com/soundzies/audio/Coyote_alexa.mp3" />',
  'Crocodile': '<audio src="https://s3.amazonaws.com/soundzies/audio/Crocodile_alexa.mp3" />',
  'Crow': '<audio src="https://s3.amazonaws.com/soundzies/audio/Crow_alexa.mp3" />',
  'Dog': '<audio src="https://s3.amazonaws.com/soundzies/audio/Dog_alexa.mp3" />',
  'Elephant': '<audio src="https://s3.amazonaws.com/soundzies/audio/Elephant_alexa.mp3" />',
  'Fox': '<audio src="https://s3.amazonaws.com/soundzies/audio/Fox_alexa.mp3" />',
  'Horse': '<audio src="https://s3.amazonaws.com/soundzies/audio/Horse_alexa.mp3" />',
  'Lion': '<audio src="https://s3.amazonaws.com/soundzies/audio/Lion_alexa.mp3" />',
  'Sheep': '<audio src="https://s3.amazonaws.com/soundzies/audio/Sheep_alexa.mp3" />',
  'Snake': '<audio src="https://s3.amazonaws.com/soundzies/audio/Snake_alexa.mp3" />',
  'Swan': '<audio src="https://s3.amazonaws.com/soundzies/audio/Swan_alexa.mp3" />',
  'test': 'sound test'
};
