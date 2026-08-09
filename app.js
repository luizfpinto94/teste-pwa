const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");

const loginForm = document.getElementById("login-form");
const logoutButton = document.getElementById("logout-button");

const headerTitle = document.getElementById("page-header-title");

const pages = {

    dashboard:
        document.getElementById("dashboard-page"),

    orders:
        document.getElementById("orders-page"),

    reports:
        document.getElementById("reports-page"),

    notifications:
        document.getElementById("notifications-page"),

    profile:
        document.getElementById("profile-page"),

    settings:
        document.getElementById("settings-page")

};


// =========================
// LOGIN
// =========================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    localStorage.setItem(
        "loggedIn",
        "true"
    );

    localStorage.setItem(
        "userEmail",
        email
    );

    showApp();

});


// =========================
// MOSTRAR APP
// =========================

function showApp() {

    loginScreen.classList.add("hidden");

    appScreen.classList.remove("hidden");

}


// =========================
// MOSTRAR LOGIN
// =========================

function showLogin() {

    appScreen.classList.add("hidden");

    loginScreen.classList.remove("hidden");

}


// =========================
// NAVEGAÇÃO
// =========================

document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const pageName =
                    this.dataset.page;

                const pageTitle =
                    this.dataset.title;


                // Esconder todas
                Object
                    .values(pages)
                    .forEach(page => {

                        page.classList.add(
                            "hidden"
                        );

                    });


                // Mostrar página
                pages[pageName]
                    .classList
                    .remove("hidden");


                // Atualizar título
                headerTitle.textContent =
                    pageTitle;


                // Atualizar botão ativo
                document
                    .querySelectorAll(".nav-item")
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );


                // Voltar para o topo
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        );

    });


// =========================
// LOGOUT
// =========================

logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "loggedIn"
        );

        localStorage.removeItem(
            "userEmail"
        );

        showLogin();

    }
);


// =========================
// MODO ESCURO
// =========================

const darkMode =
    document.getElementById("dark-mode");

darkMode.addEventListener(
    "change",
    function () {

        document.body.classList.toggle(
            "dark",
            this.checked
        );

    }
);


// =========================
// BUSCA DE PEDIDOS
// =========================

const orderSearch =
    document.getElementById(
        "order-search"
    );

if (orderSearch) {

    orderSearch.addEventListener(
        "input",
        function () {

            const value =
                this.value.toLowerCase();

            document
                .querySelectorAll(
                    ".order-card"
                )
                .forEach(order => {

                    const text =
                        order.textContent
                            .toLowerCase();

                    order.style.display =
                        text.includes(value)
                            ? ""
                            : "none";

                });

        }
    );

}


// =========================
// VERIFICAR LOGIN
// =========================

if (
    localStorage.getItem(
        "loggedIn"
    ) === "true"
) {

    showApp();

}


// =========================
// SERVICE WORKER
// =========================

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("sw.js")
                .then(() => {

                    console.log(
                        "Service Worker registrado!"
                    );

                })
                .catch(error => {

                    console.log(
                        "Erro no Service Worker:",
                        error
                    );

                });

        }
    );

}
