
var registerdUsers = [{userName: "p", password: "testuser"}];



function showScreen(screenId) {
    const screens = document.querySelectorAll('.content');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
  }
  const checkPassword = () => {
    const password = document.querySelector('input[type="password"]').value;
    if (password.length < 8) {
      alert('The password must be at least 8 characters long.');
    }
    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      alert('The password must contain at least one letter and one number.');
    }
  }
  const checkUserName = () => {
    const userName = document.querySelector('#userName').value.trim();
    if (registerdUsers.some(user => user.userName.toLowerCase() === userName.toLowerCase())) {
        alert("Username already exists.");
    }
  }
    const checkPasswordConfirmation = () => {
        const confirmPassword = document.querySelector('#passwordConfirmation').value;
        const password = document.querySelector('#password').value;
        if (password !== confirmPassword) {
        alert('The passwords do not match.');
        }
    }
    const checkEmail = () => {
        const email = document.querySelector('#email').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        }
    }
    const checkName = () => {
        const name = document.querySelector('#givenName').value;
        if (/(?=.*[0-9])/.test(name)) {
        alert('The name can not contain numbers.');
        }
    }
    const checkDate = () => {
        const date = document.querySelector('#dateOfBirth').value;
        const today = new Date();
        const birthDate = new Date(date);
        if (birthDate > today) {
        alert('The date of birth can not be in the future.');
        }
    }
    
const onLogInClick = () => {
    const userName = document.querySelector('#logInUsername').value;
    const password = document.querySelector('#logInPassword').value;
    const user = registerdUsers.find(user => {
        return user.userName.toLowerCase() === userName.toLowerCase() && user.password === password;
    });
    if (user) {
        currentUser = {
            username: user.userName,
            scores: []  
        };
        showScreen('game');
    } else {
        alert("Invalid username or password.");
    }
};
const onSignUpClick = (event) => {
    event.preventDefault();
    const userName = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value;
    registerdUsers.push({userName, password});
    alert("User registered successfully.");
    showScreen('logIn');
}
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    onLogInClick();
  });