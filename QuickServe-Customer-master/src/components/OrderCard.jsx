import { Clock, Receipt, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderCard({ order }) {
    const navigate = useNavigate();
    const formatDate = (orderObj) => {
        try {
            // Check for timestamp (number) or date (string)
            const rawDate = orderObj.timestamp || orderObj.date;
            
            if (!rawDate) return "Recently";
            
            const dateObj = new Date(rawDate);
            
            // Validate the date object
            if (isNaN(dateObj.getTime())) {
                return "Recently";
            }
            
            return dateObj.toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short'
            });
        } catch (e) {
            return "Recently";
        }
    };

    const date = formatDate(order);

    const getStatusInfo = (status, completed) => {
        const currentStatus = status || (completed ? 'Completed' : 'Processing');
        switch (currentStatus) {
            case 'Completed': return { label: 'Completed', styles: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
            case 'Cancelled': return { label: 'Cancelled', styles: 'bg-rose-50 text-rose-600 border-rose-100' };
            case 'Ready': return { label: 'Ready', styles: 'bg-purple-50 text-purple-600 border-purple-100' };
            case 'Preparing': return { label: 'Preparing', styles: 'bg-blue-50 text-blue-600 border-blue-100' };
            default: return { label: 'Processing', styles: 'bg-amber-50 text-amber-600 border-amber-100' };
        }
    };

    const statusInfo = getStatusInfo(order.status, order.completed);

    const handleReorder = () => {
        try {
            const currentCart = JSON.parse(localStorage.getItem('quickserve_cart') || '[]');
            const newCart = [...currentCart];
            
            order.items.forEach(pastItem => {
                const existingIndex = newCart.findIndex(i => i.id === pastItem.id);
                if (existingIndex > -1) {
                    newCart[existingIndex].quantity += pastItem.quantity;
                } else {
                    newCart.push({ ...pastItem });
                }
            });
            
            localStorage.setItem('quickserve_cart', JSON.stringify(newCart));
            navigate('/');
        } catch (e) {
            console.error("Reorder failed", e);
        }
    };

    return (
        <div className="bg-white border border-zinc-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden cursor-default">
            {/* Soft decorative accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="flex items-center flex-wrap gap-3 mb-2">
                        <div className="flex items-center gap-2">
                            <Receipt className="w-5 h-5 text-orange-500" />
                            <span className="text-xl font-black text-zinc-900 tracking-tight">#{order.id.slice(-6).toUpperCase()}</span>
                        </div>
                        <div className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusInfo.styles}`}>
                            {statusInfo.label}
                        </div>
                    </div>
                    <div className="flex items-center text-zinc-400">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        <span className="text-xs font-bold uppercase tracking-widest">{date}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mb-10">
                <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] mb-2">Order Items</p>
                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center group/item transition-all">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-50 border border-zinc-100 text-[10px] font-black text-zinc-500 shadow-sm">
                                {item.quantity}
                            </div>
                            <span className="text-zinc-700 font-semibold text-sm group-hover/item:text-zinc-900 transition-colors">{item.name}</span>
                        </div>
                        <span className="text-zinc-400 font-medium text-xs tracking-tighter italic">₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-end pt-6 border-t border-dashed border-zinc-100">
                <button 
                    onClick={handleReorder}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-50 hover:bg-orange-500 hover:text-white text-zinc-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-zinc-100 transition-all duration-300 transform active:scale-95 group/btn"
                >
                    <RefreshCcw className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
                    Reorder This
                </button>
                <div className="flex flex-col items-end">
                    <span className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.25em] mb-1">Total Amount</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-zinc-400">₹</span>
                        <span className="text-4xl font-black text-zinc-900 tracking-tighter">{order.total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
