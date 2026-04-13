import { Link, useLocation } from 'react-router-dom';
import { History, Home, Utensils } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    if (location.pathname === '/admin') {
        return null;
    }

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 text-zinc-800 transition-all shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Utensils className="h-6 w-6 text-orange-500" />
                        <span className="font-extrabold text-xl tracking-wide text-zinc-900">QuickServe</span>
                    </Link>

                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors font-medium ${location.pathname === '/' ? 'bg-orange-100 text-orange-600' : 'hover:bg-zinc-100 hover:text-zinc-900 text-zinc-600'
                                }`}
                        >
                            <Home className="h-4 w-4" />
                            <span className="hidden sm:inline">Menu</span>
                        </Link>
                        <Link
                            to="/history"
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors font-medium ${location.pathname === '/history' ? 'bg-orange-100 text-orange-600' : 'hover:bg-zinc-100 hover:text-zinc-900 text-zinc-600'
                                }`}
                        >
                            <History className="h-4 w-4" />
                            <span className="hidden sm:inline">Order History</span>
                        </Link>
                        <Link
                            to="/admin"
                            className="flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors font-medium hover:bg-zinc-100 hover:text-zinc-900 text-zinc-600 border border-zinc-200"
                        >
                            <span className="hidden sm:inline font-bold">Admin Panel</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
