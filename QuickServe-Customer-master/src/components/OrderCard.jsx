import { Clock, Receipt } from 'lucide-react';

export default function OrderCard({ order }) {
    const date = new Date(order.timestamp).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-colors">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-4 border-b border-white/10 gap-2">
                <div className="flex items-center text-blue-200">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{date}</span>
                </div>
                <div className="flex items-center text-white font-bold bg-white/10 px-3 py-1 rounded-lg w-fit">
                    <Receipt className="w-4 h-4 mr-2 text-blue-300" />
                    Order #{order.id.slice(-6).toUpperCase()}
                </div>
            </div>

            <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-white/90 text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-blue-200 font-medium">Total Amount</span>
                <span className="text-xl font-bold text-white">₹{order.total}</span>
            </div>
        </div>
    );
}
