document.getElementById('');

function generateWinningNumber() {
    return Math.round(Math.random() * (100 - 1) + 1);
}

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower() {
        if (this.playersGuess < this.winningNumber) {
            return true;
        } else {
            return false;
        }
    }
    playersGuessSubmission(guess) {
        let feedback = '';
        if ((!Number.isInteger(guess)) || guess < 1 || guess > 100) {
            feedback = 'That is an invalid guess.';
            document.querySelector('#guess-hints').innerHTML = feedback;
        } else {
            this.playersGuess = guess;
            return this.checkGuess();
        }
    }
    checkGuess() {
        let feedback = '';
        if (this.playersGuess === this.winningNumber) {
            this.pastGuesses.push(this.playersGuess);
            feedback = `${this.winningNumber} is right! You WIN!`;
            document.querySelector('body').style.backgroundColor = "#FFE600";
            document.querySelector('body').style.backgroundImage = "url(assets/winning.gif)";
            document.querySelector('#gif').src = "assets/won.gif";
        } else if (this.pastGuesses.includes(this.playersGuess)) {
            feedback = "You have already guessed that number.";
        } else {
            this.pastGuesses.push(this.playersGuess);
            if (this.pastGuesses.length === 5) {
                feedback = `Sorry, you lost. The number was ${this.winningNumber}. Play again?`;
                document.querySelector('body').style.backgroundColor = "#BABABA";
                document.querySelector('#gif').src = "assets/lost.gif";
            } else {
                let diff = this.difference();
                if (diff < 10) {
                    feedback = `You're burning up!`;
                    document.querySelector('body').style.backgroundColor = "#FF462D";
                    document.querySelector('#gif').src = "assets/hot.gif";
                } else if (diff < 25) {
                    feedback = `You're lukewarm.`;
                    document.querySelector('body').style.backgroundColor = "#FFB200";
                    document.querySelector('#gif').src = "assets/lukewarm.gif";
                } else if (diff < 50) {
                    feedback = `You're a bit chilly.`;
                    document.querySelector('body').style.backgroundColor = "#00B2FF";
                    document.querySelector('#gif').src = "assets/chilly.gif";
                } else {
                    feedback = `You're ice cold!`;
                    document.querySelector('body').style.backgroundColor = "#0085FF";
                    document.querySelector('#gif').src = "assets/cold.gif";
                }
                if (!this.isLower()) {
                    feedback += ' Guess lower...';
                    // document.querySelector('gissningar').src= "assets/downarrow.png";
                } else {
                    feedback += ' Guess higher!';
                    // document.querySelector('gissningar').src= "assets/uparrow.png";
                }
            }
        }
        document.querySelector('#guess-hints').innerHTML = feedback;
        document.querySelector('#guessholder1').innerHTML = this.pastGuesses[0];
        document.querySelector('#guessholder1').style.display = "inline-block";
        if (this.pastGuesses.length === 2) {
            document.querySelector('#guessholder2').innerHTML = this.pastGuesses[1];
            document.querySelector('#guessholder2').style.display = "inline-block";
            document.querySelector('#guessholder2').style.marginLeft = "94px";
        } else if (this.pastGuesses.length === 3) {
            document.querySelector('#guessholder3').innerHTML = this.pastGuesses[2];
            document.querySelector('#guessholder3').style.display = "inline-block";
            document.querySelector('#guessholder3').style.marginLeft = "180px";
        } else if (this.pastGuesses.length === 4) {
            document.querySelector('#guessholder4').innerHTML = this.pastGuesses[3];
            document.querySelector('#guessholder4').style.display = "inline-block";
            document.querySelector('#guessholder4').style.marginLeft = "260px";
        } else if (this.pastGuesses.length === 5) {
            document.querySelector('#guessholder5').innerHTML = this.pastGuesses[4];
            document.querySelector('#guessholder5').style.display = "inline-block";
            document.querySelector('#guessholder5').style.marginLeft = "340px";

        }
        // document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;
        // document.querySelector(`guess`).innerHTML = this.playersGuess;
        return feedback;
    }
    provideHint() {
        const hintArray = [
            this.winningNumber,
            generateWinningNumber(),
            generateWinningNumber()
        ];
        const shuffled = shuffle(hintArray);
        document.querySelector('#guess-hints').innerHTML = `One of these is the winning number: ${shuffled.join(', ')}.`;
    }
}

const newGame = () => {
    return new Game();
}

const playGame = () => {
    const game = newGame();
    let submitButton = document.getElementById('submit-button');
    let hintButton = document.getElementById('hint');
    let resetButton = document.getElementById('reset');

    let input = document.getElementById("input");
// Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    submitButton.click();
  }
  // If the user presses right arrow key, a hint is given.
  if (event.keyCode === 39) {
    event.preventDefault();
    hintButton.click();
  }
  // if left arrow key is pressed, the game resets.
  if (event.keyCode === 37) {
    event.preventDefault();
    resetButton.click();
  }
});

    submitButton.addEventListener('click', function () {
        document.querySelector('#guess-hints').innerHTML = '';
        const playersGuess = +document.querySelector('input').value;
        document.querySelector('input').value = '';
        game.playersGuessSubmission(playersGuess);
    })

    hintButton.addEventListener('click', function () {
        const firstHint = true;
        if (firstHint === true) {
            game.provideHint();
            firstHint = false;
        }
    })

    resetButton.addEventListener('click', function() {
        // return new Game();
        document.location.reload();
        
    })

}

playGame();
