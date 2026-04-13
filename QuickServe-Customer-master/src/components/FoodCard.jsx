import { useState } from 'react';
import { Plus, Minus, Star, Clock } from 'lucide-react';

export default function FoodCard({ item, quantity, onAdd, onRemove }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="bg-white backdrop-blur-md border border-zinc-200 rounded-[2rem] p-6 flex flex-col shadow-md shadow-zinc-200/50 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-300 relative overflow-hidden group">
            {/* Soft decorative glow behind the image */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-orange-400/10 blur-2xl rounded-full pointer-events-none group-hover:bg-orange-400/20 transition-colors"></div>

            <div className="w-full h-40 mt-2 mb-6 flex items-center justify-center relative">
                {!imgError && item?.imageUrl ? (
                    <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-32 h-32 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-32 h-32 flex items-center justify-center text-7xl select-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-sm">
                        {item?.icon || '🍽️'}
                    </div>
                )}
            </div>
            
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-zinc-800 tracking-wide">{item?.name || 'Unknown Item'}</h3>
                <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-lg border border-yellow-200">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-sm font-bold">{item?.rating || '0.0'}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
                {item.tags?.map((tag, idx) => (
                    <span 
                        key={idx} 
                        className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                            tag.toLowerCase() === 'veg' 
                                ? 'bg-green-100 text-green-700 border-green-200' 
                                : tag.toLowerCase() === 'popular' || tag.toLowerCase() === 'bestseller'
                                ? 'bg-orange-100 text-orange-700 border-orange-200'
                                : tag.includes('🔥')
                                ? 'bg-red-100 text-red-600 border-red-200'
                                : 'bg-blue-100 text-blue-700 border-blue-200'
                        }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center space-x-1.5 text-zinc-500 text-sm font-medium mb-6">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>{item?.deliveryTime || 'N/A'}</span>
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100">
                <p className="text-2xl font-extrabold text-zinc-800">
                    <span className="text-sm text-zinc-500 mr-1 opacity-80">₹</span>
                    {item?.price || 0}
                </p>

                <div className="relative w-[110px] h-[40px]">
                    <div 
                        className={`absolute inset-0 transition-all duration-300 ease-out transform origin-center ${
                            quantity > 0 ? 'opacity-0 scale-90 pointer-events-none blur-sm' : 'opacity-100 scale-100 blur-0'
                        }`}
                    >
                        <button
                            onClick={() => onAdd(item)}
                            className="w-full h-full bg-gradient-to-r from-orange-400 to-rose-500 hover:from-orange-500 hover:to-rose-600 text-white font-bold rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center p-0"
                        >
                            Add
                        </button>
                    </div>

                    <div 
                        className={`absolute inset-0 flex items-center justify-between bg-zinc-100 rounded-full border border-zinc-200 p-1 shadow-inner transition-all duration-300 ease-out transform origin-center ${
                            quantity > 0 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 pointer-events-none blur-sm'
                        }`}
                    >
                        <button
                            onClick={() => onRemove(item.id)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 rounded-full transition-colors text-zinc-600 hover:text-rose-500"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-base select-none text-center min-w-[20px] text-zinc-800">{quantity}</span>
                        <button
                            onClick={() => onAdd(item)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 rounded-full transition-colors text-zinc-600 hover:text-green-600"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
