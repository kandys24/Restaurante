const Header = ({ title }) => {
    return (
      <header className="text-center">
        <h1 className="text-4xl font-bold text-amber-600 mb-2">{title}</h1>
        <p className="text-gray-600">Menu de hoje</p>
        <div className="mt-6 border-t border-b border-gray-200 py-3">
          <p className="text-sm text-gray-500">Scan the QR code to view our menu anytime</p>
        </div>
      </header>
    );
  };
  
  export default Header;