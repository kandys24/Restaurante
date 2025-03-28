import { useState, useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';

const MenuEditor = () => {
  const { menuData, updateMenu } = useContext(MenuContext);
  const [editedMenu, setEditedMenu] = useState(JSON.parse(JSON.stringify(menuData)));
  const [newCategory, setNewCategory] = useState('');

  const handleSave = () => {
    updateMenu(editedMenu);
    alert('Menu updated successfully!');
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setEditedMenu({
        ...editedMenu,
        categories: [
          ...editedMenu.categories,
          {
            name: newCategory,
            items: []
          }
        ]
      });
      setNewCategory('');
    }
  };

  const addItem = (categoryIndex) => {
    const newItem = {
      id: Date.now(),
      name: '',
      description: '',
      price: 0
    };
    
    const updatedCategories = [...editedMenu.categories];
    updatedCategories[categoryIndex].items.push(newItem);
    
    setEditedMenu({
      ...editedMenu,
      categories: updatedCategories
    });
  };

  const updateItem = (categoryIndex, itemIndex, field, value) => {
    const updatedCategories = [...editedMenu.categories];
    updatedCategories[categoryIndex].items[itemIndex][field] = value;
    
    setEditedMenu({
      ...editedMenu,
      categories: updatedCategories
    });
  };

  const removeItem = (categoryIndex, itemIndex) => {
    const updatedCategories = [...editedMenu.categories];
    updatedCategories[categoryIndex].items.splice(itemIndex, 1);
    
    setEditedMenu({
      ...editedMenu,
      categories: updatedCategories
    });
  };

  const removeCategory = (categoryIndex) => {
    const updatedCategories = [...editedMenu.categories];
    updatedCategories.splice(categoryIndex, 1);
    
    setEditedMenu({
      ...editedMenu,
      categories: updatedCategories
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Menu Editor</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Restaurant Name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={editedMenu.restaurantName}
          onChange={(e) => setEditedMenu({...editedMenu, restaurantName: e.target.value})}
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
          >
            Add Category
          </button>
        </div>
      </div>

      {editedMenu.categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-amber-600 px-6 py-3 flex justify-between items-center">
            <input
              type="text"
              className="text-2xl font-bold text-white bg-transparent border-b border-transparent focus:border-white focus:outline-none"
              value={category.name}
              onChange={(e) => {
                const updatedCategories = [...editedMenu.categories];
                updatedCategories[categoryIndex].name = e.target.value;
                setEditedMenu({...editedMenu, categories: updatedCategories});
              }}
            />
            <button
              onClick={() => removeCategory(categoryIndex)}
              className="text-white hover:text-red-200 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
          
          <div className="px-6 py-4">
            <button
              onClick={() => addItem(categoryIndex)}
              className="mb-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
            >
              + Add Item
            </button>
            
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        value={item.name}
                        onChange={(e) => updateItem(categoryIndex, itemIndex, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        value={item.price}
                        onChange={(e) => updateItem(categoryIndex, itemIndex, 'price', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                      rows="2"
                      value={item.description}
                      onChange={(e) => updateItem(categoryIndex, itemIndex, 'description', e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => removeItem(categoryIndex, itemIndex)}
                    className="text-red-600 hover:text-red-800 text-sm transition-colors duration-200"
                  >
                    Remove Item
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuEditor;