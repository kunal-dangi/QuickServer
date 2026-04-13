import { useState } from 'react';
import { Plus } from 'lucide-react';

const COMBOS = [
    {
        id: 'c1',
        name: 'Burger + Coke',
        price: 110,
        originalPrice: 150,
        badge: 'Best Seller',
        badgeColor: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        images: [
            'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Hamburger.png',
            'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cup%20with%20Straw.png'
        ]
    },
    {
        id: 'c2',
        name: 'Pizza + Pepsi',
        price: 150,
        originalPrice: 200,
        badge: 'Popular Choice',
        badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
        images: [
            'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pizza.png',
            'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Beverage%20Box.png'
        ]
    },
    {
        id: 'c3',
        name: 'Fries + Cold Coffee',
        price: 99,
        originalPrice: 130,
        badge: 'Perfect Match',
        badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
        images: [
            'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/French%20Fries.png',
            'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cup%20with%20Straw.png'
        ]
    }
];

export default function RecommendedCombos({ onAddCombo }) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 tracking-wide drop-shadow-sm">
                Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Combos</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COMBOS.map((combo) => (
                    <div 
                        key={combo.id} 
                        className="bg-white backdrop-blur-xl border border-zinc-200 rounded-3xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-orange-200 hover:bg-zinc-50 group flex flex-col relative overflow-hidden"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-all"></div>

                        {/* Top Badge */}
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md shadow-sm ${combo.badgeColor}`}>
                                {combo.badge}
                            </span>
                        </div>

                        {/* Images */}
                        <div className="flex items-center justify-center space-x-[-15px] mb-6 relative">
                            {combo.images.map((img, idx) => (
                                <ComboImage key={idx} img={img} idx={idx} />
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                <Plus className="w-8 h-8 text-white/50 bg-black/20 rounded-full p-1 backdrop-blur-sm" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-auto">
                            <h3 className="text-xl font-extrabold text-zinc-900 mb-2">{combo.name}</h3>
                            
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-sm text-zinc-500 line-through mb-0.5">₹{combo.originalPrice}</p>
                                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                                        ₹{combo.price}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onAddCombo({ ...combo, imageUrl: combo.images[0] })}
                                    className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ComboImage({ img, idx }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={`relative z-${10 - idx} transition-transform duration-500 group-hover:scale-110 ${idx === 1 ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'} group-hover:rotate-6`}>
            {!imgError && img ? (
                <img 
                    src={img} 
                    alt="combo item" 
                    className="w-24 h-24 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className="w-24 h-24 flex items-center justify-center text-5xl select-none drop-shadow-md">
                    {idx === 0 ? '🍔' : '🥤'}
                </div>
            )}
        </div>
    );
}
