import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import MenuCategory from './MenuCategory';
import LoadingSpinner from '../Shared/LoadingSpinner';

const MenuLayout = ({ menuData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <LoadingSpinner /> {/* Show loading indicator */}
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p>Menu not available</p> {/* Error state */}
      </div>
    );
  }

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