import supabase from "./../init.js";
import { handleSignIn } from "./../login.js";
 
const getJoinedData = async () => {
  const userLogged = await handleSignIn;
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
handleSignIn();