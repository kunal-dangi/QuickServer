export default function PromoBanner({ onExplore }) {
    return (
        <div className="relative w-full mb-8 rounded-[2rem] overflow-hidden shadow-sm border border-orange-100">
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes gradient-xy {
                    0%, 100% {
                        background-size: 200% 200%;
                        background-position: left center;
                    }
                    50% {
                        background-size: 200% 200%;
                        background-position: right center;
                    }
                }
                .animate-gradient-xy {
                    animation: gradient-xy 5s ease infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(-5deg); }
                }
                .animate-float-delayed {
                    animation: float-delayed 7s ease-in-out infinite 1s;
                }
            `}} />
            
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-pink-100 to-orange-50 animate-gradient-xy opacity-90"></div>
            
            {/* Decorative Overlay / Glass effect */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

            {/* Floating Food Illustrations (3D Icons) */}
            <div className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center space-x-2 md:space-x-4 opacity-90 z-0">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Bento%20Box.png" alt="Bento" className="w-24 md:w-32 animate-float drop-shadow-2xl" />
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Hamburger.png" alt="Burger" className="w-20 md:w-28 animate-float-delayed drop-shadow-2xl mt-12" />
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/French%20Fries.png" alt="Fries" className="w-24 md:w-32 animate-float drop-shadow-2xl" />
            </div>
            
            <div className="relative z-10 px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/60 backdrop-blur-md border border-orange-200 text-orange-700 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-sm">
                        Today's Special
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-3 tracking-tight drop-shadow-sm">
                        Flat <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">20% OFF</span>
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-600 font-medium mb-6 md:mb-8 font-medium">
                        On all Combos & Special Meals
                    </p>
                    <button 
                        onClick={onExplore}
                        className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3.5 rounded-full font-extrabold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto md:mx-0 group"
                    >
                        <span>Explore Deals</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
