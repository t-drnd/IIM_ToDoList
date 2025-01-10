import supabase from "./init.js";
import user from "./login.js";
import { hashPassword } from "./hash.js";
 
const createUser = async () => {
  const userLogged = await user;
  if (!userLogged) {
    return false;
  }
 
  const pwd = await hashPassword("plainPassword");
  const { error } = await supabase.from("user").insert({
    firstname: "Yoann",
    lastname: "Coualan",
    email: "yoann.coualan@gmail.com",
    password: pwd,
  });
 
  if (error) {
    console.error(error);
    return false;
  }
 
  return true;
};
 
const userCreated = createUser();