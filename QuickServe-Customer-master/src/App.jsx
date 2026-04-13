import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import History from './pages/History';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen relative text-zinc-900 selection:bg-orange-200 selection:text-orange-900 font-sans transition-colors duration-500">
        
        {/* Soft Depth Gradient Base */}
        <div className="fixed inset-0 z-[-3] bg-zinc-50 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-100/50 via-zinc-50 to-rose-50/30"></div>

        {/* Minimalist Tech Dot Grid Texture */}
        <div 
          className="fixed inset-0 z-[-2] pointer-events-none opacity-[0.35]"
          style={{ 
            backgroundImage: `radial-gradient(#e4e4e7 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        ></div>

        {/* Dynamic ambient blobs for glassmorphism lighting */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-400/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-400/20 rounded-full blur-[150px]" />
        </div>

        <Navbar />

        <main className="pt-16 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
