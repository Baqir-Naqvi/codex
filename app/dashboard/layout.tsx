import SideNav from '@/app/ui/dashboard/sidenav';
import Navbar from '../ui/navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
}
