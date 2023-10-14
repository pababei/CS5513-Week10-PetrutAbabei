import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase-app";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false);
      setUser(user);
    });
  });
  console.log(user);
  console.log(isLoggedIn);
  return { user, isLoggedIn };
};

export default useAuth;
