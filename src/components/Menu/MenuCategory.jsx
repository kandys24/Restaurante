import MenuItem from './MenuItem';

const MenuCategory = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-amber-600 px-6 py-3">
        <h2 className="text-2xl font-bold text-white">{category.name}</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;