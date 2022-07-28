const login = document.getElementById("login");
const signup = document.getElementById("signup");

console.log("here");
login.addEventListener("click", () => {
    window.location.assign("/account/login");
});

signup.addEventListener("click", () => {
    document.location.assign("/account/signup");
});