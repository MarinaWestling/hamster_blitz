const startModal = document.getElementById('start');
const replayModal = document.getElementById('replay');

function hideStartMenu() {
  startModal.classList.add('start-fadeout');
  setTimeout(function(){
    startModal.style.display = 'none';
  }, 1500);
}

function hideReplayMenu() {
  replayModal.style.display = 'none';
}

function adjustHeight(){ 
  const th = document.getElementById('start').offsetHeight;
  const gh = document.getElementById('startbtn').offsetHeight;
  const titleHeight = document.getElementById('title').offsetHeight;
  const statHeight = document.getElementById('stats').offsetHeight;
  
  //adjust start button height
  var lh = th-gh;
  var split = (lh/2)-titleHeight;
  var adjust = `${split}px`;
  document.getElementById('startbtn').style.marginTop = adjust;
  // console.log(th, gh, lh, titleHeight, split);

  //adjust replay height
  var divide = lh/2-statHeight;
  var addText = `${divide}px`;
  document.getElementById('replaybtn').style.marginTop = addText;
}

adjustHeight();
window.addEventListener('resize', adjustHeight);
window.addEventListener('orientationchange', adjustHeight);

