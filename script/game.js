// Hamster Blitz Game Logic

// DOM Elements
const countDownHUD = document.getElementById('count-down');
const runButton = document.getElementById('run-button');
const endGame = document.getElementById('end-game');
const clickCountHUD = document.querySelector('#click-count');
const playTimeHUD = document.querySelector('#play-time-remaining');
const powerHUD = document.querySelector('#power');
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);



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
let pow0;
let pow1;



// Difficulty Settings
winPoints = 300; // Number between 100 and 1000
bonusMinPower = 30; //Number between 20 & 80
bonusPointsMultiplier = 0.5; //Number between 0.1 and 1


// Set
// root.style.setProperty('--pow0', '10%');
// root.style.setProperty('--pow1', '50%');
// pow0 = rootStyles.getPropertyValue('--pow0');
// pow1 = rootStyles.getPropertyValue('--pow1');
// console.log(pow0,pow1);

// During Development
//Enable run button
// runButton.disabled = false;
// document.getElementById('power-fill').classList.add('power-fill-animation');



// Default Conditions
runButton.disabled = true;

// Start New Game || Restart
function startGame() {
  // START CONDITIONS
  document.getElementById('power-fill').classList.add('power-fill-animation');
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
  root.style.setProperty('--pow0', '0%');
  root.style.setProperty('--pow1', '0%');
  pow0 = rootStyles.getPropertyValue('--pow0');
  pow1 = rootStyles.getPropertyValue('--pow1');
  console.clear();  

  // Initialize Game HUD (Updated using code elsewhere)
  countDownHUD.textContent = countDown;    
  playTimeHUD.textContent = `Play Time Remaining: ${playTimeRemaining}`;
  clickCountHUD.textContent = `Distance: ${clicksTotal}cm`;  
  // powerHUD.textContent = `Power: ${power}W`;

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
          
          // Disable Run Button, Display Replay Button
          runButton.disabled = true;
          runButton.style.zIndex = 90;
          replayModal.style.display = 'block';

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
  power = clicksPower * 10;
  pow1 = power;
  root.style.setProperty('--pow1', pow1+'%');
  pow1 = rootStyles.getPropertyValue('--pow1');
  console.log(`Pow0: ${pow0}, Pow1: ${pow1}`);
  //Animate
  document.getElementById('power-fill').classList.add('power-fill-animation');  
    pow0 = pow1;
    root.style.setProperty('--pow0', pow0+'%');
    // document.getElementById('power-fill').classList.remove('power-fill-animation');
    powerArray.push(power);
    clicksPower = 0;
    
}