const email = document.getElementById("email");
const emailSpan = document.getElementById("email-tooltip");
let validEmail = null;

email.onblur = function () {
  if (email.value == "") {
    validEmail = false;
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
  ) {
    emailSpan.innerHTML = "You have entered an invalid email address! 😤";
    validEmail = false;
  } else {
    validEmail = true;
    validateAll();
  }
};

const country = document.getElementById("country");
const countrySpan = document.getElementById("country-tooltip");
const flag = document.getElementById("flag");
let validCountry = null;
const countryAPI = "https://restcountries.eu/rest/v2/name/";
let countries = null;

country.onkeyup = function () {
  let requestURL = `${countryAPI}${country.value}`;
  let request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    countrySpan.innerHTML = "";
    countries = request.response;
    try {
      for (let index = 0; index < 5; index++) {
        if (countrySpan.innerHTML == "") {
          countrySpan.innerHTML = `${countries[index].name}`;
        } else {
          countrySpan.innerHTML = `${countrySpan.innerHTML}, ${countries[index].name}`;
        }
      }
      //   countries.forEach((country) => {
      //     if (countrySpan.innerHTML == "") {
      //       countrySpan.innerHTML = `${country.name}`;
      //     } else {
      //       countrySpan.innerHTML = `${countrySpan.innerHTML}, ${country.name}`;
      //     }
      //   });
    } catch (error) {
      console.error(error);
    }
  };
};

country.onblur = function () {
  countrySpan.innerHTML = "";
  if (countries.value == "") {
    validCountry = false;
  } else if (countries.status === 404) {
    country.value = "";
    flag.innerHTML = "";
    countrySpan.innerHTML = "Enter a valid country! 😤";
    validCountry = false;
  } else {
    country.value = countries[0].name;
    flag.innerHTML = `<img src="${countries[0].flag}" alt="${countries[0].name}'s flag" width="30" height="30">`;
    validCountry = true;
    validateAll();
  }
};

const zip = document.getElementById("zip");
const zipSpan = document.getElementById("zip-tooltip");
let validZip = null;

zip.onblur = function () {
  zipSpan.innerHTML = "";
  if (zip.value == "") {
    validZip = false;
  } else if (zip.value != null && zip.value.length == 4) {
    validZip = true;
    validateAll();
  } else {
    zipSpan.innerHTML = "You have entered an invalid zip code! 😤";
    validZip = false;
  }
};

const password = document.getElementById("password");
const passwordSpan = document.getElementById("password-tooltip");
let validPassword = null;

password.onblur = function () {
  passwordSpan.innerHTML = "";
  if (password.value == "") {
    validPassword = false;
  } else if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password.value)) {
    validPassword = true;
    validateAll();
  } else {
    passwordSpan.innerHTML = `Password must be at least six characters and contain at least one number, one lowercase and one uppercase letter. <br> <br> <img src="/img/laughing_emoji" width="200" height="200">`;
    validPassword = false;
  }
};

const confirmPass = document.getElementById("password-confirmation");
const confirmSpan = document.getElementById("confirm-tooltip");
let validConfirmation = null;

confirmPass.onblur = function () {
  confirmSpan.innerHTML = "";
  if (confirmPass.value == "") {
    validConfirmation = false;
  } else if (confirmPass.value === password.value) {
    validConfirmation = true;
    validateAll();
  } else {
    confirmSpan.innerHTML = `You entered a different password. <br> <br> <img src="/img/laughing_emoji2" width="200" height="200">`;
    validConfirmation = false;
  }
};

const register = document.getElementById("register");
const success = document.getElementById("success");
const ok = document.getElementById("ok");

function validateAll() {
  if (
    validEmail &&
    validCountry &&
    validZip &&
    validPassword &&
    validConfirmation
  ) {
    register.classList.remove("disabled");
  }
}

register.addEventListener("click", () => {
  success.classList.remove("hidden");
});

ok.addEventListener("click", () => {
  success.classList.add("hidden");
});
