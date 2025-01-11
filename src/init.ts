// import "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"; // Import via CDN
// // dotenv n'est plus accessible donc on met les accès en brut
// const supabaseUrl: string = "https://ihsqxvtczrhhfuatnppb.supabase.co";
// const supabaseKey: string =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imloc3F4dnRjenJoaGZ1YXRucHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0OTQxMjcsImV4cCI6MjA1MjA3MDEyN30.wY6n9YjX32vpYhVNVxSB1mTTkVHq2t3OmRarRkEaSIU";
// const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
// export default supabaseClient; // Export de supabaseClient




import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://ihsqxvtczrhhfuatnppb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imloc3F4dnRjenJoaGZ1YXRucHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0OTQxMjcsImV4cCI6MjA1MjA3MDEyN30.wY6n9YjX32vpYhVNVxSB1mTTkVHq2t3OmRarRkEaSIU"; // Remplacez par votre clé publique
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
