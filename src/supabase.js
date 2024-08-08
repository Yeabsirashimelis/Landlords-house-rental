//FIRST WE HAVE TO CREATE A CLIENT OF SUPABASE IN OUR PROJECT

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://yishmzlfmqyqqkzexdnh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpc2htemxmbXF5cXFremV4ZG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwODQ2MDgsImV4cCI6MjAzNTY2MDYwOH0.spOUgjz03nAGWVyI32GDkNor_1EL7ijeOf1_Sm3cBk0";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
