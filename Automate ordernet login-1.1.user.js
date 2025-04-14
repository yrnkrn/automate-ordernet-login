// ==UserScript==
// @name        Automate ordernet login
// @namespace   http://tampermonkey.net/
// @version     1.1
// @match       https://*.ordernet.co.il/*
// @grant       none
// ==/UserScript==

(function () {
    'use strict';

    const buttonSelector = 'button[ng-click="vm.close()"]';
    const checkInterval = 500;
    const timeout = 60000;
    let elapsedTime = 0;
    let intervalId;

    function clickLogin() {
        document.removeEventListener('click', clickLogin);
        document.removeEventListener('keydown', clickLogin);
        setTimeout(() => {
            document.querySelector('#btnSubmit').click();
        }, 10);
    }

    function clickButtonWhenVisible() {
        if (!window.location.href.endsWith('.ordernet.co.il/#/') && !window.location.href.endsWith('.ordernet.co.il/#/auth')) {
            clearInterval(intervalId);
        }
        const button = document.querySelector(buttonSelector);
        if (button) {
            button.click();
            clearInterval(intervalId);
        } else {
            elapsedTime += checkInterval;
            if (elapsedTime >= timeout) {
                clearInterval(intervalId);
            }
        }
    }

    document.addEventListener('click', clickLogin);
    document.addEventListener('keydown', clickLogin);
    intervalId = setInterval(clickButtonWhenVisible, checkInterval);
})();