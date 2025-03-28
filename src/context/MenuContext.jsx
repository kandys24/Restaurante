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
        restaurantName: "Restaurante Dona Joaquina",
        categories: [
          {
            name: "Starters",
            items: [
              { id: 1, name: "Feijoada de Feijão Preto", description: " feito com feijão preto cozido lentamente com uma variedade de carnes", price: 2500 },
              { id: 2, name: "Churrasco com Arroz", description: "O Churrasco com Arroz e Batatas Fritas é uma refeição clássica e deliciosa, combinando suculentas carnes grelhadas no fogo com arroz soltinho e batatas fritas crocantes.", price: 3000 }
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