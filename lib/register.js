import supabaseClient from "./init.js";
const register = async () => {
    const { data, error } = await supabaseClient.auth.signUp({
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
