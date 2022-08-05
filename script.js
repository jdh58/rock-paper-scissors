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

let userInput = '';
let computerInput = '';
let userWins = 0;
let computerWins = 0;
let result = '';

/* Once one "team" reaches 3 wins, the game ends 
This function takes the inputs, and generates the outputs*/
while (userWins < 3 && computerWins < 3) {
    

    computerInput = Math.floor(Math.random() * 3);
    // We use Math.floor() to eliminate decimal point values

    /* Convert the random number into a readable string */
    switch(computerInput) {
        case 0: 
            computerInput = 'rock'
            break;
        case 1: 
            computerInput = 'paper'
            break;
        case 2: 
            computerInput = 'scissors'
    }

    result = playRound(userInput, computerInput);

    if (result == 'win') {
        userWins++;
    } else if (result == 'lose') {
        computerWins++;
    } else if (result == 'tied') {
        
    }

    winner.textContent = `You ${result} Round ${round}`;
    score.style.color = 'green';
    score.textContent = `SCORE: ${userWins} - ${computerWins}`;
    /*If there's an invalid input, we just call it a tie
    for simplicity's sake*/
    // No need to initialize the inputs again, that will be
    // done automatically when the program loops.
}

// Run this function to return the result of a round given 2 inputs
function playRound(userInput, computerInput) {
    if (userInput === computerInput) {
        return 'tied';
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

// Let the user know the overall result before ending the game
if (userWins > computerWins) {
    alert('Congrats! You\'re smarter than a computer!');
} else {
    alert('Yikes... the computer beat you. That must hurt.')
}