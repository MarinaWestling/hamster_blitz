function startGame(){
  const modal = document.getElementById('start');
  modal.style.display = 'none';
}
function replayGame(){
  const modal = document.getElementById('replay');
  modal.style.display = 'block';
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

