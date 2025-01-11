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
const getSession = async () => {
  const { data: { session }, error } = await supabaseClient.auth.getSession();

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
    // Création de l'utilisateur dans auth.users
    const { data: authData, error: authError } =
      await supabaseClient.auth.signUp({
        email,
        password,
      });

    if (authError) throw authError; // Vérifier s'il y a une erreur lors de la création de l'utilisateur

    console.log("Utilisateur créé dans auth.users :", authData);

    // Une fois l'utilisateur créé dans auth.users, ajoute ses informations dans la table 'user'
    const { data: userData, error: userError } = await supabaseClient
      .from("user")
      .insert([
        {
          id: authData.user?.id, // Utilisation de l'ID d'authentification de Supabase
          firstname,
          lastname,
          email,
          password,
        },
      ]);

    if (userError) throw userError; // Vérifier s'il y a une erreur lors de l'insertion dans la table 'user'

    console.log("Utilisateur ajouté dans la table user :", userData);
    window.location.href = "index.html"; // Redirection vers la page d'accueil
    return userData; // Retourner les données de l'utilisateur ajouté
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return null; // Si une erreur se produit, renvoie null
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

    console.log("Données d'authentification:", authData);

    // Vérifiez la session après la connexion
    const user = await getSession();
    if (user) {
      const { data: userData, error: userError } = await supabaseClient
        .from("user")
        .select("*")
        .eq("id", authData.user?.id)
        .single(); // Utilise .single() pour récupérer une seule ligne

      if (userError) {
        console.error("Erreur de récupération des données utilisateur:", userError);
        return null;
      }

      console.log("Utilisateur récupéré avec succès :", userData);
      window.location.href = "index.html"; // Redirection vers la page d'accueil
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
