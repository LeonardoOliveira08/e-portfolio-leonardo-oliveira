const PALAVRA_PASSE_CORRETA = "Leonardo2026";

function verificarAcessoGlobal() {
    const nomePaginaAtual = window.location.pathname.split("/").pop();
    const estaAutenticado = sessionStorage.getItem("site_autenticado") === "true";

    // Se tentar aceder a qualquer página (exceto a Home) sem estar logado, expulsa
    if (nomePaginaAtual !== "index.html" && nomePaginaAtual !== "") {
        if (!estaAutenticado) {
            window.location.href = "index.html";
            return;
        }
    }

    // Se o utilizador já estiver autenticado, garante que a navbar aparece em TODO o site
    if (estaAutenticado) {
        const navMenu = document.getElementById("nav");
        const menuBtn = document.getElementById("menu-btn");
        const esbocoMobile = window.innerWidth <= 992;

        if (navMenu && !esbocoMobile) navMenu.style.display = "block";
        if (menuBtn) menuBtn.style.display = esbocoMobile ? "block" : "none";

        // Se estiver especificamente na Home, mostra também o conteúdo do herói
        if (nomePaginaAtual === "index.html" || nomePaginaAtual === "") {
            const loginScreen = document.getElementById("login-screen");
            const heroContent = document.getElementById("hero-content");
            if (loginScreen) loginScreen.style.display = "none";
            if (heroContent) heroContent.style.display = "block";
        }
    }
}

function verificarSenha() {
    const inputSenha = document.getElementById("site-password").value;
    const erroMsg = document.getElementById("error-msg");

    if (inputSenha === PALAVRA_PASSE_CORRETA) {
        sessionStorage.setItem("site_autenticado", "true");
        verificarAcessoGlobal();
    } else {
        if (erroMsg) erroMsg.style.display = "block";
        document.getElementById("site-password").value = "";
    }
}

const btn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

if (btn && nav) {
    btn.addEventListener("click", function() {
        nav.classList.toggle("active");
    });
}

// Executa a verificação assim que a página carrega
verificarAcessoGlobal();
