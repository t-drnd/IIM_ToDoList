import supabaseClient from "./init.js";

const signIn = async () => {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: "durand.thomas765@gmail.com",
    password: "iimtodolist",
  });

  if (error) {
    console.error(error);
    return false;
  }

  return data;
};

const user = signIn();

export default user;
