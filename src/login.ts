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

const handleSignIn = async () => {
  const user = await signIn();

  if (user) {
    console.log("Connexion réussie :", user);
    window.location.href = "./index.html";
  } else {
    console.error("Échec de la connexion !");
  }
};

handleSignIn();
