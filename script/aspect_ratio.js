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

  let gameCanvas = document.querySelector('#gameCanvas');
  gameCanvas.width = newWidth;
  gameCanvas.height = newHeight;
}

resizeGame();
resizeGame();  // Eliminates extra 17px on initial desktop load
window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);

