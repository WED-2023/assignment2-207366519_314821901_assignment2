var registerdUsers = [{ userName: "p", password: "testuser", scores: [] }];
let currentUser = null;
let wasLoginVisible = false;

function showScreen(screenId) {
    const currentRegisterScreen = document.querySelector('#register');
    const wasRegisterVisible = currentRegisterScreen.classList.contains('active');

    const screens = document.querySelectorAll('.content');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
  
    if (wasRegisterVisible && screenId !== 'register') {
      resetRegistrationForm();
    }
    if (wasLoginVisible && screenId !== 'login') {
        wasLoginVisible = false;
        resetLoginForm();
    }
}
  
const checkUsername = () => {
  const usernameInput = document.querySelector('#username');
  const username = usernameInput.value.trim();
  const errorSpan = document.querySelector('#usernameError');

  if (registerdUsers.some(user => user.userName.toLowerCase() === username.toLowerCase())) {
    errorSpan.textContent = "Username already exists.";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
};

const checkPassword = () => {
  const password = document.querySelector('#password').value;
  const errorSpan = document.querySelector('#passwordError');
  if (password.length < 8) {
    errorSpan.textContent = "Password must be at least 8 characters long.";
    return false;
  }
  if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    errorSpan.textContent = "Password must contain at least one letter and one number.";
    return false;
  }

  errorSpan.textContent = "";
  return true;
};

const checkPasswordConfirmation = () => {
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#passwordConfirmation').value;
  const errorSpan = document.querySelector('#passwordConfirmationError');

  if (password !== confirmPassword) {
    errorSpan.textContent = "Passwords do not match.";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
};

const checkEmail = () => {
  const email = document.querySelector('#email').value.trim();
  const errorSpan = document.querySelector('#emailError');

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorSpan.textContent = "Please enter a valid email address.";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
};

const checkName = (id, errorId) => {
  const name = document.querySelector(`#${id}`).value.trim();
  const errorSpan = document.querySelector(`#${errorId}`);

  if (/\d/.test(name)) {
    errorSpan.textContent = "Name cannot contain numbers.";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
};

const checkDate = () => {
  const date = document.querySelector('#dateOfBirth').value;
  const errorSpan = document.querySelector('#dateError');
  const today = new Date();
  const birthDate = new Date(date);

  if (birthDate > today) {
    errorSpan.textContent = "Date of birth cannot be in the future.";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
};

const onLogInClick = () => {
    wasLoginVisible = true;
    const userName = document.querySelector('#logInUsername').value;
    const password = document.querySelector('#logInPassword').value;
    const error = document.querySelector('#logInError');
  
    const user = registerdUsers.find(user =>
      user.userName.toLowerCase() === userName.toLowerCase() && user.password === password
    );
  
    if (user) {
      currentUser = user.userName;
      error.textContent = "";
      showScreen('configuration');
    } else {
      error.textContent = "Invalid username or password.";
    }
  };
  

const onSignUpClick = (event) => {
  event.preventDefault();

  const isValid =
    checkUsername() &&
    checkPassword() &&
    checkPasswordConfirmation() &&
    checkEmail() &&
    checkName('givenName', 'givenNameError') &&
    checkName('familyName', 'familyNameError') &&
    checkDate();

  if (!isValid) return;

  const userName = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value;

  registerdUsers.push({ userName, password,scores : []});
  showScreen('login');
};

function nextStep(stepNumber) {
    if (stepNumber === 2) {
      const isValid =
        checkUsername() &&
        checkPassword() &&
        checkPasswordConfirmation();
  
      if (!isValid) return; 
    }
  
    if (stepNumber === 3) {
      const isValid =
        checkEmail() &&
        checkName('givenName', 'givenNameError') &&
        checkName('familyName', 'familyNameError');
  
      if (!isValid) return; 
    }
  
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => step.classList.remove('active-step'));
  
    const next = document.getElementById(`step-${stepNumber}`);
    if (next) next.classList.add('active-step');
  }
  
['username', 'password', 'passwordConfirmation', 'email', 'givenName', 'familyName', 'dateOfBirth'].forEach(id => {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener('input', () => {
    const errorSpan = document.getElementById(`${id}Error`);
    if (errorSpan) errorSpan.textContent = '';
  });
});
function resetRegistrationForm() {
    
    ['username', 'password', 'passwordConfirmation', 'email', 'givenName', 'familyName', 'dateOfBirth'].forEach(id => {
      const input = document.getElementById(id);
      if (input) input.value = '';
    });
  
    
    ['usernameError', 'passwordError', 'passwordConfirmationError', 'emailError', 'givenNameError', 'familyNameError', 'dateError'].forEach(id => {
      const errorSpan = document.getElementById(id);
      if (errorSpan) errorSpan.textContent = '';
    });
  
   
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => step.classList.remove('active-step'));
    document.getElementById('step-1').classList.add('active-step');
  }
  

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  onLogInClick();
});

['logInUsername', 'logInPassword'].forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('input', () => {
      const errorSpan = document.getElementById('logInError');
      if (errorSpan) errorSpan.textContent = '';
    });
  });
  
  function resetLoginForm() {
    document.getElementById('logInUsername').value = '';
    document.getElementById('logInPassword').value = '';
    document.getElementById('logInError').textContent = '';
  }
  

  function BackToHomePage() {
    document.getElementById('aboutModal').close();
  }

  const about_dialog = document.getElementById('aboutModal');

function isClickOutsideDialog(dialog, event) {
  const rect = dialog.getBoundingClientRect();
  return (
    event.clientX < rect.left ||
    event.clientX > rect.right || 
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
}

about_dialog.addEventListener('click', (event) => {
  if (isClickOutsideDialog(about_dialog, event)) {
    BackToHomePage();
  }
});

const canvas = document.getElementById("theCanvas");
const ctx = canvas.getContext('2d');
const canvas_width = canvas.width
const canvas_height = canvas.height
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => delete keys[e.key]);

const bullets = [];
let canShoot = true;
const bulletImg = new Image();
bulletImg.src = "bullet.png"
const bullet_speed = 6;
const bullet_width = 25;
const bullet_height = 30;

const enemy_bullets = [];
let canEnemyShoot = true;
const enemy_bullet_speed = 6;
const enemy_bullet_width = 25;
const enemy_bullet_height = 30;
const shootThreshold = canvas_height * 0.75;
const enemy_bulletImg = new Image();
enemy_bulletImg.src = "enemy_bullet.png"

const enemies = [];
const enemiesRows = 4;
const enemiesCols = 5;
let enemy_speed = 5; 
const enemy_width = 50
const enemy_height = 30 
const enemyImg = new Image();
enemyImg.src = "enemy.png"
let mostLeftEnemy;
let mostRightEnemy;
let lastActionTime = Date.now();
const actionInterval = 5000;
let SpeedupCounter = 0;
let enemy_direction = 1;

const explosionSound = new Audio('medium-explosion-1_4sec.mp3');
const shipHitSound = new Audio('heartbeat.mp3');
const backgroundMusic = new Audio('game_sound_background.mp3');
backgroundMusic.loop = true;

const ship_speed = 7
const SHIP_START_Y = canvas_height - 80;
function getRandomStartX() {
  const minX = ship_speed + 40;
  const maxX = canvas_width - 40 - ship_speed;
  return Math.floor(Math.random() * (maxX - minX)) + minX;
}
const ship = { 
  x: getRandomStartX(), 
  y: SHIP_START_Y, 
  width: 40, 
  height: 60, 
  speed: ship_speed,
  health: 3
};
const shipImg = new Image();
shipImg.src = "rocket.png";

let gameOver = false;
let gameWon = false;
let gameOverTime = false;
let gameStartTime = 0;
let score = 0
let shootkey;
let gameTime;
let isCurrentlyGameRunning = false;
let animationFrameId;

function updateLivesDisplay() {
  const livesDisplay = document.getElementById('lives-display');
  livesDisplay.textContent =ship.health;
}

function updateScoreDisplay() {
  const scoreDisplay = document.getElementById('score-display');
  scoreDisplay.textContent = score;
}

function updateTimer() {
  const currentTime = Math.floor((Date.now() - gameStartTime) / 1000);
  if (!gameOver && !gameWon) {
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.textContent = currentTime + 's';
  }
  if (gameTime <= currentTime) {
    gameOverTime = true;
    return;
  }
}
function checkShootKey() {
  shootKey = document.getElementById("ShootKey").value;
  if (shootKey === " " || /^[a-zA-Z]$/.test(shootKey)) {
    return true;
  }
  return false;
}

function StartGameAfterConfig() {
  gameTime = parseInt(document.getElementById("TimeChoice").value);
  if (!checkShootKey()) {
    alert("Please enter a valid key (letter or space).");
    return;
  }
  if (gameTime < 2) {
    alert("Please enter a valid game time (min 2 minutes).");
    return;
  }
  gameTime = gameTime * 60;
  showScreen('game');
  startGame();
}
function startGame(){
  cancelAnimationFrame(animationFrameId);
  resetGame();
  backgroundMusic.play();
  loop();
}

function setupGame() {
  isCurrentlyGameRunning=true;
  const spacingX = 60;
  const spacingY = 50;
  const startX = 50;
  const startY = 30;

  for (let i = 0; i < enemiesRows; i++) {
    enemies[i] = [];
    for (let j = 0; j < enemiesCols; j++) {
      enemies[i][j] = {
        x: startX + j * spacingX,
        y: startY + i * spacingY,
        alive: true
      };
    }
  }
  mostLeftEnemy = enemies[0][0].x;
  mostRightEnemy = enemies[enemiesRows-1][enemiesCols-1].x;
}

function loop() {
  if (!isCurrentlyGameRunning) return;
    update();
    draw();
    animationFrameId = requestAnimationFrame(loop);
}

function draw(){
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  
  if (!gameOver && !gameWon) {
    updateTimer();
    ctx.drawImage(shipImg, ship.x - ship.width / 2, ship.y, ship.width, ship.height);
    bullets.forEach(bullet => {
      ctx.drawImage(bulletImg, bullet.x, bullet.y, bullet_width, bullet_height)
    });
    for (let row = 0; row < enemiesRows; row++) {
      for (let col = 0; col < enemiesCols; col++) {
        const enemy = enemies[row][col];
        if (enemy.alive) {
          ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy_width, enemy_height);
        }
      }
    }
    enemy_bullets.forEach(bullet => {
      ctx.drawImage(enemy_bulletImg, bullet.x, bullet.y, enemy_bullet_width, enemy_bullet_height);
    });
  }
  if (gameOver || gameWon || gameOverTime) {
    endGame();
  }
}

function update() {
  if (keys["ArrowLeft"] && ship.x > ship.width + 0) ship.x -= ship_speed;
  if (keys["ArrowRight"] && ship.x < canvas_width - ship.width) ship.x += ship_speed;
  if (keys["ArrowUp"] && ship.y > 0.6*canvas_height) ship.y -= ship_speed;
  if (keys["ArrowDown"] && ship.y < canvas_height - ship.height) ship.y += ship_speed;
  if (keys[shootKey]) shoot();
  
  enemyShoot();
  
  bullets.forEach(b => b.y -= b.speed);
  
  enemy_bullets.forEach(b => b.y += b.speed);
  
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    
    if (bullet.y < 0) {
      bullets.splice(i, 1);
      continue;
    }
    
    let hit = false;
    for (let row = 0; row < enemiesRows; row++) {
      for (let col = 0; col < enemiesCols; col++) {
        const enemy = enemies[row][col];
        if (enemy.alive && 
            bullet.x < enemy.x + enemy_width &&
            bullet.x + bullet_width > enemy.x &&
            bullet.y < enemy.y + enemy_height &&
            bullet.y + bullet_height > enemy.y) {
          enemy.alive = false;
          bullets.splice(i, 1);
          score += 5 * Math.abs(row - 4);
          updateScoreDisplay();
          explosionSound.currentTime = 0;
          explosionSound.play();
          
          let allDead = true;
          for (let r = 0; r < enemiesRows; r++) {
            for (let c = 0; c < enemiesCols; c++) {
              if (enemies[r][c].alive) {
                allDead = false;
                break;
              }
            }
            if (!allDead) break;
          }
          if (allDead) {
            gameWon = true;
          }
          hit = true;
          break;
        }
      }
      if (hit) break;
    }
  }

  for (let i = enemy_bullets.length - 1; i >= 0; i--) {
    const bullet = enemy_bullets[i];
    
    if (bullet.y > canvas_height) {
      enemy_bullets.splice(i, 1);
      continue;
    }
    
    if (bullet.x < ship.x + ship.width &&
        bullet.x + enemy_bullet_width > ship.x &&
        bullet.y < ship.y + ship.height &&
        bullet.y + enemy_bullet_height > ship.y) {
      enemy_bullets.splice(i, 1);
      ship.health--;
      updateLivesDisplay();
      
      shipHitSound.currentTime = 0;
      shipHitSound.play();
      ship.x = getRandomStartX();
      ship.y = SHIP_START_Y;
      
      if (ship.health <= 0) {
        gameOver = true;
        shipHitSound.pause();
      }
    }
  }

  const now = Date.now();
  if(now - lastActionTime >= actionInterval && SpeedupCounter < 4){
    lastActionTime = now;
    enemy_speed = enemy_speed + 1.4;
    SpeedupCounter++;
  }
  
  if(mostLeftEnemy <= 0 || mostRightEnemy >= canvas_width - enemy_width){
    enemy_direction = -1 * enemy_direction;
  }  
  mostLeftEnemy = Infinity;
  mostRightEnemy = -Infinity;

  for (let row = 0; row < enemiesRows; row++) {
    for (let col = 0; col < enemiesCols; col++) {
      const enemy = enemies[row][col];
      if (enemy.alive) {
        enemy.x += (enemy_speed * enemy_direction);
        if(enemy.x <= mostLeftEnemy){
          mostLeftEnemy = enemy.x;
        }
        if(enemy.x >= mostRightEnemy){
          mostRightEnemy = enemy.x;
        }
      }
    }
  }
}

function shoot() {
  if (canShoot) {
    bullets.push({ x: ship.x - bullet_width / 2, y: ship.y - bullet_height, speed: bullet_speed });
    canShoot = false;
    setTimeout(() => canShoot = true, 300);
  }
}

function enemyShoot() {
  const canShootNew = enemy_bullets.length === 0 || 
                     enemy_bullets[enemy_bullets.length - 1].y > shootThreshold;
                     
  if (canEnemyShoot && canShootNew) {
    const aliveEnemies = [];
    for (let row = 0; row < enemiesRows; row++) {
      for (let col = 0; col < enemiesCols; col++) {
        if (enemies[row][col].alive) {
          aliveEnemies.push(enemies[row][col]);
        }
      }
    }

    if (aliveEnemies.length > 0) {
      const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      enemy_bullets.push({
        x: randomEnemy.x + enemy_width / 2 - enemy_bullet_width / 2,
        y: randomEnemy.y + enemy_height,
        speed: enemy_bullet_speed
      });
      canEnemyShoot = false;
      setTimeout(() => canEnemyShoot = true, 1000);
    }
  }
}

function resetGame() {
  ship.x = getRandomStartX();
  ship.y = SHIP_START_Y;
  ship.health = 3;
  updateLivesDisplay();
  
  score = 0;
  updateScoreDisplay();
  
  gameOver = false;
  gameWon = false;
  gameStartTime = Date.now(); 
  document.getElementById('timer-display').textContent = '0s';
  backgroundMusic.currentTime = 0;
  gameOverTime = false

  enemy_speed = 5;
  SpeedupCounter = 0;
  enemy_direction = 1;
  lastActionTime = Date.now();
  
  bullets.length = 0;
  enemy_bullets.length = 0;
  
  setupGame();
  isCurrentlyGameRunning = true;
}

function endGame() {
  backgroundMusic.pause();
  isCurrentlyGameRunning = false;

  const user = registerdUsers.find(u => u.userName === currentUser);
  user.scores.unshift(score);
  if (user.scores.length > 5) {
    user.scores.pop();
  }

  user.scores.sort((a, b) => b - a);
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, canvas_width, canvas_height);

  ctx.fillStyle = "white";
  ctx.font = '48px "Press Start 2P", cursive';
  ctx.textAlign = 'center';
  let str;
  if(gameWon){
    str = "!Champion"
  }
  else if(gameOver){
    str = "!You Lost"
  }
  else{
    if(score < 100){
      str = "You Can Do Better"
    }
    else{
      str = "!Winner"
    }
  }
  ctx.fillText(str, canvas_width / 2, 80);

  ctx.fillStyle = 'white';
  ctx.font = '24px "Press Start 2P", cursive';
  ctx.fillText(`Current Score: ${score}`, canvas_width / 2, 130);

  drawScoreTable(user.scores);
}

function drawScoreTable(scores) {
  ctx.fillStyle = 'white';
  ctx.font = 'bold 28px "Press Start 2P", cursive';
  ctx.textAlign = 'center';
  ctx.fillText('Scoreboard (Last 5 Games)', canvas_width / 2, 180);

  ctx.font = '20px "Press Start 2P", cursive';
  ctx.fillText('Game #', canvas_width / 2 - 80, 220);
  ctx.fillText('Score', canvas_width / 2 + 80, 220);

  scores.forEach((score, index) => {
    const y = 260 + index * 30;
    ctx.fillText(`${index + 1}`, canvas_width / 2 - 80, y);
    ctx.fillText(`${score}`, canvas_width / 2 + 80, y);
  });
}

document.getElementById('new-game-button').addEventListener('click', function (event) {
  event.target.blur();
  isCurrentlyGameRunning = false;
  backgroundMusic.pause();
  startGame();
});

function homefunction() {
  isCurrentlyGameRunning = false;
  backgroundMusic.pause();
  showScreen('welcome');
}

