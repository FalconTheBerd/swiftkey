var levelselect = document.getElementById("levelSelect");

var levelOneSong = new Howl({
  src: ['Save_Your_Tears.mp3'],
  // other configuration options
});

var levelOneEventCount = 7;

var currentLetter = null;
var score = 0;

function levelOneLetter() {
  var lvlOneLetters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  var randomIndex = Math.floor(Math.random() * lvlOneLetters.length);
  var randomLetter = lvlOneLetters[randomIndex];

  return randomLetter;
}

function showLetter(letter) {
  // Update the current letter
  currentLetter = letter;

  // Update the text to show the current letter
  document.getElementById("gameText").textContent = currentLetter;

  // Add logic to show the letter on the screen
  console.log("Show letter:", letter);

  // Add an event listener to handle key presses
  document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
  // Check if the pressed key matches the current letter
  if (event.key.toUpperCase() === currentLetter) {
    // Update the score and display it
    score++;
    console.log("Score:", score);
    document.getElementById("gameText").textContent = 'Perfect!';
    setTimeout(function () {
      document.getElementById("gameText").textContent = '';
    }, 500);

    // Remove the event listener to prevent multiple key presses
    document.removeEventListener('keydown', handleKeyPress);
  }
  else {
    document.getElementById("gameText").textContent = 'Miss!';

    setTimeout(function () {
      document.getElementById("gameText").textContent = '';
    }, 500);

    // Remove the event listener to prevent multiple key presses
    document.removeEventListener('keydown', handleKeyPress);
  }
}

function levelCompleted() {
  console.log("Level Completed");

  // Show everything except the Letter
  document.getElementById("gameText").classList.add("hidden");
  document.getElementById("gameOverTitle").classList.remove("hidden");
  document.getElementById("finalScore").classList.remove("hidden");
  document.getElementById("finalScore").textContent = "Final Score: " + score + "/" + levelOneEventCount;

  levelOneSong.stop();

  setTimeout(function () {
    location.reload();
  }, 3000);
}

function level1() {
  console.log("Level 1 Started");

  // Play the levelOneSong
  levelOneSong.play();

  // Define timing points and corresponding letters (adjust these values according to the song)
  var levelOneEvents = [
    { timing: 1.5, letter: levelOneLetter() },
    { timing: 3.0, letter: levelOneLetter() },
    { timing: 4.5, letter: levelOneLetter() },
    { timing: 6.0, letter: levelOneLetter() },
    { timing: 8.0, letter: levelOneLetter() },
    { timing: 8.5, letter: levelOneLetter() },
    { timing: 10.0, letter: levelOneLetter() },
  ]; // Example timings and letters

  // Schedule levelOneEvents based on timing offsets
  levelOneEvents.forEach(function (event, index) {
    setTimeout(function () {
      // Trigger an event (e.g., show a letter)
      showLetter(event.letter);

      // Check if it's the last event
      if (index === levelOneEvents.length - 1) {
        // If it's the last event, call a function when the level is completed
        setTimeout(function () {
          levelCompleted();
        }, 1000);
      }
    }, event.timing * 1000); // Convert seconds to milliseconds
  });
}

function level2() {
  console.log("Level 2 Started");
  // Add your code for level 2 here
}

// Add an event listener for the button press
document.getElementById("startButton").addEventListener("click", function () {
  // Get the selected level
  var selectedLevel = levelselect.options[levelselect.selectedIndex].value;

  // Hide everything except the Letter
  document.getElementById("gameText").classList.remove("hidden");
  document.getElementById("levelSelect").classList.add("hidden");
  document.getElementById("levelSelectText").classList.add("hidden");
  document.getElementById("startButton").classList.add("hidden");
  document.getElementById("welcomeText").classList.add("hidden");

  // Start the game
  if (selectedLevel == "level1") {
    level1();
  } else if (selectedLevel == "level2") {
    level2();
  }
});
