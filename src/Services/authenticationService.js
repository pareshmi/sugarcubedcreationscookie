import supabase from "../helper/supabaseClient";

export class AuthenticationService{
    static async signIN(email,password){
        return await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
    }
    static async isLoggedIn() {
      const { data: { session }, error } = await supabase.auth.getSession();
  
      // If session exists, the user is authenticated
      return session !== null;
    }

   static async signOut(){
        const { error } = await supabase.auth.signOut();
  
  // Check if there was an error during sign-out
  if (error) {
    return false;
  } else {
    return true;
  }
    }

}

export default AuthenticationService;