import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Play,
  Settings,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react";
import Logo from "../Design/Logo";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Features", icon: Play, path: "/features" },
    { label: "Documentation & Help", icon: Info, path: "/documentation" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={`h-screen ${collapsed ? "w-16" : "w-64"
        } bg-[#101828] text-white flex flex-col justify-between transition-all duration-300`}
    >
      {/* TOP */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && <Logo />}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="cursor-pointer ml-auto"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        {/* MENU */}
        <div className="mt-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded cursor-pointer
                ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}
                `}
              >
                <Icon size={20} />

                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 p-3">
        <div className="flex flex-col gap-2">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700"
          >
            <Users size={20} />
            {!collapsed && "Profile"}
          </Link>

          <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer w-full">
            <LogOut size={20} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;