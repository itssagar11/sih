const login = document.getElementById("login");
const signup = document.getElementById("signup");

login.addEventListener("click", () => {
    document.location.assign("/login");
});

signup.addEventListener("click", () => {
    document.location.assign("/signup");
});