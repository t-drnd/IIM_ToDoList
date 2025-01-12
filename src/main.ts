import formManager from "./form-manager.js";
import { signIn, signUp, addTask, getTasks } from "./auth-service.js";

// Initialiser le gestionnaire de formulaire
formManager.init();

const registerForm = document.querySelector("#register-form");
registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const firstname = (document.querySelector("#register-firstname") as HTMLInputElement)?.value;
  const lastname = (document.querySelector("#register-lastname") as HTMLInputElement)?.value;
  const email = (document.querySelector("#register-email") as HTMLInputElement)?.value;
  const password = (document.querySelector("#register-password") as HTMLInputElement)?.value;

  const userData = await signUp(firstname, lastname, email, password);
  if (userData) {
    console.log("Utilisateur inscrit avec succès !");
  } else {
    console.error("Échec de l'inscription !");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const emailInput = document.querySelector("input[type='email']");
      const passwordInput = document.querySelector("input[type='password']");

      if (emailInput && passwordInput) {
        const email = (emailInput as HTMLInputElement).value;
        const password = (passwordInput as HTMLInputElement).value;

        console.log("Connexion avec email:", email, "et mot de passe:", password);

        const user = await signIn(email, password);

        if (user) {
          console.log("Connexion réussie !");
          window.location.href = "/index.html";
        } else {
          console.error("Échec de la connexion");
        }
      }
    });
  }

  // Fonction pour charger les tâches et les afficher dans le tableau
  const loadTasks = async () => {
    const taskTableBody = document.querySelector(".task-table tbody");

    if (!taskTableBody) return; // Vérifie que la table existe avant de continuer

    taskTableBody.innerHTML = ""; // Réinitialiser la table avant d'ajouter les tâches

    const tasks = await getTasks();

    tasks.forEach((task: any) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${task.status}</td>
        <td>${task.titre}</td>
        <td>${task.priorite}</td>
        <td>${new Date(task.deadline).toLocaleDateString()}</td>
      `;

      taskTableBody.appendChild(row);
    });
  };

  (async () => {
    await loadTasks();

    const addTaskForm = document.querySelector<HTMLFormElement>("#addtaskpopup form");

    if (addTaskForm) {
      addTaskForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titre = (document.querySelector("#title") as HTMLInputElement).value;
        const description = (document.querySelector("#desc") as HTMLInputElement).value;
        const deadline = (document.querySelector("#date") as HTMLInputElement).value;
        const priorite = (document.querySelector("#priorite") as HTMLSelectElement).value;
       
        console.log("Date saisie :", deadline);

        if (titre && description && deadline && priorite) {
          const newTask = await addTask(titre, description, deadline, priorite);

          if (newTask) {
            console.log("Tâche ajoutée avec succès !");
            await loadTasks();
            addTaskForm.reset();
            document.querySelector("#addtaskpopupcontent")?.classList.remove("active");
          } else {
            console.error("Impossible d'ajouter la tâche. Veuillez vérifier les logs pour plus de détails.");
          }          
        } else {
          console.error("Tous les champs sont requis pour ajouter une tâche.");
        }
      });
    } else {
      console.error("Le formulaire d'ajout de tâche est introuvable.");
    }
  })();
});
