import supabase from "./../init.js";
import user from "./../login.js";
const getJoinedData = async () => {
    const userLogged = await user;
    if (!userLogged) {
        return false;
    }
    const { data, error } = await supabase.from("user").select("*, comments(*)");
    if (error) {
        console.error(error);
        return false;
    }
    console.log(data);
    return data;
};
const data = getJoinedData();
