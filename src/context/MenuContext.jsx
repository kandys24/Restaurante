import { createContext, useState, useEffect } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load menu from localStorage
    const savedMenu = localStorage.getItem('restaurantMenu');
    if (savedMenu) {
      setMenuData(JSON.parse(savedMenu));
    } else {
      // Default menu if none exists
      const defaultMenu = {
        restaurantName: "Gourmet Delight",
        categories: [
          {
            name: "Starters",
            items: [
              { id: 1, name: "Bruschetta", description: "Toasted bread with tomatoes, garlic and basil", price: 8.99 },
              { id: 2, name: "Calamari", description: "Fried squid with lemon aioli", price: 12.99 }
            ]
          }
        ]
      };
      setMenuData(defaultMenu);
      localStorage.setItem('restaurantMenu', JSON.stringify(defaultMenu));
    }
    setIsLoading(false);
  }, []);

  const updateMenu = (newMenu) => {
    setMenuData(newMenu);
    localStorage.setItem('restaurantMenu', JSON.stringify(newMenu));
  };

  const login = (password) => {
    // In a real app, this would be more secure
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