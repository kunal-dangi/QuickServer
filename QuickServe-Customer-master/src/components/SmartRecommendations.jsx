import { Sparkles } from 'lucide-react';
import FoodCard from './FoodCard';

export default function SmartRecommendations({ items, getQuantity, onAdd, onRemove }) {
    if (!items || items.length === 0) return null;

    return (
        <section className="mb-12">
            <div className="flex items-center mb-6">
                <Sparkles className="w-6 h-6 text-orange-500 mr-2" />
                <h2 className="text-2xl font-bold text-zinc-900 tracking-wide drop-shadow-sm">
                    Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">for You</span>
                </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map(item => (
                    <FoodCard
                        key={`rec-${item.id}`}
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
