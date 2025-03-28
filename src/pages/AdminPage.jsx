import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
import Login from '../components/Admin/Login';
import MenuEditor from '../components/Admin/MenuEditor';
import AdminLayout from '../components/Admin/AdminLayout';

const AdminPage = () => {
  const { isAuthenticated } = useContext(MenuContext);

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <AdminLayout>
          <MenuEditor />
        </AdminLayout>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default AdminPage;