const { cli } = require('cli-ux');
const inquirer = require('inquirer');
const { connectAndSend } = require('@trunx-io/ipc-client');

function prompt(questions, opts={}) {
  const prompt = inquirer.createPromptModule({ output: process.stderr })
  return prompt(questions, opts);
}

function spinner(type, message, silent) {
  if (silent) return;
  switch(type){
    case 'start':
      cli.action.start(message);
      break;
    case 'stop':
      cli.action.stop();
      break;
    default:
      console.error('spinner type not recognized. must be either start/stop.');
  }
}

function uniquify(value, index, self) {
  return self.indexOf(value) === index;
}

module.exports = { prompt, spinner, uniquify, connectAndSend }
