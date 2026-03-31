// ===== 미니 타겟 게임 - game.js =====

const ball       = document.getElementById('ball');
const scoreEl    = document.getElementById('score');
const timerEl    = document.getElementById('timer');
const overlay    = document.getElementById('overlay');
const overlayMsg = document.getElementById('overlay-msg');
const btnStart   = document.getElementById('btn-start');
const arenaInner = document.querySelector('.arena-inner');

let score        = 0;
let timeLeft     = 10;
let gameInterval = null;
let ballSize     = 56; // 현재 공 크기 (랜덤으로 바뀜)

// 공 크기 범위 설정 (최소 28px ~ 최대 80px)
const BALL_MIN = 28;
const BALL_MAX = 80;

// ===== 랜덤 공 크기 생성 =====
function randomBallSize() {
  return Math.floor(Math.random() * (BALL_MAX - BALL_MIN + 1)) + BALL_MIN;
}

// ===== 공 이동 + 크기 랜덤 적용 =====
function moveBall() {
  // 매번 새로운 랜덤 크기 적용
  ballSize = randomBallSize();
  ball.style.width  = ballSize + 'px';
  ball.style.height = ballSize + 'px';

  // arenaInner 기준으로 위치 계산
  const w    = arenaInner.clientWidth;
  const h    = arenaInner.clientHeight;
  const maxX = w - ballSize - 4;
  const maxY = h - ballSize - 4;
  const x    = Math.floor(Math.random() * maxX) + 4;
  const y    = Math.floor(Math.random() * maxY) + 4;

  ball.style.left = x + 'px';
  ball.style.top  = y + 'px';

  // 팝 애니메이션 재실행
  ball.classList.remove('pop');
  void ball.offsetWidth;
  ball.classList.add('pop');
}

// ===== 게임 시작 =====
function startGame() {
  score    = 0;
  timeLeft = 10;
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  timerEl.classList.remove('danger');
  overlay.style.display = 'none';
  ball.style.display    = 'block';
  moveBall();

  gameInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 3) timerEl.classList.add('danger');
    if (timeLeft <= 0) endGame();
  }, 1000);
}

// ===== 게임 종료 =====
function endGame() {
  clearInterval(gameInterval);
  ball.style.display    = 'none';
  overlayMsg.textContent = `게임 종료! 최종 점수: ${score}점 🎉`;
  btnStart.textContent  = '다시 시작';
  overlay.style.display = 'flex';
}

// ===== 공 클릭 이벤트 =====
ball.addEventListener('click', (e) => {
  e.stopPropagation();
  score++;
  scoreEl.textContent = score;
  spawnParticle(e.clientX, e.clientY);
  moveBall();
});

// ===== 시작 버튼 =====
btnStart.addEventListener('click', startGame);

// ===== 파티클 효과 (+1 표시) =====
function spawnParticle(x, y) {
  const rect = arenaInner.getBoundingClientRect();
  const p    = document.createElement('div');
  p.className   = 'particle';
  p.textContent = '+1';
  p.style.left  = (x - rect.left) + 'px';
  p.style.top   = (y - rect.top)  + 'px';
  arenaInner.appendChild(p);
  setTimeout(() => p.remove(), 700);
}
