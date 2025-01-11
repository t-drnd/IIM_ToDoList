import formManager from "./form-manager.js";
import { signIn, signUp } from "./auth-service.js";
// Initialiser le gestionnaire de formulaire
formManager.init();
const registerForm = document.querySelector("#register-form");
registerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const firstname = document.querySelector("#register-firstname")?.value;
    const lastname = document.querySelector("#register-lastname")?.value;
    const email = document.querySelector("#register-email")
        ?.value;
    const password = document.querySelector("#register-password")?.value;
    const userData = await signUp(firstname, lastname, email, password);
    if (userData) {
        console.log("Utilisateur inscrit avec succès !");
    }
    else {
        console.error("Échec de l'inscription !");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Sélectionne le formulaire de connexion
    const loginForm = document.querySelector("form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Empêche la soumission classique du formulaire
            const emailInput = document.querySelector("input[type='email']");
            const passwordInput = document.querySelector("input[type='password']");
            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;
                console.log("Connexion avec email:", email, "et mot de passe:", password);
                // Appelle la fonction de connexion
                const user = await signIn(email, password);
                if (user) {
                    console.log("Connexion réussie !");
                    window.location.href = "/index.html"; // Redirige après connexion réussie
                }
                else {
                    console.error("Échec de la connexion");
                }
            }
            else {
                console.error("Les champs email ou password sont introuvables dans le formulaire.");
            }
        });
    }
    else {
        console.error("Le formulaire de connexion n'a pas été trouvé !");
    }
});
