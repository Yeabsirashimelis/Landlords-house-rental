import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";
import bcrypt from "bcryptjs";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [isSignedIn, setIsSignedIn] = useState(user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsSignedIn(true);
    }
  }, []);

  async function hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  async function signIn(personToSignIn) {
    const { userName, email, password } = personToSignIn;

    // Check if user already exists
    const { data: alreadyUser, error: userFetchError } = await supabase
      .from("users")
      .select("*")
      .eq("userName", userName)
      .eq("email", email)
      .single();

    if (userFetchError) {
      // Create a new user if not found
      const hashedPassword = await hashPassword(password);
      const { data: newUser, error: signInError } = await supabase
        .from("users")
        .insert([
          {
            ...personToSignIn,
            password: hashedPassword,
            bookmarks: [],
            userType: "personal",
          },
        ])
        .select()
        .single();

      if (signInError) {
        throw new Error("Sign-in failed: Unable to create new user");
      }

      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      setIsSignedIn(true);

      return newUser;
    }

    // Validate the password if user exists
    const isPasswordValid = await bcrypt.compare(
      password,
      alreadyUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Sign-in failed: Invalid credentials");
    }

    localStorage.setItem("user", JSON.stringify(alreadyUser));
    setUser(alreadyUser);
    setIsSignedIn(true);

    return alreadyUser;
  }

  function signOut() {
    localStorage.removeItem("user");
    setUser(null);
    setIsSignedIn(false);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isSignedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
