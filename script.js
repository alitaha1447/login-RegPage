const form = document.querySelector("#form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function isEmail(inputString) {
  return inputString.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g);
}

function isAlpha(inputString) {
  return inputString.match(/[a-zA-Z]/g)
}

function checkRequired(inputs) {
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      //Error
      errorInput(input, `${getName(input)} is Required`);
    } else {
      //Success
      successInput(input);
    }
  });
}

function getName(input) {
  //return input.id;
  return input.getAttribute("data-name");
}

function errorInput(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const p = formGroup.querySelector("p");
  p.innerHTML = message;
}

// my way solution
// function errorInput(input, message) {
//   const formGroup = input.parentElement;
//   // Add the "error" class to the form-group
//   formGroup.classList.add("error");
//   // error message
//   const errorMessage = formGroup.querySelector('p');
//   errorMessage.textContent = message;
// }

function successInput(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
  const p = formGroup.querySelector("p");
  p.innerHTML = "";
}


function checkLength(input, min, max) {
  const data = input.value.trim().length;
  console.log(data, min, max)
  if (data < min) {
    errorInput(input, `${getName(input)} must be aleast greater than ${min} characters`);
  } else if (data > max) {
    errorInput(input, `${getName(input)} must be aleast lesser than ${max} characters`);
  } else {
    successInput(input)
  }
}

function checkConfirmPassword(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    console.log('invalid password');
    errorInput(password2, `${getName(password2)}  does not match`);
  }
}

function checkEmail(input) {
  let email = input.value
  const isValidEmail = isEmail(email);
  console.log(isValidEmail)
  if (!isValidEmail) {
    // alert('Invalid')
    errorInput(input, `This is not an valid email address`);
    return false
  }
  else {
    console.log('valid')
    return true
  }
}

function checkAlpha(input) {
  let username = input.value
  const isValidAlpha = isAlpha(username)
  console.log(isValidAlpha);
  if (isAlpha(username)) {
    console.log('valid user name')
  }
  else {
    errorInput(input, `This is not a valid user name`)
    console.log('Invalid')
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log(e);
  checkRequired([username, email, password, password2]);
  checkLength(username, 5, 10);
  checkLength(password, 5, 10);
  checkConfirmPassword(password, password2)
  checkEmail(email);
  checkAlpha(username);
})