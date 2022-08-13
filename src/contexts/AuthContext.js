import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase-app/fireabase-config';

const AuthContext = createContext();

const AuthProvider = (props) => {
   const [user, setUser] = useState({});
   const values = { user, setUser };
   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         // setUser(user);
         if (user) {
            // if users collection has many properties which user is not contains
            getDoc(doc(db, 'users', user.uid))
               .then((snapshot) => {
                  if (!snapshot.data()) {
                     console.log('chua co tai khoan');

                     setDoc(doc(db, 'users', user.uid), {
                        fullname: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        // password: values.password,
                     });
                  } else {
                     console.log('da co tai khoan');
                     setUser({
                        ...user,
                        ...snapshot.data(),
                        displayName: snapshot.data().fullname,
                     });
                  }
               })
               .catch(() => {
                  console.log('error');
                  setUser(user);
               });
         } else {
            setUser(null);
         }
         // console.log(user);
      });
   }, []);
   return (
      <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
   );
};

const useAuth = () => {
   const context = useContext(AuthContext);
   if (typeof context === 'undefined')
      throw new Error('useAuth must be used within AuthProvider');
   return context;
};

export { useAuth, AuthProvider };
