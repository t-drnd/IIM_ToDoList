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

    const { data: userData, error: userError } = await supabaseClient
      .from("user")
      .insert([
        {
          id: authData.user?.id,
          firstname,
          lastname,
          email,
        },
      ]);
    if (userError) throw userError;

    console.log("Inscription réussie :", userData);
    return userData;
  } catch (error) {
    console.error("Erreur d'inscription :", error);
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    // Tentative de connexion avec email et mot de passe
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

    // Vérification si l'utilisateur existe dans la base de données
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

    // Redirection après connexion réussie
    window.location.href = "/index.html"; // Assurez-vous que cette URL est correcte

    return userData;
  } catch (error) {
    console.error("Erreur de connexion générale:", error);
    return null;
  }
};
