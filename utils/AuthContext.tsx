"use client";
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";
import { useState } from "react";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { IFUser, IUser, IUserFetched } from "@/types";
import axios from "axios";

import { modal, useDisclosure } from "@nextui-org/react";
import { useCustomToast } from "@/components/helpers/functions";
const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [fUser, setFUser] = useState<IFUser | {} | null>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { customToast, loading } = useCustomToast();

  const modalStates = useDisclosure();
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (fUser && (fUser as IFUser)?.uid) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [fUser]);
  useEffect(() => {
    if (user) {
      if (user.admin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [user]);
  const fetchUser = async (uid: string) =>
    await axios.get(`/api/users?uid=${uid}`).then((res) => {
      const user = res.data;
      if (user) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(user));
        setFUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        localStorage.removeItem("user");
        setUser(null);
        setFUser(null);
      }
    });

  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: IUser | null = userString ? JSON.parse(userString) : null;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (localUser?.uid === user.uid) {
          setFUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          setUser(localUser);
        } else {
          fetchUser(user.uid).catch((err) => {
            if (err.response.status === 404) {
              console.log("User does not exist");
            }
          });
        }
      } else {
        setFUser(null);
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const signIn = async () =>
      await signInWithPopup(auth, provider).then(async (result) => {
        const { displayName, email, uid } = result.user;
        if (displayName && email && uid) {
          {
            const data: IUser = {
              uid: uid,
              email: email,
              admin: false,
              displayName,
              status: "active",
            };
            await axios.post("/api/users", data);
          }
        } else {
          throw new Error("Could not sign in");
        }
      });
    customToast({
      func: signIn,
      suc: "Signed in successfully",
      err: "Could not sign in",
      sfunc: () => (window.location.href = "/profile"),
    });
    modalStates.onClose();
  };

  //login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const signIn = async () =>
      await signInWithPopup(auth, provider).then(async (result) => {
        const { uid } = result.user;
        if (uid) {
          {
            await fetchUser(uid);
          }
        }
      });
    customToast({
      func: signIn,
      suc: "Signed in successfully",
      err: "Could not sign in",
    });
    modalStates.onClose();
  };

  const logout = async () => {
    customToast({
      func: async () => {
        await auth.signOut();
        setFUser(null);
        setUser(null);
        localStorage.removeItem("user");
        router.push("/");
      },
      suc: "Logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        fetchUser,
        logout,
        handleGoogleLogin,
        fUser,
        modalStates,
        loggedIn,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  user: IUserFetched | null;
  fUser: IFUser | null;
  handleSignIn: () => void;
  fetchUser: (uid: string) => void;
  logout: () => Promise<void>;
  handleGoogleLogin: () => void;
  modalStates: ReturnType<typeof useDisclosure>;
  loggedIn: boolean;
  isAdmin: boolean;
}

export const useAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
