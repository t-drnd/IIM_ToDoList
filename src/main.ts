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

  const email = (document.querySelector("#register-email") as HTMLInputElement)
    ?.value;
  const password = (
    document.querySelector("#register-password") as HTMLInputElement
  )?.value;
  const firstname = (
    document.querySelector("#register-firstname") as HTMLInputElement
  )?.value;
  const lastname = (
    document.querySelector("#register-lastname") as HTMLInputElement
  )?.value;

  const userData = await signUp(email, password, firstname, lastname);
  if (userData) {
    console.log("Utilisateur inscrit avec succès !");
  } else {
    console.error("Échec de l'inscription !");
  }
});

