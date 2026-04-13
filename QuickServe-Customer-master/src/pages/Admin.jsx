import { useState, useEffect } from 'react';

const DUMMY_ORDERS = [
  {
    id: 'ORD-1001',
    date: new Date().toISOString(),
    items: [
      { name: 'Cold Coffee', quantity: 2, price: 60 },
      { name: 'Masala Dosa', quantity: 1, price: 80 }
    ],
    total: 200,
    completed: false
  },
  {
    id: 'ORD-1002',
    date: new Date(Date.now() - 3600000).toISOString(),
    items: [
      { name: 'Veg Burger', quantity: 1, price: 50 },
      { name: 'French Fries', quantity: 1, price: 60 },
      { name: 'Coke', quantity: 1, price: 40 }
    ],
    total: 150,
    completed: true
  },
  {
    id: 'ORD-1003',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    items: [
      { name: 'Paneer Wrap', quantity: 2, price: 90 }
    ],
    total: 180,
    completed: true
  }
];

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Read orders from localStorage
    const savedOrders = localStorage.getItem('quickserve_orders');
    let ordersArray = [];

    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        ordersArray = Array.isArray(parsedOrders) ? parsedOrders : [parsedOrders];
      } catch (error) {
        console.error('Error parsing orders from localStorage:', error);
      }
    }

    // If no orders at all, seed with dummy data
    if (ordersArray.length === 0) {
      ordersArray = [...DUMMY_ORDERS];
      localStorage.setItem('quickserve_orders', JSON.stringify(ordersArray));
    }

    // Sort by most recent first
    ordersArray.sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp));
    setOrders(ordersArray);

    // Calculate initial earnings
    calculateEarnings(ordersArray);

    // Set up storage event listener for cross-tab sync
    const handleStorageChange = (e) => {
      if (e.key === 'quickserve_orders' && e.newValue) {
        try {
          const parsedOrders = JSON.parse(e.newValue);
          const newOrdersArray = Array.isArray(parsedOrders) ? parsedOrders : [parsedOrders];
          newOrdersArray.sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp));
          setOrders(newOrdersArray);
          calculateEarnings(newOrdersArray);
        } catch (error) {
          console.error('Error parsing orders from sync:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const calculateEarnings = (currentOrders) => {
    const today = new Date().toISOString().split('T')[0];
    const earningsToday = currentOrders.reduce((sum, order) => {
      // Only sum completed orders towards earnings if desired, 
      // but usually canteen counts total. Let's count all today's orders.
      const orderDateString = order.date || (order.timestamp ? new Date(order.timestamp).toISOString() : new Date().toISOString());
      const orderDate = new Date(orderDateString).toISOString().split('T')[0];
      if (orderDate === today) {
        return sum + (Number(order.total) || 0);
      }
      return sum;
    }, 0);
    setTodayEarnings(earningsToday);
  };

  const handleRefresh = () => {
    const savedOrders = localStorage.getItem('quickserve_orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        const ordersArray = Array.isArray(parsedOrders) ? parsedOrders : [parsedOrders];
        ordersArray.sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp));
        setOrders(ordersArray);
        calculateEarnings(ordersArray);
      } catch (error) {
        console.error('Error refreshing orders:', error);
      }
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus, completed: newStatus === 'Completed' };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('quickserve_orders', JSON.stringify(updatedOrders));
  };

  const toggleOrderStatus = (orderId) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const isCompleted = !order.completed;
        return { ...order, completed: isCompleted, status: isCompleted ? 'Completed' : 'Pending' };
      }
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem('quickserve_orders', JSON.stringify(updatedOrders));
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Preparing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Ready': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format Date Function for display
  const formatDate = (orderOrIsoString) => {
    // Handling case where old orders only had timestamp.
    let isoString = orderOrIsoString;
    if (typeof orderOrIsoString === 'object') {
      isoString = orderOrIsoString.date || new Date(orderOrIsoString.timestamp).toISOString();
    } else if (!isoString) {
      isoString = new Date().toISOString();
    }
    const d = new Date(isoString);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const filteredOrders = filterStatus === 'All' ? orders : orders.filter(o => {
    const s = o.status || (o.completed ? 'Completed' : 'Pending');
    return s === filterStatus;
  });

  const todayDateString = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(o => {
    const dString = o.date || (o.timestamp ? new Date(o.timestamp).toISOString() : new Date().toISOString());
    return new Date(dString).toISOString().split('T')[0] === todayDateString;
  });
  const totalOrdersToday = todaysOrders.length;
  
  let itemCounts = {};
  todaysOrders.forEach(order => {
    order.items?.forEach(item => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
    });
  });
  const mostOrderedItem = Object.keys(itemCounts).length > 0 
    ? Object.keys(itemCounts).reduce((a, b) => itemCounts[a] > itemCounts[b] ? a : b)
    : 'None';

  const lastOrderTime = orders.length > 0 
    ? new Date(orders[0].date || orders[0].timestamp || new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : '--:--';

  return (
    <div className="w-full min-h-screen pb-10 bg-[#f8fafc]">
      {/* Navbar fixed top */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-100 z-50 flex items-center justify-between px-8 md:px-12 shadow-[0_4px_30px_rgb(0,0,0,0.03)]">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
              Quick Serve <span className="text-gray-400 font-bold ml-1 text-xl md:text-2xl tracking-normal">Admin</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 bg-red-50 border border-red-100 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-[#1px]">Restricted</span>
            </div>
          </div>
          <div className="text-[11px] font-medium text-gray-400 mt-1 hidden md:block">
            For authorized food court staff & college administrators only
          </div>
        </div>
        <div className="text-sm md:text-base px-5 py-2 bg-slate-50 border border-gray-100 rounded-full text-gray-600 font-semibold shadow-sm tracking-wide hidden sm:block">
          Admin Panel
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto mt-32 px-4 sm:px-6">

        {/* Earnings KPI Tile */}
        <div className="bg-white rounded-3xl p-12 mb-6 flex flex-col items-center justify-center relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <h2 className="text-gray-400 text-sm md:text-base font-bold mb-3 uppercase tracking-[0.2em]">
            Today's Earnings
          </h2>
          <div className="text-6xl md:text-[5.5rem] leading-none font-black text-gray-900 tracking-tight drop-shadow-sm">
            {formatCurrency(todayEarnings)}
          </div>
        </div>

        {/* Compact Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 w-full">
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_14px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-center items-center text-center">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1.5">Orders Today</span>
            <span className="text-3xl font-black text-gray-800 tracking-tight">{totalOrdersToday}</span>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_14px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-center items-center text-center">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1.5">Most Ordered</span>
            <span className="text-2xl font-black text-gray-800 line-clamp-1 tracking-tight">{mostOrderedItem}</span>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_14px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-center items-center text-center">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1.5">Last Order</span>
            <span className="text-3xl font-black text-gray-800 tracking-tight">{lastOrderTime}</span>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800 mr-auto hidden md:block">Orders Hub</h3>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 mr-auto sm:mr-0">
               <span className="text-sm font-medium text-gray-500">Filter:</span>
               <select 
                 value={filterStatus}
                 onChange={(e) => setFilterStatus(e.target.value)}
                 className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl outline-none appearance-none cursor-pointer shadow-sm min-w-[110px] hover:border-gray-300 transition-colors"
               >
                 <option value="All">All Statuses</option>
                 <option value="Pending">Pending</option>
                 <option value="Preparing">Preparing</option>
                 <option value="Ready">Ready</option>
                 <option value="Completed">Completed</option>
               </select>
            </div>
            <button 
              onClick={handleRefresh} 
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 transition-all shadow-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Refresh
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('quickserve_orders');
                setOrders([]);
                setTodayEarnings(0);
              }} 
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-xl border border-red-100 transition-all shadow-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Clear
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="glass-panel p-10 text-center flex flex-col items-center justify-center min-h-[220px]">
            <div className="text-gray-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className="text-xl text-gray-800 font-semibold">No orders received yet</p>
            <p className="text-base text-gray-500 mt-1">Orders placed by customers will appear here.</p>
            <button
              onClick={() => {
                const dummy = [...DUMMY_ORDERS];
                setOrders(dummy);
                localStorage.setItem('quickserve_orders', JSON.stringify(dummy));
                calculateEarnings(dummy);
              }}
              className="mt-6 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 shadow-sm hover:shadow text-white rounded-xl font-medium transition-all"
            >
              Load Dummy Orders
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`glass-panel p-6 flex flex-col transform-gpu transition-transform duration-300 ease-out will-change-transform hover:-translate-y-[3px] ${order.completed ? 'opacity-60 grayscale-[10%] hover:translate-y-0' : 'opacity-100'}`}
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-dashed border-gray-200 pb-5 mb-5 gap-4 sm:gap-0">
                  <div className="flex items-center gap-4">
                    {/* Tick Checkbox */}
                    <button
                      onClick={() => toggleOrderStatus(order.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200 shrink-0 ${order.completed
                          ? 'bg-green-100 border-green-500 text-green-600 shadow-sm'
                          : 'bg-gray-50 border-gray-300 text-transparent hover:border-gray-400'
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div>
                      <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold block mb-0.5">Order ID</span>
                      <div className="flex items-center gap-3">
                        <div className="font-mono text-gray-800 text-lg font-bold line-clamp-1">{order.id}</div>
                        <select
                          value={order.status || (order.completed ? 'Completed' : 'Pending')}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 cursor-pointer appearance-none outline-none border rounded-full transition-transform hover:scale-[1.02] shadow-sm text-center ${getBadgeStyle(order.status || (order.completed ? 'Completed' : 'Pending'))}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right ml-12 sm:ml-0">
                    <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Date</span>
                    <div className="text-gray-700 text-sm mt-0.5 font-medium">{formatDate(order)}</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex-grow space-y-2.5 mb-6 pl-0 sm:pl-12">
                  {order.items && order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-white border border-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 shrink-0 shadow-sm">
                          {item.quantity}x
                        </div>
                        <span className={`font-medium text-sm ${order.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                          {item.name}
                        </span>
                      </div>
                      <div className="text-gray-800 font-semibold text-sm">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total Footer */}
                <div className="border-t border-dashed border-gray-200 pt-5 mt-auto flex justify-between items-center sm:pl-12">
                  <span className="text-gray-500 font-medium tracking-wide">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-800">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


