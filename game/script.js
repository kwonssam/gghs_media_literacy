// 변수 선언
let 점수 = 0;
let 남은시간 = 10;
let 게임중 = false;
let 타이머ID;

// 원 만들기 함수
function 원만들기() {
  // 기존 원 제거
  let 기존원 = document.querySelector('.target');
  if (기존원) 기존원.remove();

  // 새 원 만들기
  let 원 = document.createElement('div');
  원.classList.add('target');

  // 크기 랜덤 (30px ~ 80px)
  let 크기 = Math.random() * (80 - 30) + 30;
  원.style.width  = 크기 + 'px';
  원.style.height = 크기 + 'px';

  // 위치 랜덤
  let x = Math.random() * (600 - 크기);
  let y = Math.random() * (400 - 크기);
  원.style.left = x + 'px';
  원.style.top  = y + 'px';

  // 클릭하면 점수 +1, 딜레이 후 새 원
  원.addEventListener('click', function() {
    if (!게임중) return;
    점수++;
    document.getElementById('score').innerText = 점수;

    // 랜덤 딜레이 (200ms ~ 800ms)
    let 딜레이 = Math.random() * (800 - 200) + 200;
    setTimeout(원만들기, 딜레이);
  });

  document.getElementById('game-area').appendChild(원);
}

// 게임 시작
function startGame() {
  점수 = 0;
  남은시간 = 10;
  게임중 = true;

  document.getElementById('score').innerText = 0;
  document.getElementById('timer').innerText = 10;
  document.getElementById('result').innerText = '';
  document.getElementById('start-btn').disabled = true;
  document.getElementById('start-btn').innerText = '게임 중...';

  원만들기();

  // 1초마다 타이머
  타이머ID = setInterval(function() {
    남은시간--;
    document.getElementById('timer').innerText = 남은시간;
    if (남은시간 <= 0) 게임오버();
  }, 1000);
}

// 게임 오버
function 게임오버() {
  게임중 = false;
  clearInterval(타이머ID);

  let 원 = document.querySelector('.target');
  if (원) 원.remove();

  document.getElementById('result').innerText =
    '게임 오버! 최종 점수: ' + 점수 + '점 🎉';
  document.getElementById('start-btn').disabled = false;
  document.getElementById('start-btn').innerText = '다시 시작';
}
