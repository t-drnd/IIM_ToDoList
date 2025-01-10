import supabase from "./init.js";
const register = async () => {
    const { data, error } = await supabase.auth.signUp({
        email: "yoann.coualan+1@gmail.com",
        password: "plainPassword",
    });
    if (error) {
        console.error(error);
        return false;
    }
    console.log(data);
    return data;
};
const user = register();
