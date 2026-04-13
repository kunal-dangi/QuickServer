import { CheckCircle2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Toast({ toasts, removeToast }) {
    return (
        <div className="fixed top-[6px] right-[6px] z-[100] flex flex-col-reverse gap-[6px] pointer-events-none w-[90vw] max-w-xs">
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
            ))}
        </div>
    );
}

function ToastItem({ toast, removeToast }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation shortly after mounting
        const enterTimer = requestAnimationFrame(() => setIsVisible(true));
        
        const exitTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => removeToast(toast.id), 300); // Wait for fade out to complete before removing from DOM
        }, 3000);

        return () => {
            cancelAnimationFrame(enterTimer);
            clearTimeout(exitTimer);
        };
    }, [toast.id, removeToast]);

    return (
        <div 
            className={`pointer-events-auto flex items-center p-4 bg-white/95 backdrop-blur-2xl border border-zinc-200 rounded-2xl shadow-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
        >
            <div className="flex-shrink-0 bg-green-100 p-2 rounded-full mr-4 border border-green-200">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 mr-4">
                <p className="font-bold text-zinc-900 text-sm">Added to Cart</p>
                <p className="text-zinc-600 text-sm mt-0.5"><span className="font-bold text-orange-600">{toast.quantity}x</span> {toast.name}</p>
            </div>
            <button 
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 p-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-500 hover:text-rose-500 transition-colors"
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
