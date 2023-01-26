import { useEffect, useState, createContext } from "react";
import { auth } from "../../fbConf";
import { onAuthStateChanged } from "firebase/auth";

export const user = createContext(auth);
export const AuthContext = createContext();
export function useAuthContext() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);
  return { currentUser };
}
export const AuthContextProvider = ({ children }) => {
  const { currentUser } = useAuthContext();
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
