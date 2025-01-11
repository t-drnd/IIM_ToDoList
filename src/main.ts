import formManager from "./form-manager.js";
import { signIn, signUp } from "./auth-service.js";

// Initialiser le gestionnaire de formulaire
formManager.init();

// // Exemple de gestion de formulaire de connexion
// const loginForm = document.querySelector("#login-form");
// loginForm?.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const email = (document.querySelector("#login-email") as HTMLInputElement)?.value;
//     const password = (document.querySelector("#login-password") as HTMLInputElement)?.value;

//     const userData = await signIn(email, password);
//     if (userData) {
//         console.log("Utilisateur connecté avec succès !");
//     } else {
//         console.error("Échec de connexion !");
//     }
// });

const registerForm = document.querySelector("#register-form");
registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const firstname = (
    document.querySelector("#register-firstname") as HTMLInputElement
  )?.value;
  const lastname = (
    document.querySelector("#register-lastname") as HTMLInputElement
  )?.value;
  const email = (document.querySelector("#register-email") as HTMLInputElement)
    ?.value;
  const password = (
    document.querySelector("#register-password") as HTMLInputElement
  )?.value;

  const userData = await signUp(firstname, lastname, email, password);
  if (userData) {
    console.log("Utilisateur inscrit avec succès !");
  } else {
    console.error("Échec de l'inscription !");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne le formulaire de connexion
  const loginForm = document.querySelector("form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêche la soumission classique du formulaire

      const email = document.querySelector("input[type='email']").value;
      const password = document.querySelector("input[type='password']").value;

      console.log("Connexion avec email:", email, "et mot de passe:", password);

      // Appelle la fonction de connexion
      const user = await signIn(email, password);

      if (user) {
        console.log("Connexion réussie !");
        window.location.href = "/index.html"; // Redirige après connexion réussie
      } else {
        console.error("Échec de la connexion");
      }
    });
  } else {
    console.error("Le formulaire de connexion n'a pas été trouvé !");
  }
});
