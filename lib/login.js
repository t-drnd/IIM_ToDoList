import supabase from "./init.js";
const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: process.env.SUPABASE_USER || "",
        password: process.env.SUPABASE_PASSWORD || "",
    });
    if (error) {
        console.error(error);
        return false;
    }
    return data;
};
const user = signIn();
export default user;
