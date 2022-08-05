/*
// Create a userInput variable that holds a string
// Create a computerInput variable that holds a string
// Create a userWins variable with initial value 0 
// Create a computerWins variable with initial value 0
// Create a result variable that holds a string
// Create a variable that stores a nodelist with the 3 buttons
// Start a while loop with coniditions (userWins > 5 && computerWins > 5)
// Add eventListener on 3 buttons with forEach
// If clicked rock, record 'rock'
// If clicked paper, record 'paper'
// If clicked scissors, record 'scissors'
// Randomly generate a number between 0 and 2
// Use a switch statement to convert that random number into a
   string of value 'rock', 'paper', or 'scissors'
// Store that value in the computerInput variable
// Set the result variable equal to the playRound() function's return
// If the userInput and computerInput are the same, return the
   'tie' result and don't iterate win totals
// If the userInput and computerInput are different, return the
   appropirate result
// If the result = 'tie', output a string explaining the result
   and loop the game again without iterating win totals
// If the result = 'win, output a string letting the user know
   the score and that they won, and interate the userWins variable
// If the result = 'lose', output a string letting the user know
   the score and that they lost, and iterate the computerWins variable.
// Output a string letting the user know who won the best of 9
// End the program
*/

// Initializing userInput and computerInput to rock so it won't
// cause errors when calling deHighlightChoice in initial round
let userInput = 'rock';
let computerInput = 'rock';
let userWins = 0;
let computerWins = 0;
let result = '';
const WINS_NEEDED = 5; // Change this to change the desired # of wins to win

// Store the elements we want to change in variables
const score = document.querySelector('#score');
const buttons = document.querySelectorAll('#userUI button');
const play = document.querySelector('#play');
const winner = document.querySelector('#winner');

// If the user hits play again, play another round
play.addEventListener('click', playRound);
// Start the page by auto-playing the initial round
playRound();

function playRound() {
    // De-Highlight the previous round and remove displays
    winner.style.display = 'none';
    play.style.display = 'none';
    deHighlightChoice(document.getElementById(userInput));
    deHighlightChoice(document.getElementById(`robot-${computerInput}`));

    /* Randomly generate the Robot's choice.
    We use Math.floor() to eliminate decimal point values */
    computerInput = Math.floor(Math.random() * 3);

    /* Convert the random number into a readable string */
    switch(computerInput) {
        case 0: 
            computerInput = 'rock';
            break;
        case 1: 
            computerInput = 'paper';
            break;
        case 2: 
            computerInput = 'scissors';
    }

    // Wait for the user to make a choice of rock, paper, or scissors
    buttons.forEach(element => 
        element.addEventListener('click', onUserSelection));
}

// Runs when user makes their selection
function onUserSelection(e) {
    // Makes the buttons unclickable
    buttons.forEach(element => element.removeEventListener('click', onUserSelection));
    
    /* Stores userInput based off the ID of the clicked button.
    If-else structure bubbles up 1 if user clicked on nested image
    Then, highlights the selection so user knows it was recorded */
    if(e.composedPath()[0].nodeName === 'IMG') {
        userInput = e.composedPath()[1].id;
        highlightChoice(e.composedPath()[1]);
    } else {
        userInput = e.composedPath()[0].id;
        highlightChoice(e.composedPath()[0]);
    }

    // Stores element of button of robot's selection
    const robo = document.getElementById(`robot-${computerInput}`);
    // Changes text contents from 'Robot's Choice:' to 'Calculating...'
    // so the user isn't confused by the delay.
    robo.parentElement.parentElement
    .previousElementSibling.textContent = 'Calculating...';

    // Play a round with these inputs and store it as result
    result = getResult(userInput, computerInput);

    // Iterate the right player's wins
    if (result == 'win') {
        userWins++;
        winner.textContent = 'You Won!';
        winner.style.color = 'green';
    } else if (result == 'lose') {
        computerWins++;
        winner.textContent = 'You Lost.';
        winner.style.color = 'red';
    } else if (result == 'tie') {
        winner.textContent = 'You Tied.'
        winner.style.color = 'orange';
    }

    /* Adds delay time to make it seem like it's thinking.
       Reveal the robot's choice once the user has made theirs. Also
       display the 'PLAY AGAIN' and 'You Win/Lose/Tie' text.
       If someone has reached the WINS_NEEDED, don't show the buttons
       and change the title text to display if user won or lost */
    setTimeout(function(){
        // Highlight the robot's choice
        highlightChoice(robo);
        // Change text back from 'Calculating...' to 'Robot's Choice'
        robo.parentElement.parentElement.previousElementSibling
        .textContent = 'Robot\'s Choice:';
        // Update scoreboard
        score.textContent=`SCORE: ${userWins} - ${computerWins}`;
        // Display winner and play button (display: none by default)
        winner.style.display = 'block';
        play.style.display = 'block';

        // If somone won, don't show the play again button or win/lose text
        if (userWins >= WINS_NEEDED || computerWins >= WINS_NEEDED) {
            winner.style.display = 'none';
            play.style.display = 'none';
        }
        if (userWins >= WINS_NEEDED) {
            // Update title text to say you won
            document.getElementById('container').firstElementChild
            .textContent = 'CONGRATS! You Win!!!';
            // Makes title text green
            document.getElementById('container').firstElementChild
            .style.color = 'green';
        } else if (computerWins >= WINS_NEEDED) {
            // Update title text to say you lost
            document.getElementById('container').firstElementChild
            .textContent = 'Sorry. You Lose...';
            // Makes title text red
            document.getElementById('container').firstElementChild
            .style.color = 'red';
        }
    }, (Math.random() * (3000-1500) + 1500));
}

// Run this function to return the result of a round given 2 inputs
function getResult(userInput, computerInput) {
    if (userInput === computerInput) {
        return 'tie';
    } else if (userInput == 'rock' && computerInput == 'paper') {
        return 'lose';
    } else if (userInput == 'rock' && computerInput == 'scissors') {
        return 'win';
    } else if (userInput == 'paper' && computerInput == 'rock') {
        return 'win';
    } else if (userInput == 'paper' && computerInput == 'scissors') {
        return 'lose';
    } else if (userInput == 'scissors' && computerInput == 'rock') {
        return 'lose';
    } else if (userInput == 'scissors' && computerInput == 'paper') {
        return 'win';
    }
}

// This function will highlight any element passed in
function highlightChoice(element) {
    element.nextElementSibling.style.fontWeight = '600';
    element.style.borderWidth = '3px';
    element.style.borderStyle = 'solid';
}

// This function will undo highlightedChoice
function deHighlightChoice(element) {
    element.nextElementSibling.style.fontWeight = '400';
    element.style.borderWidth = '1px';
    element.style.borderStyle = 'outset';
}