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
// NAVEGAÇÃO COM ANIMAÇÃO
// =========================

let currentPage = "dashboard";

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


                // Não faz nada se já estiver na página
                if (pageName === currentPage) {
                    return;
                }


                const oldPage =
                    pages[currentPage];

                const newPage =
                    pages[pageName];


                // Descobrir direção
                const buttons = [
                    ...document.querySelectorAll(
                        ".nav-item"
                    )
                ];

                const oldIndex =
                    buttons.findIndex(
                        button =>
                            button.dataset.page ===
                            currentPage
                    );

                const newIndex =
                    buttons.findIndex(
                        button =>
                            button.dataset.page ===
                            pageName
                    );


                const direction =
                    newIndex > oldIndex
                        ? "right"
                        : "left";


                // Preparar nova página

                newPage.classList.remove(
                    "hidden"
                );

                newPage.classList.remove(
                    "slide-in",
                    "slide-left"
                );


                // Forçar o navegador a reconhecer
                // uma nova animação

                void newPage.offsetWidth;


                if (direction === "right") {

                    newPage.classList.add(
                        "slide-in"
                    );

                } else {

                    newPage.classList.add(
                        "slide-left"
                    );

                }


                // Esconder página anterior

                setTimeout(() => {

                    oldPage.classList.add(
                        "hidden"
                    );

                }, 280);


                // Atualizar página atual

                currentPage =
                    pageName;


                // Atualizar título

                headerTitle.textContent =
                    pageTitle;


                // Atualizar menu

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
