import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://akdpopwfpwsphilljgcd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZHBvcHdmcHdzcGhpbGxqZ2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMzEzNjksImV4cCI6MjA1NzkwNzM2OX0.j864l5jzU4lJNnlCtyCKjVflxxWoSk1M_jOEfJKW0kg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
