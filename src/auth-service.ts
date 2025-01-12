import supabaseClient from "./init.js";

// export const signIn = async (email: string, password: string) => {
//   try {
//     const { data, error } = await supabaseClient.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) throw error;
//     console.log("Connexion réussie :", data);
//     return data;
//   } catch (error) {
//     console.error("Erreur de connexion :", error);
//     return null;
//   }
// };

// export const signUp = async (email: string, password: string) => {
//   try {
//     const { data, error } = await supabaseClient.auth.signUp({
//       email,
//       password,
//     });
//     if (error) throw error;
//     console.log("Inscription réussie :", data);
//     return data;
//   } catch (error) {
//     console.error("Erreur d'inscription :", error);
//     return null;
//   }
// };

// export const signUp = async (
//   firstname: string,
//   lastname: string,
//   email: string,
//   password: string
// ) => {
//   try {
//     // Création de l'utilisateur dans auth.users
//     const { data: authData, error: authError } =
//       await supabaseClient.auth.signUp({
//         email,
//         password,
//       });

//     if (authError) throw authError; // Vérifier s'il y a une erreur lors de la création de l'utilisateur

//     console.log("Utilisateur créé dans auth.users :", authData);

//     // Une fois l'utilisateur créé dans auth.users, ajoute ses informations dans la table 'user'
//     const { data: userData, error: userError } = await supabaseClient
//       .from("user")
//       .insert([
//         {
//           id: authData.user?.id, // Utilisation de l'ID d'authentification de Supabase
//           firstname,
//           lastname,
//           email,
//           password,
//         },
//       ]);

//     if (userError) throw userError; // Vérifier s'il y a une erreur lors de l'insertion dans la table 'user'

//     console.log("Utilisateur ajouté dans la table user :", userData);
//     window.location.href = "index.html"; // Redirection vers la page d'accueil
//     return userData; // Retourner les données de l'utilisateur ajouté
//   } catch (error) {
//     console.error("Erreur lors de l'inscription :", error);
//     return null; // Si une erreur se produit, renvoie null
//   }
// };

// export const signIn = async (email: string, password: string) => {
//   try {
//     const { data: authData, error: authError } =
//       await supabaseClient.auth.signInWithPassword({
//         email,
//         password,
//       });

//     if (authError) {
//       console.error("Erreur d'authentification:", authError);
//       return null;
//     }

//     console.log("Données d'authentification:", authData);

//     const { data: userData, error: userError } = await supabaseClient
//       .from("user")
//       .select("*")
//       .eq("id", authData.user?.id)
//       .single(); // Utilise .single() pour récupérer une seule ligne

//     if (userError) {
//       console.error(
//         "Erreur de récupération des données utilisateur:",
//         userError
//       );
//       return null;
//     }

//     console.log("Utilisateur récupéré avec succès :", userData);

//     window.location.href = "index.html";

//     return userData; // Vérification du retour
//   } catch (error) {
//     console.error("Erreur de connexion générale:", error);
//     return null;
//   }
// };

// Fonction pour récupérer la session active
// export const getSession = async () => {
//   try {
//     const { data: { session }, error } = await supabaseClient.auth.getSession(); // Utilisation de la méthode correcte
//     console.log("Session active :", session);
//     if (error) throw error;
//     if (session) {
//       console.log("Utilisateur connecté :", session.user);
//       return session.user;
//     } else {
//       console.log("Aucun utilisateur connecté.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Erreur lors de la récupération de la session :", error);
//     return null;
//   }
// };

// Récupérer la session active
const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabaseClient.auth.getSession();

  if (error) {
    console.error("Erreur lors de la récupération de la session :", error);
    return null;
  }

  if (!session) {
    console.log("Aucune session active.");
    return null;
  }

  console.log("Session active :", session);
  return session;
};

export const signUp = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  try {
    const { data: authData, error: authError } =
      await supabaseClient.auth.signUp({
        email,
        password,
      });

    if (authError) throw authError;

    console.log("Utilisateur créé dans auth.users :", authData);

    const { data: userData, error: userError } = await supabaseClient
      .from("user")
      .insert([
        {
          id: authData.user?.id,
          firstname,
          lastname,
          email,
          password,
        },
      ]);

    if (userError) throw userError;

    console.log("Utilisateur ajouté dans la table user :", userData);
    window.location.href = "index.html";
    return userData;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data: authData, error: authError } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error("Erreur d'authentification:", authError);
      return null;
    }

    console.log("Données d'authentification :", authData);

    const user = await getSession();
    if (user) {
      const { data: userData, error: userError } = await supabaseClient
        .from("user")
        .select("*")
        .eq("id", authData.user?.id)
        .single();

      if (userError) {
        console.error(
          "Erreur de récupération des données utilisateur:",
          userError
        );
        return null;
      }

      console.log("Utilisateur récupéré avec succès :", userData);
      window.location.href = "index.html";
      return userData;
    } else {
      console.error("L'utilisateur n'est pas connecté.");
      return null;
    }
  } catch (error) {
    console.error("Erreur de connexion générale:", error);
    return null;
  }
};

// Fonction pour récupérer toutes les tâches
export const getTasks = async () => {
  try {
    const { data: tasks, error } = await supabaseClient
      .from("tasks")
      .select("*")
      .order("deadline", { ascending: true });

    if (error) throw error;

    console.log("Tâches récupérées :", tasks);
    return tasks;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    return [];
  }
};

// Fonction pour ajouter une tâche
export const addTask = async (
  titre: string,
  description: string,
  deadline: string,
  priorite: string
) => {
  try {
    if (!titre || !description || !deadline || !priorite) {
      throw new Error("Tous les champs sont requis.");
    }

    const { data: sessionData, error: sessionError } =
      await supabaseClient.auth.getSession();

    if (sessionError || !sessionData?.session?.user?.id) {
      throw new Error("Impossible de récupérer l'utilisateur connecté.");
    }

    const userId = sessionData.session.user.id;

    // Conversion de la date en format ISO 8601
    const [day, month, year] = deadline.split("/");
    const formattedDeadline = `${year}-${month}-${day}`;

    console.log("Données préparées pour insertion :", {
      titre,
      description,
      deadline: formattedDeadline,
      priorite,
      status: "Non commencé",
      user_id: userId,
    });

    // Insertion dans la table "tasks" avec retour des données
    const { data, error } = await supabaseClient.from("tasks").insert(
      [
        {
          titre,
          description,
          deadline: formattedDeadline, // Format de date valide
          priorite,
          status: "Non commencé", // Statut par défaut
          user_id: userId, // Associer la tâche à l'utilisateur connecté
        },
      ],
      { returning: "representation" } // Forcer le retour des données insérées
    )
    .select();

    if (error) {
      console.error("Erreur lors de l'insertion dans Supabase :", error);
      throw new Error("Impossible d'insérer la tâche.");
    }
    
    if (!data || data.length === 0) {
      console.error("Aucune donnée retournée après l'insertion.");
      throw new Error("La tâche a été insérée mais aucune donnée n'a été retournée.");
    }
    
    console.log("Tâche ajoutée avec succès :", data);
    return data[0]; // Retourner la première tâche inséré
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
    return null;
  }
};

export const updateTaskStatus = async (taskId: string, newStatus: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", taskId)
      .select(); // Utilisez .select() pour récupérer les données mises à jour

    if (error) {
      console.error("Erreur lors de la mise à jour du statut de la tâche :", error);
      return null;
    }

    if (!data || data.length === 0) {
      console.error("Aucune donnée retournée après la mise à jour.");
      return null;
    }

    console.log("Statut de la tâche mis à jour avec succès :", data);
    return data[0]; // Retourne la première tâche mise à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    return null;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .select(); // Utilisez .select() pour récupérer les données supprimées

    if (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
      return null;
    }

    if (!data || data.length === 0) {
      console.error("Aucune donnée retournée après la suppression.");
      return null;
    }

    console.log("Tâche supprimée avec succès :", data);
    return data[0]; // Retourner la première tâche supprimée
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
    return null;
  }
};



