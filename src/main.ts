import formManager from "./form-manager.js";
import { signIn, signUp } from "./auth-service.js";

// Initialiser le gestionnaire de formulaire
formManager.init();

// Exemple de gestion de formulaire de connexion
const loginForm = document.querySelector("#login-form");
loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = (document.querySelector("#login-email") as HTMLInputElement)?.value;
    const password = (document.querySelector("#login-password") as HTMLInputElement)?.value;

    const userData = await signIn(email, password);
    if (userData) {
        console.log("Utilisateur connecté avec succès !");
    } else {
        console.error("Échec de connexion !");
    }
});
