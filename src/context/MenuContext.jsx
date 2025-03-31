import { createContext, useState, useEffect } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        // Open IndexedDB database
        const request = indexedDB.open('restaurantMenuDB', 1);
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('menu')) {
            db.createObjectStore('menu', { keyPath: 'id', autoIncrement: true });
          }
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction('menu', 'readonly');
          const store = transaction.objectStore('menu');
          const getAllRequest = store.getAll();

          getAllRequest.onsuccess = () => {
            if (getAllRequest.result.length > 0) {
              // Use the most recent menu
              const latestMenu = getAllRequest.result[getAllRequest.result.length - 1];
              setMenuData(latestMenu.data);
            } else {
              createDefaultMenu(db);
            }
            setIsLoading(false);
          };
        };

        request.onerror = (event) => {
          console.error('Database error:', event.target.error);
          createDefaultMenu(); // Fallback
          setIsLoading(false);
        };
      } catch (error) {
        console.error('Error initializing DB:', error);
        setIsLoading(false);
      }
    };

    initDB();
  }, []);

  const createDefaultMenu = async (db) => {
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

    if (db) {
      const transaction = db.transaction('menu', 'readwrite');
      const store = transaction.objectStore('menu');
      store.add({ data: defaultMenu });
    }
    
    setMenuData(defaultMenu);
  };

  const updateMenu = async (newMenu) => {
    try {
      const request = indexedDB.open('restaurantMenuDB', 1);
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('menu', 'readwrite');
        const store = transaction.objectStore('menu');
        store.add({ data: newMenu });
        setMenuData(newMenu);
      };
    } catch (error) {
      console.error('Error updating menu:', error);
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