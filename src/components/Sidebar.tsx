import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LineChart, 
  Calendar, 
  BookOpen,
  Settings,
  LogOut
} from 'lucide-react';
import { signOut } from '../lib/auth';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Trades', to: '/trades', icon: BookOpen },
  { name: 'Analytics', to: '/analytics', icon: LineChart },
  { name: 'Calendar', to: '/calendar', icon: Calendar },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">FX Journal</h2>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 ${
                      isActive ? 'bg-gray-100' : ''
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}