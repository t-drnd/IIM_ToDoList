import formManager from "./form-manager.js";
import { signIn } from "./auth-service.js";
// Initialiser le gestionnaire de formulaire
formManager.init();
// Exemple de gestion de formulaire de connexion
const loginForm = document.querySelector("#login-form");
loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#login-email")?.value;
    const password = document.querySelector("#login-password")?.value;
    const userData = await signIn(email, password);
    if (userData) {
        console.log("Utilisateur connecté avec succès !");
    }
    else {
        console.error("Échec de connexion !");
    }
});
