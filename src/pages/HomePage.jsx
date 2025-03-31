import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
import MenuLayout from '../components/Menu/MenuLayout';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const HomePage = () => {
  const { menuData, isLoading } = useContext(MenuContext);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuLayout menuData={menuData} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;