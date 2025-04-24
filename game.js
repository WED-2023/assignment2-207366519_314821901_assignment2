var registerdUsers = [{ userName: "p", password: "testuser" }];
let currentUser = null;

 
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
    const userName = document.querySelector('#logInUsername').value;
    const password = document.querySelector('#logInPassword').value;
    const error = document.querySelector('#logInError');
  
    const user = registerdUsers.find(user =>
      user.userName.toLowerCase() === userName.toLowerCase() && user.password === password
    );
  
    if (user) {
      currentUser = { username: user.userName, scores: [] };
      error.textContent = "";
      showScreen('game');
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

  registerdUsers.push({ userName, password });
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







//canvas vars
const canvas = document.getElementById("theCanvas");
const ctx = canvas.getContext('2d');
const canvas_width = canvas.width
const canvas_height = canvas.height
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => delete keys[e.key]);

//bullets vars
const bullets = [];
let canShoot = true;
const bulletImg = new Image();
bulletImg.src = "bullet.png"
const bullet_speed = 2;
const bullet_width = 25;
const bullet_height = 30;

//enemy bullets vars
const enemy_bullets = [];
let canEnemyShoot = true;
const enemy_bullet_speed = 2;
const enemy_bullet_width = 25;
const enemy_bullet_height = 30;

//enemies vars
const enemies = [];
const enemiesRows = 4;
const enemiesCols = 5;
let enemy_speed = 3; 
const enemy_width = 50
const enemy_height = 30 
const enemyImg = new Image();
enemyImg.src = "enemy.png"
let mostLeftEnemy;
let mostRightEnemy;
let lastActionTime = Date.now();
const actionInterval = 5000;
let SpeedupCounter = 0;
let enemy_direction = 1; // 1 for right, -1 for left

// Explosion vars
const explosions = [];
const explosionImg = new Image();
explosionImg.src = "1f0V.gif";
const explosion_width = 40;  
const explosion_height = 30;

//ship vars
const ship_speed = 2
const ship = { 
  x: canvas_width / 2, 
  y: canvas_height - 80, 
  width: 40, 
  height: 60, 
  speed: ship_speed,
  health: 3  // Starting health
};
const shipImg = new Image();
shipImg.src = "rocket.png";

// Game state
let gameOver = false;
let gameWon = false;
let gameStartTime = 0;

function updateLivesDisplay() {
  const livesDisplay = document.getElementById('lives-display');
  livesDisplay.textContent = ship.health;
}

function updateTimer() {
  if (!gameOver && !gameWon) {
    const currentTime = Math.floor((Date.now() - gameStartTime) / 1000);
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.textContent = currentTime + 's';
  }
}

document.getElementById("StartGameButton").addEventListener("click", () => {
  setupGame();
  resetGame();
  loop();
  document.getElementById("StartGameButton").disabled = true;
});

function setupGame() {
  const spacingX = 60; // horizontal spacing between enemies
  const spacingY = 50; // vertical spacing between enemies
  const startX = 50;   // starting x position
  const startY = 30;   // starting y position

  for (let i = 0; i < enemiesRows; i++) {
    enemies[i] = []; // each row is a new array
    for (let j = 0; j < enemiesCols; j++) {
      enemies[i][j] = {
        x: startX + j * spacingX,
        y: startY + i * spacingY,
        alive: true,
      };
    }
  }
  mostLeftEnemy = enemies[0][0].x; // x position of the leftmost enemy
  mostRightEnemy = enemies[enemiesRows-1][enemiesCols-1].x; // x position of the rightmost enemy
}

function loop(){
  draw()
  update()
  requestAnimationFrame(loop);
}
function draw(){
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  
  // Draw game elements if game is not over
  if (!gameOver && !gameWon) {
    updateTimer();  // Update timer each frame
    ctx.drawImage(shipImg, ship.x - ship.width / 2, ship.y, ship.width, ship.height);
    bullets.forEach(bullet => {
      ctx.drawImage(bulletImg, bullet.x, bullet.y, bullet_width, bullet_height)
    });
    enemies.forEach(row => {
    row.forEach(enemy => {
        if (enemy.alive) {
          ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy_width, enemy_height);
        }
    });
    });
    enemy_bullets.forEach(bullet => {
      ctx.drawImage(bulletImg, bullet.x, bullet.y, enemy_bullet_width, enemy_bullet_height);
    });
    
    // Draw explosions
    explosions.forEach((explosion, index) => {
      ctx.drawImage(explosionImg, explosion.x, explosion.y, explosion_width, explosion_height);
      explosion.duration--;
      if (explosion.duration <= 0) {
        explosions.splice(index, 1);
      }
    });
  }
  
  // Draw game over screen
  if (gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas_width, canvas_height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas_width / 2, canvas_height / 2);
    ctx.font = '24px Arial';
    ctx.fillText('Press R to Restart', canvas_width / 2, canvas_height / 2 + 40);
  }
  
  // Draw win screen
  if (gameWon) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas_width, canvas_height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('You Won!', canvas_width / 2, canvas_height / 2);
    ctx.font = '24px Arial';
    ctx.fillText('Press R to Restart', canvas_width / 2, canvas_height / 2 + 40);
  }
}

function update() {
  // Handle restart
  if ((gameOver || gameWon) && keys['r']) {
    resetGame();
    return;
  }
  
  if (gameOver || gameWon) return;
  
  if (keys["ArrowLeft"] && ship.x  >  ship.width + 0 ) ship.x -= ship.speed;
  if (keys["ArrowRight"] && ship.x < canvas_width - ship.width) ship.x += ship.speed;
  if (keys["ArrowUp"] && ship.y > 0.6*canvas_height ) ship.y -= ship.speed;
  if (keys["ArrowDown"] && ship.y < canvas_height - ship.height) ship.y += ship.speed;
  if (keys[" "] || keys["Spacebar"]) shoot();
  
  // Enemy shooting
  enemyShoot();
  
  // Update bullet positions
  bullets.forEach(b => b.y -= b.speed);
  
  // Update enemy bullet positions
  enemy_bullets.forEach(b => b.y += b.speed);
  
  // Check for bullet-enemy collisions
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    
    if (bullet.y < 0) {
      bullets.splice(i, 1);
      continue;
    }
    
    for (let j = enemies.length - 1; j >= 0; j--) {
      const enemy = enemies[j];
      if (enemy.alive && 
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet_width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet_height > enemy.y) {
        enemy.alive = false;
        bullets.splice(i, 1);
        
        // Add explosion
        explosions.push({
          x: enemy.x + (enemy.width - explosion_width) / 2,
          y: enemy.y + (enemy.height - explosion_height) / 2,
          duration: 20  // Number of frames the explosion will last
        });
        
        // Check if all enemies are dead
        if (enemies.every(enemy => !enemy.alive)) {
          gameWon = true;
        }
        break;
      }
    }
  }

  // Check for enemy bullet-ship collisions
  for (let i = enemy_bullets.length - 1; i >= 0; i--) {
    const bullet = enemy_bullets[i];
    
    // Remove bullets that go off screen
    if (bullet.y > canvas_height) {
      enemy_bullets.splice(i, 1);
      continue;
    }
    
    // Check collision with ship
    if (bullet.x < ship.x + ship.width &&
        bullet.x + enemy_bullet_width > ship.x &&
        bullet.y < ship.y + ship.height &&
        bullet.y + enemy_bullet_height > ship.y) {
      enemy_bullets.splice(i, 1);
      ship.health--;
      updateLivesDisplay();
      
      if (ship.health <= 0) {
        gameOver = true;
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
  if (canEnemyShoot) {
    // Get all alive enemies
    const aliveEnemies = enemies.filter(enemy => enemy.alive);
    if (aliveEnemies.length > 0) {
      // Choose a random alive enemy
      const randomEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
      enemy_bullets.push({
        x: randomEnemy.x + enemy_width / 2 - enemy_bullet_width / 2,
        y: randomEnemy.y + enemy_height,
        speed: enemy_bullet_speed
      });
      canEnemyShoot = false;
      setTimeout(() => canEnemyShoot = true, 1000); // Enemy shoots every second
    }
  }
}

function resetGame() {
  // Reset ship
  ship.x = canvas_width / 2;
  ship.y = canvas_height - 80;
  ship.health = 3;
  updateLivesDisplay();
  
  // Reset game state
  gameOver = false;
  gameWon = false;
  gameStartTime = Date.now();  // Reset the timer
  document.getElementById('timer-display').textContent = '0s';  // Reset timer display
  
  // Clear bullets
  bullets.length = 0;
  enemy_bullets.length = 0;
  
  // Reset enemies
  enemies.forEach(enemy => enemy.alive = true);
  
  explosions.length = 0;  // Clear any remaining explosions
}