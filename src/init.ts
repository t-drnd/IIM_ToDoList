import * as dotenv from "dotenv";
dotenv.config(); // Charge le fichier .env

import { createClient } from "@supabase/supabase-js";
 
const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);
 
console.log(supabase);

export default supabase;