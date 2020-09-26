function startGame(){
  const modal = document.getElementById('start');
  modal.style.display = 'none';
}
function replayGame(){
  const modal = document.getElementById('replay');
  modal.style.display = 'block';
}

// function ready() {
//   const { type } = screen.orientation;
// }

// async function start() {
//   await document.body.requestFullscreen();
//   await screen.orientation.lock("landscape");
//   ready();
// }
function adjustheight(){
  const th = document.documentElement.clientHeight;
  document.getElementById('game').style.height = `${th}px`;
}

function adjustHeight(){
  const th = document.documentElement.clientHeight;
  const gh = document.getElementById('box').offsetHeight;
  var lh = th-gh;
  var split = lh/2;
  var adjust = `${split}px`;
  document.getElementById('box').style.marginTop = adjust;
}