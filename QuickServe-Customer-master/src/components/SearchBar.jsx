import { Search } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange }) {
    return (
        <div className="relative max-w-2xl w-full mx-auto sm:mx-0 mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search burgers, pizza, drinks..."
                className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white backdrop-blur-xl border border-zinc-200 rounded-2xl shadow-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 transition-all duration-300 text-base sm:text-lg"
            />
        </div>
    );
}
