import { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import { PackageX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function History() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = () => {
            const savedOrders = JSON.parse(localStorage.getItem('quickserve_orders') || '[]');
            setOrders(savedOrders);
        };
        loadOrders();

        const handleStorageChange = (e) => {
            if (e.key === 'quickserve_orders') {
                loadOrders();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mb-14">
                <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 tracking-tighter mb-4">
                    Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">Past Orders</span>
                </h1>
                <p className="text-zinc-500 text-lg font-medium max-w-lg leading-relaxed">
                    View your history, track order status, and satisfy those recurring cravings.
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="bg-white border border-zinc-100 rounded-[3rem] p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                    <div className="w-48 h-48 mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <img 
                            src="/assets/empty-history.png" 
                            alt="Empty Basket" 
                            className="w-full h-full object-contain relative z-10 drop-shadow-2xl animate-bounce-slow"
                            style={{ animation: 'bounce 3s infinite ease-in-out' }}
                        />
                    </div>
                    <h2 className="text-3xl font-black text-zinc-900 mb-4 tracking-tight">Your history is hungry!</h2>
                    <p className="text-zinc-500 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                        It looks like your order history is a bit empty. Let's head over to the menu and find something delicious to fill it up.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex py-4 px-10 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Explore Menu
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}
