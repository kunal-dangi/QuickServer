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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight">
                Your <span className="text-blue-400">Past Orders</span>
            </h1>

            {orders.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 text-center border border-white/10 shadow-2xl">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <PackageX className="w-12 h-12 text-blue-300/50" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">No orders placed yet</h2>
                    <p className="text-blue-200/70 mb-8 max-w-md mx-auto">
                        It looks like you haven't ordered anything yet. Browse our delicious menu and place your first order!
                    </p>
                    <Link
                        to="/"
                        className="inline-flex py-3 px-8 bg-blue-600/80 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
                    >
                        Browse Menu
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}
