import supabaseClient from "./init.js";
export const signIn = async (email, password) => {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        if (error)
            throw error;
        console.log("Connexion réussie :", data);
        return data;
    }
    catch (error) {
        console.error("Erreur de connexion :", error);
        return null;
    }
};
export const signUp = async (email, password) => {
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
        });
        if (error)
            throw error;
        console.log("Inscription réussie :", data);
        return data;
    }
    catch (error) {
        console.error("Erreur d'inscription :", error);
        return null;
    }
};
