import { Bell, HelpCircle, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">DemoApp</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200 hover:scale-110 transform" />
          <HelpCircle className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200 hover:scale-110 transform" />
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200 hover:scale-110 transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
