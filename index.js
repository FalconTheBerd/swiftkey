var levelselect = document.getElementById("levelSelect");

var levelOneSong = new Howl({
  src: ['Save_Your_Tears.mp3'],
  // other configuration options
});

var levelTwoSon = new Howl({
  src: ['Save_Your_Tears.mp3'],
  // other configuration options
});

var levelOneEventCount = 10;
var levelTwoEventCount = 10;

var currentLetter = null;
var score = 0;

function levelOneLetter() {
  var lvlOneLetters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'];
  var randomIndex = Math.floor(Math.random() * lvlOneLetters.length);
  var randomLetter = lvlOneLetters[randomIndex];

  return randomLetter;
}

function levelTwoLetter() {
  var lvlTwoLetters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';',"Q","W","E","R","T","Y","U","I","O","P"];//why is that one "" but thew rest are only one. because i watned that
  var randomIndex = Math.floor(Math.random() * lvlTwoLetters.length);
  var randomLetter = lvlTwoLetters[randomIndex];

  return randomLetter;
}

function levelThreeLetter() { 
  var levelThreeLetter = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';',"Z","X","C","V","B","N","M"];
  var randomIndex = Math.floor(Math.random() * endless.length);
  var randomLetter = levelThreeLetter[randomIndex];
  
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
    document.getElementById("perfectText").textContent = 'Perfect!';
	document.getElementById("gameText").textContent = ' ';
  	document.getElementById("perfectText").classList.remove("hidden");
    setTimeout(function () {
      document.getElementById("perfectText").textContent = '';
      document.getElementById("perfectText").classList.add("hidden");
    }, 500);

    // Remove the event listener to prevent multiple key presses
    document.removeEventListener('keydown', handleKeyPress);
  }
  else {
    document.getElementById("perfectText").textContent = 'Miss!';
	document.getElementById("gameText").textContent = ' ';
  document.getElementById("perfectText").classList.remove("hidden");


    setTimeout(function () {
      document.getElementById("perfectText").textContent = '';
      document.getElementById("perfectText").classList.add("hidden");
    }, 500);

    // Remove the event listener to prevent multiple key presses
    document.removeEventListener('keydown', handleKeyPress);
  }
}

function levelCompleted(selectedLevel) {
  console.log("Level Completed");
  document.getElementById("gameSection").style.backgroundImage = "none"
  document.getElementById("gameSection").style.backgroundColor = "grey"


  // Show everything except the Letter
  document.getElementById("gameText").classList.add("hidden");
  document.getElementById("perfectText").classList.add("hidden");
  document.getElementById("gameOverTitle").classList.remove("hidden");
  document.getElementById("finalScore").classList.remove("hidden");


  // Display different max score based on level
  if (selectedLevel == "level1") {
    scorePercent = Math.abs(score / levelOneEventCount) * 100;
    document.getElementById("finalScore").textContent = "Final Score: " + score + "/" + levelOneEventCount + " - " + scorePercent + "%";
	} else if (selectedLevel == "level2"){
    scorePercent = Math.abs(score / levelTwoEventCount) * 100;
    document.getElementById("finalScore").textContent = "Final Score: " + score + "/" + levelTwoEventCount + " - " + scorePercent + "%";
  }
  
  if (scorePercent == 100){
    document.getElementById("gameOverTitle").style.color = "darkgreen";
    document.getElementById("gameOverTitle").textContent = "Amazing!";
  }
  else if (scorePercent >= 75 && scorePercent <= 99){
    document.getElementById("gameOverTitle").style.color = "lightgreen";
    document.getElementById("gameOverTitle").textContent = "Almost!";
  }
  else if (scorePercent >= 50 && scorePercent <= 74){
    document.getElementById("gameOverTitle").style.color = "orange";
    document.getElementById("gameOverTitle").textContent = "Great!";
  }
  else if (scorePercent >= 25 && scorePercent <= 49){
    document.getElementById("gameOverTitle").style.color = "yellow";
    document.getElementById("gameOverTitle").textContent = "Good!";
  }
  else if (scorePercent >= 0 && scorePercent <= 24){
    document.getElementById("gameOverTitle").style.color = "red";
    document.getElementById("gameOverTitle").textContent = "Bad!";
  }


  levelOneSong.stop();

  setTimeout(function () {
    location.reload();
  }, 3000);
}

function level1() {
  console.log("Level 1 Started");
  document.getElementById("gameSection").style.backgroundImage = "url('placeholder.JPG')"

  // Play the levelOneSong
  levelOneSong.play();

  // Define timing points and corresponding letters (adjust these values according to the song)
  var levelOneEvents = [
    { timing: 2.0, letter: levelOneLetter() },
    { timing: 4.0, letter: levelOneLetter() },
    { timing: 6.0, letter: levelOneLetter() },
    { timing: 8.0, letter: levelOneLetter() },
    { timing: 10.0, letter: levelOneLetter() },
    { timing: 12.0, letter: levelOneLetter() },
    { timing: 14.0, letter: levelOneLetter() },
	  { timing: 16.0, letter: levelOneLetter() },
	  { timing: 18.0, letter: levelOneLetter() },
	  { timing: 20.0, letter: levelOneLetter() },
  ]; // Example timings and letters

  // Schedule levelOneEvents based on timing
  levelOneEvents.forEach(function (event, index) {
    setTimeout(function () {
      // Trigger an event (e.g., show a letter)
      showLetter(event.letter);

      // Check if it's the last event
      if (index === levelOneEvents.length - 1) {
        // If it's the last event, call a function when the level is completed
        setTimeout(function () {
          levelCompleted("level1");
        }, 1000);
      }
    }, event.timing * 1000); // Convert seconds to milliseconds
  });
}

function level2() {
  console.log("Level 2 Started");
  
  document.getElementById("gameSection").style.backgroundImage = "placeholder.JPG"

  // we need to get a song
  // levelTwoSong.play() 

  // Timing for the letters
  var levelTwoEvents = [
    { timing: 3.0, letter: levelTwoLetter()},
    { timing: 5.0, letter: levelTwoLetter()},
    { timing: 7.0, letter: levelTwoLetter()},
    { timing: 9.0, letter: levelTwoLetter()},
    { timing: 11.0, letter: levelTwoLetter()},
    { timing: 13.0, letter: levelTwoLetter()},
    { timing: 15.0, letter: levelTwoLetter()},
    { timing: 17.0, letter: levelTwoLetter()},
    { timing: 19.0, letter: levelTwoLetter()},
    { timing: 21.0, letter: levelTwoLetter()}
  ] // example timings for level two letters

  levelTwoEvents.forEach(function (event, index) {
      setTimeout(function (){
        showLetter(event.letter)
        
        if (index === levelTwoEvents.length - 1){
          setTimeout(function (){
            levelCompleted("level2")
          }, 1000) 
        
        }
      
      }, event.timing * 1000)
  })

}

function endless(){
  console.log("level Three Started");

  var levelTwoEvents = [
    { timing: 3.0, letter: levelThreeLetter()},
    { timing: 5.0, letter: levelThreeLetter()},
    { timing: 7.0, letter: levelThreeLetter()},
    { timing: 9.0, letter: levelThreeLetter()},
    { timing: 11.0, letter: levelThreeLetter()},
    { timing: 13.0, letter: levelThreeLetter()},
    { timing: 15.0, letter: levelThreeLetter()},
    { timing: 17.0, letter: levelThreeLetter()},
    { timing: 19.0, letter: levelThreeLetter()},
    { timing: 21.0, letter: levelThreeLetter()}
  ] // example timings for level two letters

  levelThreeEvents.forEach(function (event, index) {
    setTimeout(function () {
      // Trigger an event (e.g., show a letter)
      showLetter(event.letter);

      // Check if it's the last event
      if (index === levelThreeEvents.length - 1) {
        // If it's the last event, call a function when the level is completed
        setTimeout(function () {
          levelCompleted("level1"); //got to chage this i think
        }, 1000);
      }
    }, event.timing * 1000); // Convert seconds to milliseconds
  });

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
  } else if (selectedLevel === "level3"){
    level3()
  }
  

});
