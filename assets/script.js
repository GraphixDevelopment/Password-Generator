const lengthSlider = document.querySelector(".ww-lengte input"),
    opties = document.querySelectorAll(".optie input"),
    copyIcon = document.querySelector(".input-box span"),
    passwordInput = document.querySelector(".input-box input"),
    passIndicator = document.querySelector(".ww-indicator"),
    generateBtn = document.querySelector(".genereer-btn");

// Alle mogelijke wachtwoord symbolen en letters

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

// Geneer het wachtwoord door alle opties te checken

const GenereerWachtwoord = () => {

    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    opties.forEach(optie => {
        if (optie.checked) {

            if (optie.id !== "exc-duplicate") {
                staticPassword += characters[optie.id];
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {

        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if (excludeDuplicate) {

            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;

        } else {

            randomPassword += randomChar;

        }
    }
    passwordInput.value = randomPassword;
}

// Update de slider op gebied van lengte

const VeranderSterkteBalk = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".ww-lengte span").innerText = lengthSlider.value;
    GenereerWachtwoord();
    VeranderSterkteBalk();
}
updateSlider();

// Kopieer het wachtwoord en verander het icoon

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285F4";

    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 2000);
}

// Voeg de event listeners toe

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", GenereerWachtwoord);