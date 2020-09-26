// Hamster Run Game
var clicksTotal;
var clicksPower;
var powerArray;
var playTimeRemaining;
var basePoints;
var bonusPoints;
var totalPoints;
var winPoints = 300;
document.getElementById('run-button').disabled = true;
document.getElementById('start-game').style.display = 'inline-block';
// PLAY STATE
function startGame() {
  // Remove Win or Lose Display
  document.getElementById('end-game').style.display = 'none';
  document.getElementById('end-game').className = '';
  // Reset Points
  basePoints = 0;
  bonusPoints = 0;
  // Reset powerArray
  powerArray = new Array();
  // Remove Play button
  document.getElementById('start-game').style.display = 'none';
  //Enable button, reset clicks
  clicksTotal = 0;
  document.querySelector('#click-count').textContent = `Distance: ${clicksTotal}cm`;
  // Starting Play Time
  playTimeRemaining = 8;
  document.querySelector('#play-time-remaining').textContent = `Play Time Remaining: ${playTimeRemaining}`;
  // Start Power Meter
  var power = 0;
  document.querySelector('#power').textContent = `Power: ${power}W`;

  //Begin timer
  let beginRemaining = 3;
  document.getElementById('begin-time').textContent = beginRemaining;
  const beginSeconds = setInterval(beginCountDown, 1000);
  function beginCountDown() {
    if (beginRemaining > 1) {
      beginRemaining--;
    } else {
      beginRemaining = 'GO!';
      clearInterval(beginSeconds);
      //MAIN GAME HERE START ------------------------------------
      const powerInterval = setInterval(powerNow, 500);
      document.getElementById('run-button').disabled = false;
      // Count Down Play Time
      const seconds = setInterval(playCountDown, 1000);
      function playCountDown() {
        if (playTimeRemaining > 1) {
          // Time Remaining
          playTimeRemaining = playTimeRemaining - 1;
        } else {
          // Game Done - No Time Remaining
          playTimeRemaining = 0;
          clearInterval(seconds);
          clearInterval(powerInterval);
          document.getElementById('run-button').disabled = true;
          // Add reset button
          document.getElementById('start-game').textContent = 'PLAY AGAIN';
          document.getElementById('start-game').style.display = 'inline-block';

          // Calculate points at end
          console.log(powerArray);
          basePoints = powerArray.reduce((a, b) => a + b, 0);
          console.log(`Base Points: ${basePoints}`);
          var bonusMinPower = 30;
          var bonusPointsMultiplier = 0.5; //Number between 0.1 and 1
          for (let i = 0; i < powerArray.length - 2; i++) {
            // console.log(`${i} : ${powerArray[i]}`);
            if (powerArray[i] >= bonusMinPower) {
              if (powerArray[i + 1] >= bonusMinPower) {
                if (powerArray[i + 2] >= bonusMinPower) {
                  bonusPoints += bonusPointsMultiplier * 100;
                  i = i + 2;
                } else {
                  //skip first 3 elements
                  i = i + 2;
                  continue;
                }
              } else {
                //skip these first 2 elements
                i++;
                continue;
              }
            } else {
              //Go to next iteration
              continue;
            }
          }
          console.log(`Bonus Points: ${bonusPoints}`);
          totalPoints = basePoints + bonusPoints;
          console.log(`Points: ${totalPoints}`);

          // WIN OR LOSE CONDITION
          if (totalPoints >= winPoints) {
            document.getElementById('end-game').textContent = 'WIN! Extinguish!';
            document.getElementById('end-game').classList.add('win');
            document.getElementById('end-game').style.display = 'block';
          } else {
            document.getElementById('end-game').textContent = 'LOSE! BOOOOOM!';
            document.getElementById('end-game').classList.add('lose');
            document.getElementById('end-game').style.display = 'block';
          }



        }
        document.querySelector('#play-time-remaining').textContent = `Play Time Remaining: ${playTimeRemaining}`;
      }

      //MAIN GAME HERE END ---------------------------------------
    }
    document.getElementById('begin-time').textContent = beginRemaining;
  }


}

function addClick() {
  clicksTotal++;
  clicksPower++;
  document.querySelector('#click-count').textContent = `Distance: ${clicksTotal}cm`;
}

// Power Meter
clicksPower = 0;
function powerNow() {
  power = clicksPower * 10;
  document.querySelector('#power').textContent = `Power: ${power}W`;
  powerArray.push(power);
  clicksPower = 0;
}


