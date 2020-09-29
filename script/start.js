const startModal = document.getElementById('start');
const replayModal = document.getElementById('replay');

function hideStartMenu() {
  // Hide start screen modal
  startModal.style.display = 'none';
}

function hideReplayMenu() {
  // Hide start screen modal
  replayModal.style.display = 'none';
}

function adjustHeight(){
  const th = document.getElementById('start').offsetHeight;
  const gh = document.getElementById('startbtn').offsetHeight;
  var lh = th-gh;
  var split = lh/2;
  var adjust = `${split}px`;
  document.getElementById('startbtn').style.marginTop = adjust;
}

adjustHeight();
window.addEventListener('resize', adjustHeight);
window.addEventListener('orientationchange', adjustHeight);

