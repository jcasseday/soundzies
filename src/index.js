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
    'cow': '<audio src="https://s3.amazonaws.com/soundzies/audio/cow_alexa.mp3" />',
    'sheep': '<audio src="https://s3.amazonaws.com/soundzies/audio/sheep_alexa.mp3" />',
    'swan': '<audio src="https://s3.amazonaws.com/soundzies/audio/swan_alexa.mp3" />',
    'lion': '<audio src="https://s3.amazonaws.com/soundzies/audio/lion_alexa.mp3" />',
    'crocodile': '<audio src="https://s3.amazonaws.com/soundzies/audio/crocodile_alexa.mp3" />',
    'cat': 'meow',
    'dog': '<audio src="https://s3.amazonaws.com/soundzies/audio/dog_alexa.mp3" />',
    'bird': 'tweet',
    'mouse': 'sqweek',
    'frog': 'croak',
    'elephant': '<audio src="https://s3.amazonaws.com/soundzies/audio/elephant_alexa.mp3" />',
    'duck': 'quack',
    'fish': 'blub',
    'seal': 'ow, ow, ow',
    'fox': 'ring ding ding ding ring ding ring ding ding ding ring ding ding'
};
