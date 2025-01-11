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
export const signUp = async (email, password, firstname, lastname) => {
    try {
        // Créer un utilisateur via Supabase Auth
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({
            email,
            password,
        });
        if (authError)
            throw authError;
        // Ajouter les informations utilisateur dans la table `users`
        const { data: userData, error: userError } = await supabaseClient
            .from("user") // Nom de votre table des utilisateurs
            .insert([
            {
                id: authData.user?.id, // Utiliser l'ID généré par Supabase Auth
                firstname,
                lastname,
                email,
            },
        ]);
        if (userError)
            throw userError;
        console.log("Inscription réussie :", userData);
        return userData;
    }
    catch (error) {
        console.error("Erreur d'inscription :", error);
        return null;
    }
};
export const signIn = async (email, password) => {
    try {
        const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        if (authError)
            throw authError;
        // Récupérer les informations utilisateur dans la table `users`
        const { data: userData, error: userError } = await supabaseClient
            .from("user")
            .select("*")
            .eq("id", authData.user?.id)
            .single();
        if (userError)
            throw userError;
        console.log("Connexion réussie :", userData);
        return userData;
    }
    catch (error) {
        console.error("Erreur de connexion :", error);
        return null;
    }
};
