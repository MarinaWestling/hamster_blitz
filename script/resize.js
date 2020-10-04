// From https://www.html5rocks.com/en/tutorials/casestudies/gopherwoord-studios-resizing-html5-games/#disqus_thread

function resizeGame() {
  let gameArea = document.querySelector('#gameArea');
  let widthToHeight = 16 / 9;

  let newWidth = document.documentElement.clientWidth;
  let newHeight = document.documentElement.clientHeight;
  let maxWidth = 1366;
  if (newWidth > maxWidth) { newWidth = maxWidth };
  let newWidthToHeight = newWidth / newHeight;

  if (newWidthToHeight > widthToHeight) {
    // Window too wide for desired game width
    newWidth = newHeight * widthToHeight;
    gameArea.style.height = newHeight + 'px';
    gameArea.style.width = newWidth + 'px';
  } else {
    // Window too high for desired game height
    newHeight = newWidth / widthToHeight;
    gameArea.style.width = newWidth + 'px';
    gameArea.style.height = newHeight + 'px';
  }

  // Center Game
  gameArea.style.marginTop = (-newHeight / 2) + 'px';
  gameArea.style.marginLeft = (-newWidth / 2) + 'px';
  // Adjust Font Size
  gameArea.style.fontSize = (newWidth / 400) + 'em';    
}

resizeGame();
resizeGame();  // Eliminates extra 17px on initial desktop load
window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);


// Full Screen
const elem = document.documentElement;
let fullScreenI = 0;
// Open
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
  fullScreenI = 1;
}

// Close
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  fullScreenI = 0;
}

const fullScreenButton = document.querySelector('#full-screen');
fullScreenButton.addEventListener('click', toggleFullScreen);

// isFullscreen();
// function isFullscreen(){ return 1 >= outerHeight - innerHeight };

function toggleFullScreen() {
  if(fullScreenI === 0) {
    openFullscreen();
    fullScreenButton.children[0].classList.remove('fa-expand');
    fullScreenButton.children[0].classList.add('fa-compress');
  }else if(fullScreenI === 1) {
    closeFullscreen();
    fullScreenButton.children[0].classList.remove('fa-compress');
    fullScreenButton.children[0].classList.add('fa-expand');
  }
}
