// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

let startTime, updatedTime, difference;
let timerInterval = null;
let running = false;

// Start the time
function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
    running = true;
  }
}

// Stop the time
function stopTimer() {
  clearInterval(timerInterval);
  running = false;
}

// Reset the time
function resetTimer() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  printTime(0, 0, 0);

  // Idk why but I like it better when it pauses
  setTimeout(function(){
	startTimer();
  }, 500);
}

// Update the stopwatch
function updateTimer() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  printTime(hours, minutes, seconds);
}

// Print the time
function printTime(hours, minutes, seconds) {
  let formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  //console.log(formattedTime);
  vscode.window.setStatusBarMessage(`Current session: ${formattedTime}`);
}

// Always two digits
function pad(n) {
  return n < 10 ? '0' + n : n;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	//console.log('Congratulations, your extension "playtime" is now active!');

	let start = vscode.commands.registerCommand('playtime.startPlayTime', function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		startTimer();
	});
	let reset = vscode.commands.registerCommand('playtime.resetPlayTime', function () {
		resetTimer();
	});
	let stop = vscode.commands.registerCommand('playtime.stopPlayTime', function () {
		stopTimer();

	});

	context.subscriptions.push(start);
	context.subscriptions.push(reset);
	context.subscriptions.push(stop);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
