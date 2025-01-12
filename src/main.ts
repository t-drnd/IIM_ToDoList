import formManager from "./form-manager.js";
import { signIn, signUp, addTask, getTasks, updateTaskStatus, deleteTask } from "./auth-service.js";
import supabaseClient from "./init.js";

// Initialiser le gestionnaire de formulaire
formManager.init();

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
});

document.addEventListener("DOMContentLoaded", () => {
  // Fonction pour charger les tâches
  const loadTasks = async (filterStatus = "", filterPriority = "") => {
    const taskTableBody = document.querySelector(".task-table tbody");

    if (!taskTableBody) return;

    taskTableBody.innerHTML = "";

    let tasks = await getTasks();

    // Appliquer les filtres
    if (filterStatus) {
      tasks = tasks.filter((task: any) => task.status === filterStatus);
    }
    if (filterPriority) {
      tasks = tasks.filter((task: any) => task.priorite === filterPriority);
    }

    tasks.forEach((task: any) => {
      const row = document.createElement("tr");
      const statusClass =
        task.status === "Non commencé"
          ? "not-started"
          : task.status === "En cours"
          ? "in-progress"
          : "completed";

      row.classList.add(statusClass);

      row.innerHTML = `
        <td>
          <span class="task-status ${statusClass}" data-id="${task.id}">
            ${task.status}
          </span>
        </td>
        <td>${task.titre}</td>
        <td>${task.description}</td>
        <td>${task.priorite}</td>
        <td>${new Date(task.deadline).toLocaleDateString()}</td>
        <td>
          <button class="delete-task-button" data-id="${task.id}" ${
        task.status === "Terminé" ? "disabled" : ""
      }>Supprimer</button>
        </td>
      `;

      taskTableBody.appendChild(row);
    });

    attachStatusEventListeners();
    attachDeleteEventListeners();
  };

  const attachStatusEventListeners = () => {
    document.querySelectorAll(".task-status").forEach((statusElement) => {
      statusElement.addEventListener("click", async (event) => {
        const statusSpan = event.target as HTMLElement;

        if (!statusSpan || !statusSpan.getAttribute) {
          console.error("Élément invalide cliqué.");
          return;
        }

        const taskId = statusSpan.getAttribute("data-id");
        if (!taskId) {
          console.error("Aucune tâche associée.");
          return;
        }

        const currentStatus = statusSpan.innerText;
        let newStatus: string;

        if (currentStatus === "Non commencé") newStatus = "En cours";
        else if (currentStatus === "En cours") newStatus = "Terminé";
        else newStatus = "Non commencé";

        const updatedTask = await updateTaskStatus(taskId, newStatus);
        if (updatedTask) {
          console.log("Statut mis à jour avec succès :", updatedTask.status);
          statusSpan.innerText = updatedTask.status;
          statusSpan.className = `task-status ${
            updatedTask.status === "Non commencé"
              ? "not-started"
              : updatedTask.status === "En cours"
              ? "in-progress"
              : "completed"
          }`;
          const row = statusSpan.closest("tr");
          if (row) {
            row.classList.toggle("completed", updatedTask.status === "Terminé");
            const deleteButton = row.querySelector(".delete-task-button");
            if (deleteButton) {
              (deleteButton as HTMLButtonElement).disabled =
                updatedTask.status === "Terminé";
            }
          }
        } else {
          console.error("Impossible de mettre à jour le statut de la tâche.");
        }
      });
    });
  };

  const attachDeleteEventListeners = () => {
    document.querySelectorAll(".delete-task-button").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const deleteButton = event.target as HTMLElement;
        const taskId = deleteButton.getAttribute("data-id");

        if (!taskId) {
          console.error("Aucune tâche associée pour suppression.");
          return;
        }

        const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
        if (!confirmDelete) return;

        const deletedTask = await deleteTask(taskId);
        if (deletedTask) {
          console.log("Tâche supprimée avec succès !");
          await loadTasks();
        } else {
          console.error("Impossible de supprimer la tâche.");
        }
      });
    });
  };

  const attachFilterEventListeners = () => {
  const filterElements = document.querySelectorAll(".navbar-container li");

  filterElements.forEach((filterElement) => {
    filterElement.addEventListener("click", async () => {
      // Supprime l'état actif de tous les filtres
      filterElements.forEach((el) => el.classList.remove("active"));

      // Ajoute l'état actif au filtre cliqué
      filterElement.classList.add("active");

      const filterId = filterElement.querySelector("p")?.id;

      if (filterId === "all") {
        await loadTasks();
      } else if (filterId === "completed") {
        await loadTasks("Terminé");
      } else if (filterId === "inprogress") {
        await loadTasks("En cours");
      } else if (filterId === "notstarted") {
        await loadTasks("Non commencé");
      } else {
        const priorityMap: { [key: string]: string } = {
          crucial: "Crucial",
          veryimp: "Très Important",
          imp: "Important",
          peuimp: "Peu important",
          facultatif: "Facultatif",
        };
        const priority = priorityMap[filterId as string];
        if (priority) await loadTasks("", priority);
      }
    });
  });
};


  (async () => {
    await loadTasks();
    attachFilterEventListeners();

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
