import { Bell, HelpCircle, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">DemoApp</h1>
      <div className="flex gap-4">
        <Search className="w-5 h-5 cursor-pointer" />
        <HelpCircle className="w-5 h-5 cursor-pointer" />
        <Bell className="w-5 h-5 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
