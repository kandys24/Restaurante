import { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWu8xKi07yr_60p-IcMCqK1e8x5zdZKu8",
  authDomain: "restaurant-qr-menu-dc10b.firebaseapp.com",
  projectId: "restaurant-qr-menu-dc10b",
  storageBucket: "restaurant-qr-menu-dc10b.firebasestorage.app",
  messagingSenderId: "441579372931",
  appId: "1:441579372931:web:df5a7a0eb86169b71b76b6",
  measurementId: "G-9BLWMD1YNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const menuRef = doc(db, 'restaurants', 'dona_joaquina');
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(menuRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setMenuData(docSnapshot.data().menu);
      } else {
        createDefaultMenu();
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createDefaultMenu = async () => {
    const defaultMenu = {
      restaurantName: "Restaurante Dona Joaquina",
      categories: [
        {
          name: "Almoço",
          items: [
            { 
              id: 1, 
              name: "Feijoada de Feijão Preto", 
              description: "Feito com feijão preto cozido lentamente com uma variedade de carnes", 
              price: 2500 
            },
            { 
              id: 2, 
              name: "Churrasco com Arroz", 
              description: "O Churrasco com Arroz e Batatas Fritas é uma refeição clássica e deliciosa, combinando suculentas carnes grelhadas no fogo com arroz soltinho e batatas fritas crocantes.", 
              price: 3000 
            }
          ]
        }
      ]
    };

    try {
      const menuRef = doc(db, 'restaurants', 'dona_joaquina');
      await setDoc(menuRef, { menu: defaultMenu });
      setMenuData(defaultMenu);
    } catch (error) {
      console.error("Error creating default menu:", error);
    }
  };

  const updateMenu = async (newMenu) => {
    try {
      const menuRef = doc(db, 'restaurants', 'dona_joaquina');
      await setDoc(menuRef, { menu: newMenu }, { merge: true });
      // No need to setMenuData here - the snapshot listener will handle it
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  const login = (password) => {
    if (password === "123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <MenuContext.Provider value={{ 
      menuData, 
      isLoading, 
      updateMenu, 
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </MenuContext.Provider>
  );
};