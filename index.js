'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const SKILL_NAME = 'ログインボーナス';
const GET_FACT_MESSAGE = "今日のログインボーナスは";
const HELP_MESSAGE = 'ログインボーナスがもらえます';
const STOP_MESSAGE = 'さようなら';


const data = [
    '仕事がうまくいくチケットです。',
    '早めに帰宅できるチケットです。',
    '探していた靴下の片方が見つかります。',
    'ちょっと笑えることが3回起きるチケットです。',
    '良い夢を見れるチケットです。',
    '忘れていた大切な何かを思い出すチケットです。',
    'コーヒーがいつもの5倍美味しく感じるチケットです。',
    '躓いていた課題を解決できるチケットです。',
    '誰かが褒めてくれるチケットです。',
];


const handlers = {
    'Unhandled': function(){
      this.emit(':ask','もう１回お願い')  
    },
    'LaunchRequest': function () {
        this.emit(':ask','何をしますか');
    },
    'LoginIntent': function () {
        const bonusList = data;
        const bonusIndex = Math.floor(Math.random() * bonusList.length);
        const randomBonus = bonusList[bonusIndex];
        const speechOutput = GET_FACT_MESSAGE + randomBonus;

        this.response.cardRenderer(SKILL_NAME, randomBonus);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask',HELP_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
