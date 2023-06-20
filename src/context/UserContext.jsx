import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
    const [user, setUser] = useState({});

    // Register email and password form
    const signupCreate = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // Login email and password 
    const loginUserEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    // LogOut in the user 
    const logoOut = () => {
        return signOut(auth)
    }

    // see current user 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Current User", currentUser);
            setUser(currentUser);
        })

        return () => {
            unSubscribe();
        }

    }, [])

    const authInfo = { user, signupCreate, logoOut, loginUserEmail }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;