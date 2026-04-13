import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import Cart from '../components/Cart';

import CategoryBar from '../components/CategoryBar';
import SearchBar from '../components/SearchBar';
import PromoBanner from '../components/PromoBanner';
import RecommendedCombos from '../components/RecommendedCombos';
import SmartRecommendations from '../components/SmartRecommendations';
import CampusRecommendations from '../components/CampusRecommendations';
import Toast from '../components/Toast';

const FOOD_ITEMS = [
    { id: '1', name: 'Alu Burger', price: 50, icon: '🍔', category: 'Burgers', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Hamburger.png', rating: 4.5, deliveryTime: '15-20 min', tags: ['Veg', 'Popular'] },
    { id: '2', name: 'Cheese Burger', price: 70, icon: '🍔', category: 'Burgers', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cheese%20Wedge.png', rating: 4.8, deliveryTime: '15-20 min', tags: ['Veg', 'Bestseller'] },
    { id: '3', name: 'Veggie Pizza', price: 120, icon: '🍕', category: 'Pizza', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pizza.png', rating: 4.2, deliveryTime: '25-30 min', tags: ['Veg', 'Fresh'] },
    { id: '4', name: 'Masala Maggi', price: 40, icon: '🍜', category: 'Maggi', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Spaghetti.png', rating: 4.6, deliveryTime: '10-15 min', tags: ['Veg', 'Spicy'] },
    { id: '5', name: 'Cheese Maggi', price: 60, icon: '🍜', category: 'Maggi', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Steaming%20Bowl.png', rating: 4.7, deliveryTime: '10-15 min', tags: ['Veg', 'Popular'] },
    { id: '6', name: 'French Fries', price: 50, icon: '🍟', category: 'Snacks', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/French%20Fries.png', rating: 4.4, deliveryTime: '10-15 min', tags: ['Veg', 'Fresh'] },
    { id: '7', name: 'Cold Coffee', price: 80, icon: '🥤', category: 'Cold Drinks', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cup%20with%20Straw.png', rating: 4.9, deliveryTime: '5-10 min', tags: ['Beverage', 'Popular'] },
    { id: '8', name: 'Masala Tea', price: 20, icon: '☕', category: 'Beverages', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Hot%20Beverage.png', rating: 4.8, deliveryTime: '5-10 min', tags: ['Beverage', 'Fresh'] },
    { id: '9', name: 'Coca Cola', price: 40, icon: '🥤', category: 'Cold Drinks', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Teacup%20Without%20Handle.png', rating: 4.3, deliveryTime: '5-10 min', tags: ['Cold', 'Popular'] },
    { id: '10', name: 'Orange Juice', price: 60, icon: '🧃', category: 'Juices', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Beverage%20Box.png', rating: 4.6, deliveryTime: '5-10 min', tags: ['Fresh', 'Healthy'] },
    { id: '11', name: 'Chocolate Shake', price: 90, icon: '🧋', category: 'Shakes', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Bubble%20Tea.png', rating: 4.9, deliveryTime: '10-15 min', tags: ['Dessert', 'Bestseller'] },
    { id: '12', name: 'Berry Smoothie', price: 110, icon: '🍹', category: 'Smoothies', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Tropical%20Drink.png', rating: 4.7, deliveryTime: '10-15 min', tags: ['Fresh', 'Vegan'] },
    { id: '13', name: 'Vada Pav', price: 20, icon: '🍔', category: 'Campus Favourites', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Stuffed%20Flatbread.png', rating: 4.8, deliveryTime: '5-10 min', tags: ['Campus Favourite', 'Budget Friendly'] },
    { id: '14', name: 'Cheese Vada Pav', price: 35, icon: '🍔', category: 'Campus Favourites', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Sandwich.png', rating: 4.9, deliveryTime: '10-15 min', tags: ['Campus Favourite', 'Cheesy'] },
    { id: '15', name: 'Masala Pav', price: 30, icon: '🍞', category: 'Campus Favourites', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Bread.png', rating: 4.6, deliveryTime: '10-15 min', tags: ['Spicy', 'Budget Friendly'] },
    { id: '16', name: 'Misal Pav', price: 60, icon: '🍛', category: 'Campus Favourites', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Shallow%20Pan%20of%20Food.png', rating: 4.7, deliveryTime: '15-20 min', tags: ['Campus Favourite', 'Spicy'] },
    { id: '17', name: 'Tawa Pulav', price: 80, icon: '🍚', category: 'Campus Favourites', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Bento%20Box.png', rating: 4.5, deliveryTime: '15-20 min', tags: ['Comfort Food', 'Filling'] },
    { id: '18', name: 'Bread Pakoda', price: 25, icon: '🥪', category: 'Campus Favourites', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Croissant.png', rating: 4.8, deliveryTime: '5-10 min', tags: ['Crispy', 'Budget Friendly'] },
    { id: '19', name: 'Veg Fried Rice', price: 120, icon: '🍚', category: 'Indo-Chinese', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cooked%20Rice.png', rating: 4.6, deliveryTime: '15-20 min', tags: ['Wok Tossed', 'Classic'] },
    { id: '20', name: 'Schezwan Fried Rice', price: 140, icon: '🍛', category: 'Indo-Chinese', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Curry%20Rice.png', rating: 4.8, deliveryTime: '15-20 min', tags: ['Spicy', 'Popular'] },
    { id: '21', name: 'Hakka Noodles', price: 110, icon: '🍜', category: 'Indo-Chinese', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Noodles.png', rating: 4.7, deliveryTime: '20-25 min', tags: ['Comfort Food', 'Bestseller'] },
    { id: '22', name: 'Schezwan Noodles', price: 130, icon: '🍜', category: 'Indo-Chinese', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pot%20of%20Food.png', rating: 4.9, deliveryTime: '20-25 min', tags: ['Spicy', 'Trending'] },
    { id: '23', name: 'Veg Manchurian', price: 150, icon: '🥘', category: 'Indo-Chinese', imageUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Green%20Salad.png', rating: 4.5, deliveryTime: '20-25 min', tags: ['Saucy', 'Must Try'] }
];

export default function Home() {
    const [cartItems, setCartItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toasts, setToasts] = useState([]);
    const navigate = useNavigate();

    const handleAdd = (item) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        
        // Find quantity for toast
        const quantity = cartItems.find(i => i.id === item.id)?.quantity || 0;
        setToasts(prev => [...prev, { id: Date.now(), name: item.name, quantity: quantity + 1 }]);
    };

    const handleRemoveToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const handleRemove = (itemId) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === itemId);
            if (existing.quantity === 1) {
                return prev.filter(i => i.id !== itemId);
            }
            return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
        });
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            timestamp: Date.now(),
            date: new Date().toISOString(),
            items: cartItems,
            total
        };

        const existingOrders = JSON.parse(localStorage.getItem('quickserve_orders') || '[]');
        localStorage.setItem('quickserve_orders', JSON.stringify([order, ...existingOrders]));

        setCartItems([]);
        navigate('/history');
    };

    const getQuantity = (itemId) => {
        const item = cartItems.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    };

    const smartItems = useMemo(() => {
        return FOOD_ITEMS.filter(item => ['3', '6', '11', '1'].includes(item.id)).map((item) => {
            let extraTag = 'Trending';
            if (item.id === '3' || item.id === '1') extraTag = 'Most Ordered';
            
            return {
                ...item,
                tags: [extraTag, ...item.tags.filter(t => t !== 'Most Ordered' && t !== 'Trending')]
            };
        });
    }, []);

    const campusPicks = useMemo(() => {
        // IDs: 4 (Masala Maggi), 13 (Vada Pav), 7 (Cold Coffee), 19 (Veg Fried Rice)
        return FOOD_ITEMS.filter(item => ['4', '13', '7', '19'].includes(item.id)).map(item => {
            return {
                ...item,
                tags: ['🔥 Top Choice', ...item.tags]
            };
        });
    }, []);

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const filteredItems = FOOD_ITEMS.filter(item => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            // Find the most visible intersecting section
            const visibleSections = entries.filter(entry => entry.isIntersecting);
            if (visibleSections.length > 0) {
                const active = visibleSections[0].target.id.replace('section-', '');
                setActiveCategory(active);
                
                // Optionally scroll the category bar horizontally to keep active tab in view
                const catElement = document.getElementById(`catTab-${active}`);
                if (catElement) {
                    catElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        }, { rootMargin: '-10% 0px -80% 0px' });

        const sections = document.querySelectorAll('[id^="section-"]');
        sections.forEach(s => observer.observe(s));
        
        return () => observer.disconnect();
    }, [filteredItems]);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        if (categoryId === 'All') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const section = document.getElementById(`section-${categoryId}`);
            if (section) {
                // Accommodate for sticky Navbar (top-0) and sticky CategoryBar (top-16)
                // Offset calculation ensures the header title perfectly aligns below the sticky bars
                const yOffset = -180; 
                const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
                    What are you <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">craving</span> today?
                </h1>
                <p className="text-lg text-zinc-600 max-w-2xl">
                    Fresh, hot, and tasty food delivered right when you need it. Select your favorites below.
                </p>
            </div>

            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <PromoBanner onExplore={() => {
                setActiveCategory('Combos');
                window.scrollTo({ top: 300, behavior: 'smooth' });
            }} />

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-10"></div>

            <div id="section-Combos" className="scroll-mt-32 bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-zinc-100 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <RecommendedCombos onAddCombo={handleAdd} />
            </div>

            <div className="bg-gradient-to-b from-zinc-50 to-white rounded-[2.5rem] p-6 lg:p-10 border border-orange-500/10 mb-12 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                <SmartRecommendations 
                    items={smartItems} 
                    getQuantity={getQuantity} 
                    onAdd={handleAdd} 
                    onRemove={handleRemove} 
                />
            </div>

            <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-zinc-100 mb-16 relative overflow-hidden">
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
                <CampusRecommendations 
                    items={campusPicks} 
                    getQuantity={getQuantity} 
                    onAdd={handleAdd} 
                    onRemove={handleRemove} 
                />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-12 mt-4"></div>

            <CategoryBar activeCategory={activeCategory} onSelectCategory={handleCategoryClick} />

            <div className="w-full space-y-16 mt-8">
                {Object.keys(groupedItems).map(category => (
                    <div key={category} id={`section-${category}`} className="scroll-mt-32 pt-4">
                        <h3 className="text-3xl font-extrabold text-zinc-800 mb-8 flex items-center drop-shadow-sm">
                            {category} <div className="ml-4 flex-1 h-[2px] bg-gradient-to-r from-orange-500/30 to-transparent rounded-full"></div>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
                            {/* Decorative background glow for main sections */}
                            <div className="absolute inset-0 bg-orange-500/5 blur-3xl pointer-events-none rounded-[3rem] -z-10"></div>
                            
                            {groupedItems[category].map(item => (
                                <FoodCard
                                    key={item.id}
                                    item={item}
                                    quantity={getQuantity(item.id)}
                                    onAdd={handleAdd}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Cart 
                cartItems={cartItems} 
                onCheckout={handleCheckout} 
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            {/* Floating Cart Button */}
            <button 
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[40] bg-gradient-to-r from-orange-500 to-rose-600 p-4 rounded-full shadow-lg shadow-orange-500/30 hover:scale-105 hover:shadow-[0_12px_40px_rgba(249,115,22,0.4)] transition-all duration-300 group"
            >
                <div className="relative">
                    <ShoppingBag className="w-7 h-7 text-white" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-bounce shadow-md">
                            {totalItems}
                        </span>
                    )}
                </div>
            </button>

            {/* Toast Notifications */}
            <Toast toasts={toasts} removeToast={handleRemoveToast} />
        </div>
    );
}
