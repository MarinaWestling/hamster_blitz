// Hamster Blitz Game Logic

// DOM Elements
const countDownHUD = document.getElementById('count-down');
const runButton = document.getElementById('run-button');
const endGame = document.getElementById('end-game');
const clickCountHUD = document.querySelector('#click-count');
const playTimeHUD = document.querySelector('#play-time-remaining');
const powerHUD = document.getElementById('power-fill');
const meter0 = document.getElementById('meter0');
const meter1 = document.getElementById('meter1');
const meter2 = document.getElementById('meter2');
const meter3 = document.getElementById('meter3');
const meter4 = document.getElementById('meter4');

// Global variables
let clicksTotal;
let clicksPower;
let power;
let powerArray;
let countDown;
let playTimeRemaining;
let basePoints;
let bonusPoints;
let totalPoints;
let winPoints;
let bonusMinPower;
let bonusPointsMultiplier;
let meterScale;
let heightScaled;

// Difficulty Settings
winPoints = 300; // Number between 100 and 1000
bonusMinPower = 40; //Number between 20 & 80
bonusPointsMultiplier = 0.5; //Number between 0.1 and 1

// Power Meter Scale
meterScale = [0, 0.5 * bonusMinPower, bonusMinPower, 1.5 * bonusMinPower, 2 * bonusMinPower];
meter0.textContent = meterScale[0];
meter1.textContent = meterScale[1];
meter2.textContent = meterScale[2];
meter3.textContent = meterScale[3];
meter4.textContent = meterScale[4];

// Default Conditions
runButton.disabled = true;

// Start New Game || Restart
function startGame() {
  // START CONDITIONS
  
  // Reset countDown, playTimeRemaining, Clicks, Power, powerArray, Points
  countDown = 3;
  countDownHUD.classList.remove('count-down-fadeout');
  countDownHUD.style.display = 'block';
  playTimeRemaining = 8;
  clicksTotal = 0;
  clicksPower = 0;
  power = 0;  
  powerArray = new Array();
  basePoints = 0;
  bonusPoints = 0;
  
  console.clear();  

  // Initialize Game HUD (Updated using code elsewhere)
  countDownHUD.textContent = countDown;    
  playTimeHUD.textContent = `Play Time Remaining: ${playTimeRemaining}`;
  clickCountHUD.textContent = `Distance: ${clicksTotal}cm`;
  heightScaled = (power) / (0.02 * bonusMinPower);
  if (heightScaled >= 100) {
    heightScaled = 101;
  }
  powerHUD.style.height = `${heightScaled}%`;

  // Hide Win or Lose Condition
  endGame.style.display = 'none';
  endGame.className = '';

  // Countdown to Start -  fire beginCountDown every second
  const beginSeconds = setInterval(beginCountDown, 1000);  

  function beginCountDown() {
    if (countDown > 1) {
      countDown--;      
    }else {
      // CountDown Go Fadeout
      runButton.style.zIndex = 101;
      countDownHUD.classList.add('count-down-fadeout');
      setTimeout(function(){
      countDownHUD.style.display = 'none';
      }, 1000);      
      countDown = 'GO!';
      clearInterval(beginSeconds); // Stop firing beginCountDown      

      // Power Meter Interval & playCountDown Interval
      const powerInterval = setInterval(powerNow, 500);
      const seconds = setInterval(playCountDown, 1000);

      // Enable Run Button
      runButton.disabled = false;
      
      function playCountDown() {
        if (playTimeRemaining > 1) {
          // Time Remaining
          playTimeRemaining--;
        } else {
          // Start END GAME - No Time Remaining
          playTimeRemaining = 0;
          // Stop firing functions
          clearInterval(seconds);
          clearInterval(powerInterval);
          
          // Disable Run Button, Display Replay Button, power Meter to 0
          runButton.disabled = true;
          runButton.style.zIndex = 90;
          replayModal.style.display = 'block';
          powerHUD.style.height = '0%';

          // Calculate Points

          //Sum all elements of powerArray for basePoints
          basePoints = powerArray.reduce((a, b) => a + b, 0);       
          
          // Bonus Points Loop - Awarded for every '3 in a Row' >= bonusMinPower
          for (let i = 0; i < powerArray.length - 2; i++) {
            // console.log(`${i} : ${powerArray[i]}`);

            // Check 1st Element
            if (powerArray[i] >= bonusMinPower) {

                // Check 2nd Element
                if (powerArray[i + 1] >= bonusMinPower) {
                  
                    // Check 3rd Element
                    if (powerArray[i + 2] >= bonusMinPower) {
                      bonusPoints += bonusPointsMultiplier * 100;
                      i = i + 2;
                    
                    // 3rd Element False
                    } else {
                      //skip first 3 elements
                      i = i + 2;
                      continue;
                    }

                // 2nd Element False  
                } else {
                  //skip these first 2 elements
                  i++;
                  continue;
                }

            // 1st Element False
            } else {
              //Go to next iteration
              continue;
            }

          } // End Bonus Points Loop

          // Add Points together
          totalPoints = basePoints + bonusPoints;

          // Log powerArray, Points, 
          console.log(powerArray);          
          console.log(`Base Points: ${basePoints}`);
          console.log(`Bonus Points: ${bonusPoints}`);          
          console.log(`Points: ${totalPoints}`);

          // WIN OR LOSE CONDITION
          if (totalPoints >= winPoints) {
            endGame.textContent = 'WIN! Extinguish!';
            endGame.classList.add('win');
            endGame.style.display = 'block';
          } else {
            endGame.textContent = 'LOSE! BOOOOOM!';
            endGame.classList.add('lose');
            endGame.style.display = 'block';
          }

        } // End END GAME

        // Update playTimeHUD
        playTimeHUD.textContent = `Play Time Remaining: ${playTimeRemaining}`;

      } // End playCountDown()      
    } // End else (zero seconds until start)

    // Update countDownHUD
    countDownHUD.textContent = countDown;

  } // End beginCountDown()
} // End startGame()

// Increment Run Clicks, Power Clicks & Update Display
function addClick() {
  clicksTotal++;
  clicksPower++;
  clickCountHUD.textContent = `Distance: ${clicksTotal}cm`;
}

// Power Meter - Called every half second until game end
// Power, Update Display, Track powerArray for Points
function powerNow() {
  power = clicksPower * 10;  //what power is
  heightScaled = (power) / (0.02 * bonusMinPower);
  if (heightScaled >= 100) {
    heightScaled = 101;
  }
  powerHUD.style.height = `${heightScaled}%`;
  powerArray.push(power);
  clicksPower = 0;    
}