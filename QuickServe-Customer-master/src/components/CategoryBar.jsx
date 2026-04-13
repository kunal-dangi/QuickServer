import { useRef } from 'react';

const CATEGORIES = [
    { id: 'All', label: 'All', icon: '🍽️', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Fork%20and%20Knife%20with%20Plate.png' },
    { id: 'Burgers', label: 'Burgers', icon: '🍔', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Hamburger.png' },
    { id: 'Pizza', label: 'Pizza', icon: '🍕', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pizza.png' },
    { id: 'Snacks', label: 'Snacks', icon: '🍟', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/French%20Fries.png' },
    { id: 'Maggi', label: 'Maggi', icon: '🍜', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Steaming%20Bowl.png' },
    { id: 'Beverages', label: 'Beverages', icon: '☕', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Hot%20Beverage.png' },
    { id: 'Cold Drinks', label: 'Cold Drinks', icon: '🥤', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cup%20with%20Straw.png' },
    { id: 'Juices', label: 'Fresh Juices', icon: '🧃', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Beverage%20Box.png' },
    { id: 'Shakes', label: 'Milkshakes', icon: '🧋', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Bubble%20Tea.png' },
    { id: 'Smoothies', label: 'Smoothies', icon: '🍹', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Tropical%20Drink.png' },
    { id: 'Campus Favourites', label: 'Campus Favourites', icon: '🎒', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/School%20Backpack.png' },
    { id: 'Indo-Chinese', label: 'Indo-Chinese', icon: '🥡', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Takeout%20Box.png' },
    { id: 'Combos', label: 'Combos', icon: '🍱', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Bento%20Box.png' },
];

export default function CategoryBar({ activeCategory, onSelectCategory }) {
    const scrollContainerRef = useRef(null);

    return (
        <div className="sticky top-16 z-40 mx-[-16px] sm:mx-0 px-4 sm:px-4 py-4 mb-8 bg-white/80 backdrop-blur-xl border-b sm:border border-zinc-200 shadow-sm sm:rounded-2xl transition-all duration-300">
            <div 
                ref={scrollContainerRef}
                className="flex items-center space-x-3 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style dangerouslySetInnerHTML={{__html: `
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                `}} />
                
                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            id={`catTab-${cat.id}`}
                            onClick={() => onSelectCategory(cat.id)}
                            className={`relative flex items-center space-x-2 px-5 py-2.5 min-w-max rounded-full transition-all duration-300 ${
                                isActive 
                                    ? 'bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 font-extrabold border border-orange-200 shadow-md transform -translate-y-0.5' 
                                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:shadow-sm hover:bg-zinc-50'
                            }`}
                        >
                            <span className="w-6 h-6 flex items-center justify-center transition-transform duration-300 transform group-hover:scale-110">
                                <img src={cat.imageUrl} alt={cat.label} className="w-full h-full object-contain drop-shadow-md" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='inline'; }} />
                                <span style={{display: 'none'}} className="text-xl">{cat.icon}</span>
                            </span>
                            <span className="text-sm font-semibold tracking-wide">
                                {cat.label}
                            </span>
                            
                            {/* Animated underline effect */}
                            {isActive && (
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[4px] bg-gradient-to-r from-orange-500 to-rose-500 rounded-full shadow-[0_2px_8px_rgba(249,115,22,0.6)] animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
