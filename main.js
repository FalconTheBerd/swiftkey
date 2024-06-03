var levelselect = document.getElementById("levelSelect");

var levelOneSong = new Howl({
  src: ['Save_Your_Tears.mp3'],
  // other configuration options
});

var levelTwoSong = new Howl({
  src: ['placeholder.mp3'],
  // other configuration options
});

var levelThreeSong = new Howl({
  src: ['placeholder.mp3'],
  // other configuration options
});

var endlessSong = new Howl({
	src: ['Stay_Inside_Me.mp3'],
  // other configuration options
});

var levelOneEventCount = 191;
var levelTwoEventCount = 10;
var levelThreeEventCount = 10;
var endlessStatus = 0;
// start speed for endless mode
var endlessTiming = 3;
var songPlaying = 0;

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


function endlessLetter() { 
  var endlessLetters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',"Z","X","C","V","B","N","M",'Q','W','E','R','T','Y','U','I','O','P'];
  var randomIndex = Math.floor(Math.random() * endlessLetters.length);
  var randomLetter = endlessLetters[randomIndex];
  
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
	document.getElementById("gameText").textContent = ' ';
	

  	document.getElementById("gameSection").style.backgroundImage = "url('weekndcorrect.JPG')"
	
    
	setTimeout(function () {
      document.getElementById("perfectText").textContent = '';
      document.getElementById("perfectText").classList.add("hidden");
	  document.getElementById("gameSection").style.backgroundImage = "url('placeholder.JPG')"
    }, 500);

    // Remove the event listener to prevent multiple key presses
    document.removeEventListener('keydown', handleKeyPress);
  }
  else {
      document.getElementById("perfectText").textContent = '';
	  document.getElementById("gameText").textContent = ' ';
  		document.getElementById("gameSection").style.backgroundImage = "url('weekndwrong.JPG')"
		
      document.getElementById("perfectText").classList.remove("hidden");
      endlessStatus = 0;


    setTimeout(function () {
      document.getElementById("perfectText").textContent = '';
      document.getElementById("perfectText").classList.add("hidden");
	  document.getElementById("gameSection").style.backgroundImage = "url('placeholder.JPG')"
    }, 500);

    // Remove the event listener to prevent multiple key presses
    document.removeEventListener('keydown', handleKeyPress);
  }
}

function levelCompleted(selectedLevel) {

  console.log("Level Completed");
  document.getElementById("gameSection").style.backgroundImage = "none"
  document.getElementById("gameSection").style.backgroundColor = "grey"

  songPlaying = 0;


  // Show everything except the Letter
  document.getElementById("gameText").classList.add("hidden");
  document.getElementById("perfectText").classList.add("hidden");
  document.getElementById("gameOverTitle").classList.remove("hidden");
  document.getElementById("highScore").classList.remove("hidden");
  document.getElementById("finalScore").classList.remove("hidden");


  // Display different max score based on level
  if (selectedLevel == "level1") {
    scorePercent = Math.abs(score / levelOneEventCount) * 100;
    document.getElementById("finalScore").textContent = "Final Score: " + score + "/" + levelOneEventCount + " - " + scorePercent + "%";
	
	
	if (localStorage.getItem("levelOneHS") < score){
	localStorage.setItem("levelOneHS", score)
	}
	console.log("High Score: " + localStorage.getItem("levelOneHS"))
	document.getElementById("highScore").textContent ="High Score: " +  localStorage.getItem("levelOneHS")
	
  } else if (selectedLevel == "level2"){
    scorePercent = Math.abs(score / levelTwoEventCount) * 100;
    document.getElementById("finalScore").textContent = "Final Score: " + score + "/" + levelTwoEventCount + " - " + scorePercent + "%";
	
	if (localStorage.getItem("levelTwoHS") < score){
	localStorage.setItem("levelTwoHS", score)
	}
	console.log("High Score: " + localStorage.getItem("levelTwoHS"))
	document.getElementById("highScore").textContent = localStorage.getItem("levelTwoHS")
	
	
} else if (selectedLevel == "endless"){
    scorePercent = "100";
    document.getElementById("finalScore").textContent = "Final Score: " + score;
	localStorage.setItem("endlessHS", score)
	console.log("High Score: " + localStorage.getItem("endlessHS"))
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
  

  // Define timing points and corresponding letters (adjust these values according to the song)
  var levelOneEvents = [
  { timing: 1, letter: levelOneLetter() },
  { timing: 2, letter: levelOneLetter() },
  { timing: 3, letter: levelOneLetter() },
  { timing: 4, letter: levelOneLetter() },
  { timing: 5, letter: levelOneLetter() },
  { timing: 6, letter: levelOneLetter() },
  { timing: 7, letter: levelOneLetter() },
  { timing: 8, letter: levelOneLetter() },
  { timing: 9, letter: levelOneLetter() },
  { timing: 10, letter: levelOneLetter() },
];

// Function to continue adding elements until timing reaches 191
function continueLevelOneEvents() {
  let currentTiming = levelOneEvents[levelOneEvents.length - 1].timing;
  while (currentTiming < 191) {
    currentTiming++;
    levelOneEvents.push({ timing: currentTiming, letter: levelOneLetter() });
  }
}

// Call the function to continue building the array
continueLevelOneEvents();



  // Schedule levelOneEvents based on timing
  levelOneEvents.forEach(function (event, index) {
    setTimeout(function () {
	  if (songPlaying == 0){
	    // Play the levelOneSong
        levelOneSong.play(); 
		songPlaying = 1;  
	};
	  
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


function endless() {
	
  
  endlessStatus = 1;
  var intervalId;
  var initialTiming = endlessTiming;

  intervalId = setInterval(function () {
    if (endlessStatus !== 1) {
      clearInterval(intervalId);
      levelCompleted("endless");
      return;
    }
	if (songPlaying == 0){
		endlessSong.play()
		songPlaying = 1;
	}
    showLetter(endlessLetter());

    // Speed increase
    initialTiming -= 0.07;

    // max speed
    initialTiming = Math.max(initialTiming, 1);

    endlessTiming = initialTiming;

    // Set a new interval with the updated timing
    clearInterval(intervalId);
    intervalId = setInterval(arguments.callee, initialTiming * 1000);
    console.log(initialTiming)

  }, initialTiming * 1000);
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
  document.getElementById('nameInput').classList.add('hidden');

  
  // Start the game
  if (selectedLevel == "level1") {
    level1();
  } else if (selectedLevel == "level2") {
    level2();
  } else if (selectedLevel === "level3"){
    level3()
  } else if (selectedLevel === "endless"){
    endless()
  }
  

});