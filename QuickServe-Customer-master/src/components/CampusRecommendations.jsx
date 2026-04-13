import { Flame } from 'lucide-react';
import FoodCard from './FoodCard';

export default function CampusRecommendations({ items, getQuantity, onAdd, onRemove }) {
    if (!items || items.length === 0) return null;

    return (
        <section className="mb-12">
            <div className="flex items-center mb-6">
                <Flame className="w-6 h-6 text-red-500 mr-2 animate-pulse" />
                <h2 className="text-2xl font-bold text-zinc-900 tracking-wide drop-shadow-sm">
                    Most Ordered on <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Campus</span>
                </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
                {/* Subtle highlight background behind the grid */}
                <div className="absolute inset-0 bg-red-500/5 blur-3xl pointer-events-none rounded-[3rem]"></div>
                
                {items.map(item => (
                    <FoodCard
                        key={`campus-${item.id}`}
                        item={item}
                        quantity={getQuantity(item.id)}
                        onAdd={onAdd}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </section>
    );
}
