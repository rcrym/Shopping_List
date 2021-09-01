import React, { useContext, useState, useEffect } from "react";
import { auth } from "../constants/firebase";
import firebase from "firebase";

export interface IAuthContext  {
  currentUser: firebase.User | null;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  googleLogin: () => Promise<firebase.auth.UserCredential>
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void> | null;
  updatePassword: (password: string) => Promise<void> | null;
};

export const AuthContext = React.createContext<IAuthContext | null>(null);

export function useAuth() {
  return useContext(AuthContext) as IAuthContext;
}

export function AuthProvider({ children }: { children: React.ReactChild }) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function googleLogin(): Promise<firebase.auth.UserCredential> {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(googleProvider);
  }

  function logout(): Promise<void> {
    return auth.signOut();
  }

  function resetPassword(email: string): Promise<void> {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string): Promise<void> | null {
    return currentUser ? currentUser?.updateEmail(email) : null;
  }

  function updatePassword(password: string): Promise<void> | null {
    return currentUser ? currentUser?.updatePassword(password) : null;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    googleLogin,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
