
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Ticket, 
  Image, 
  User, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useUserContext();
  
  const links = [
    { path: '/admin', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { path: '/admin/events', label: 'Events', icon: <Calendar className="h-5 w-5" /> },
    { path: '/admin/speakers', label: 'Speakers', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/tickets', label: 'Tickets', icon: <Ticket className="h-5 w-5" /> },
    { path: '/admin/gallery', label: 'Gallery', icon: <Image className="h-5 w-5" /> },
    { path: '/admin/users', label: 'Users', icon: <User className="h-5 w-5" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];
  
  return (
    <div className="w-64 bg-card border-r border-border min-h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-6 py-4 text-center text-primary">
        Admin Panel
      </div>
      
      <div className="flex items-center gap-3 mb-6 p-3 bg-muted/40 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          {user?.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{user?.name}</div>
          <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
        </div>
      </div>
      
      <Separator className="my-2" />
      
      <nav className="space-y-1 flex-1 py-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
              location.pathname === link.path
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      
      <Separator className="my-2" />
      
      <div className="pt-4">
        <Link to="/" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
          <Home className="h-5 w-5" />
          <span>Back to Website</span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start mt-2 text-muted-foreground hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
