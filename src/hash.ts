async function sha256(str: string) {
  const msgUint8 = new TextEncoder().encode(str); // encode la chaine de caractères
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash la chaine de caractères
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // converti le buffer en tableau de bytes
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0")) // converti les bytes en hexadécimal
    .join(""); // retourne la chaine de caractères hashée
  return hashHex;
}
export async function hashPassword(plainPassword: string) {
  return await sha256(plainPassword);
}
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  const hashedInputPassword = await sha256(plainPassword);
  return hashedInputPassword === hashedPassword;
}
