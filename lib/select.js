import supabaseClient from "./init.js";
import { handleSignIn } from "./login.js";
const getUsers = async () => {
    const userLogged = await handleSignIn;
    if (!userLogged) {
        return false;
    }
    const { data, error } = await supabaseClient.from("user").select("*");
    if (error) {
        console.error(error);
        return error.message;
    }
    console.log(data);
    return data;
};
const users = getUsers();
handleSignIn();
