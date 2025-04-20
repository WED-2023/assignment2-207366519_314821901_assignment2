
  

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