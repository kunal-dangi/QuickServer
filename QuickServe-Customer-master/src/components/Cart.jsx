import { ShoppingBag, ArrowRight, X } from 'lucide-react';

export default function Cart({ cartItems, onCheckout, isOpen, onClose }) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300" 
                    onClick={onClose}
                />
            )}
            
            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white/95 backdrop-blur-3xl border-l border-zinc-200 p-6 shadow-2xl z-[70] transition-transform duration-300 ease-in-out transform flex flex-col ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-zinc-900 flex items-center">
                        <ShoppingBag className="w-6 h-6 mr-3 text-orange-500" />
                        Your Cart
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                            <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                            <p className="text-lg text-zinc-500">Your cart is empty.</p>
                            <p className="text-sm mt-1 text-zinc-400">Add some delicious items!</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-zinc-50 rounded-xl p-4 border border-zinc-100 shadow-sm">
                                <div>
                                    <p className="font-bold text-zinc-800">{item.name}</p>
                                    <p className="text-sm text-orange-600 font-semibold">₹{item.price} x {item.quantity}</p>
                                </div>
                                <p className="font-extrabold text-lg text-zinc-900">₹{item.price * item.quantity}</p>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="mt-auto border-t border-zinc-200 pt-6">
                        <div className="flex justify-between items-center text-xl font-bold text-zinc-900 mb-6">
                            <span>Total Amount</span>
                            <span className="text-orange-600">₹{total}</span>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.23)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 text-lg"
                        >
                            <span>Proceed to Checkout</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
