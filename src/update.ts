import supabaseClient from "./init.js";
import user from "./login.js";
import { hashPassword } from "./hash.js";

const updateUser = async () => {
  const userLogged = await user;
  if (!userLogged) {
    return false;
  }

  const pwd = await hashPassword("plainPassword");
  const { data, error } = await supabaseClient
    .from("user")
    .update({
      password: pwd,
    })
    .eq("id", "b6372f8e-c265-4dc8-9213-ccffe5ee1436")
    .select();

  if (error) {
    console.error(error);
    return false;
  }

  console.log(data);
  return true;
};

const userUpdated = updateUser();
