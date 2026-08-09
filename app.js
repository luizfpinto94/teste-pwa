const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");

const loginForm = document.getElementById("login-form");
const logoutButton = document.getElementById("logout-button");

const pages = {
    dashboard: document.getElementById("dashboard-page"),
    profile: document.getElementById("profile-page"),
    settings: document.getElementById("settings-page")
};


// LOGIN

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);

    showApp();

});


// MOSTRAR APP

function showApp() {

    loginScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");

}


// MOSTRAR LOGIN

function showLogin() {

    appScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");

}


// NAVEGAÇÃO

document.querySelectorAll(".nav-item").forEach(button => {

    button.addEventListener("click", function () {

        const pageName = this.dataset.page;

        // esconder todas
        Object.values(pages).forEach(page => {
            page.classList.add("hidden");
        });

        // mostrar página escolhida
        pages[pageName].classList.remove("hidden");

        // atualizar menu
        document.querySelectorAll(".nav-item").forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// LOGOUT

logoutButton.addEventListener("click", function () {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");

    showLogin();

});


// VERIFICAR LOGIN AO ABRIR

if (localStorage.getItem("loggedIn") === "true") {
    showApp();
}


// SERVICE WORKER

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("sw.js")
            .then(() => {
                console.log("Service Worker registrado!");
            })
            .catch(error => {
                console.log("Erro no Service Worker:", error);
            });

    });

}
