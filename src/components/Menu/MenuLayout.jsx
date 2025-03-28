import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import MenuCategory from './MenuCategory';

const MenuLayout = ({ menuData }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Header title={menuData.restaurantName} />
      
      <div className="mt-12 space-y-12">
        {menuData.categories.map((category) => (
          <MenuCategory 
            key={category.name} 
            category={category} 
          />
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default MenuLayout;