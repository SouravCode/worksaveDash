import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback
} from "react";
import { fire } from "../services/src/auth-service/firebase";
const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);
const defaultUser = {
  email: "sandra@example.com",
  avatarUrl:
    "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png"
};

function AuthProvider(props) {
  const authService = fire.auth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const logIn = useCallback(async (email, password) => {
    // Send login request
    console.log(email, password);

    setUser({
      email,
      avatarUrl: defaultUser.avatarUrl
    });
  }, []);

  const logOut = useCallback(() => {
    // Clear user data

    setUser();
  }, []);

  useEffect(() => {
    // Retrieve and save user data on initial load
    if (authService.currentUser) {
      setUser(authService.currentUser)
    }
    else {
      setUser(defaultUser);
    };


    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, loading }} {...props} />
  );
}

export { AuthProvider, useAuth };
