const MenuItem = ({ item }) => {
  const setCurrencyFormat = (amount) => {
      const pamount = amount || 0;
      const numberOfDecimals = 2; 
      const formattedValue = pamount.toLocaleString("pt-AO", {
          style: "currency",
          currency: "AOA",
          minimumFractionDigits: numberOfDecimals,
          maximumFractionDigits: numberOfDecimals,
      });

      return formattedValue;
  };

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600 mt-1">{item.description}</p>
        </div>
        <span className="text-lg font-bold text-amber-600">{setCurrencyFormat(item.price)}</span>
      </div>
    </div>
  );
};

export default MenuItem;