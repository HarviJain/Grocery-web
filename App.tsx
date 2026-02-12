
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  ShoppingCart, Search, X, Plus, Minus, Trash2, 
  ChevronRight, Zap, Sparkles, ShoppingBag, UtensilsCrossed, 
  Info, CreditCard, Truck, CheckCircle2, ArrowLeft, ArrowRight,
  Package, MapPin, Eye, Star, Heart, Leaf, Globe, Wind, Phone, Mail, Clock, Instagram, Facebook, Twitter, ShieldCheck
} from 'lucide-react';
import { Product, CartItem, Category, AIResponse, ShippingInfo, PaymentInfo, CheckoutStep } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import { getRecipeSuggestions } from './geminiService';
import logo from "./src/assets/logo.jpg";


  
// --- Intersection Observer Hook ---
const useOnScreen = (options: IntersectionObserverInit) => {
  const [ref, setRef] = useState<Element | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    if (ref) observer.observe(ref);
    return () => { if (ref) observer.unobserve(ref); };
  }, [ref, options]);

  return [setRef, visible] as const;
};

// --- Sub-components ---

const DealsBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#10B981] rounded-[48px] p-8 md:p-14 text-white relative overflow-hidden group shadow-2xl shadow-emerald-200">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A3E635]/20 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-[2s]" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-6 max-w-lg">
          <div className="inline-block px-6 py-2 bg-emerald-900/30 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
            Flash Harvest Sale
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            Up to <span className="text-[#A3E635]">40% Off</span> <br />on Organic Oils
          </h2>
          <button className="bg-white text-[#10B981] px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
            Grab The Deal
          </button>
        </div>
        
        <div className="flex gap-4 md:gap-8">
          {[
            { label: 'Hrs', val: timeLeft.h },
            { label: 'Min', val: timeLeft.m },
            { label: 'Sec', val: timeLeft.s }
          ].map((unit) => (
            <div key={unit.label} className="bg-emerald-900/40 backdrop-blur-xl p-6 md:p-8 rounded-[36px] min-w-[100px] md:min-w-[140px] text-center border border-white/10">
              <p className="text-4xl md:text-6xl font-black tracking-tighter mb-2">{unit.val.toString().padStart(2, '0')}</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{unit.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ 
  product: Product, 
  onAddToCart: (p: Product) => void,
  onViewDetail: (p: Product) => void,
  index: number
}> = ({ product, onAddToCart, onViewDetail, index }) => {
  return (
    <div 
      className="bg-white p-6 group rounded-[48px] border border-emerald-50 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.15)] reveal"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[1/1.2] overflow-hidden rounded-[36px] bg-[#F7FEE7] mb-8">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-[1.5s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors duration-700" />
        
        <div className="absolute bottom-6 left-6 right-6 flex gap-3 translate-y-24 group-hover:translate-y-0 transition-transform duration-700">
          <button 
            onClick={() => onViewDetail(product)}
            className="flex-grow bg-white/95 text-emerald-600 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white transition-all shadow-xl"
          >
            <Eye size={16} /> Look
          </button>
          <button className="bg-white/95 p-4 rounded-3xl hover:bg-rose-50 hover:text-rose-500 transition-all shadow-xl text-slate-300">
            <Heart size={18} />
          </button>
        </div>

        {product.isPopular && (
          <div className="absolute top-6 left-6 bg-[#A3E635] text-emerald-900 px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">
            Best Seller
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-1">{product.category}</p>
          <h3 className="text-2xl font-black leading-tight tracking-tight text-emerald-900 h-16 line-clamp-2">{product.name}</h3>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-emerald-600 leading-none">${product.price.toFixed(2)}</span>
            <span className="text-[10px] font-black text-emerald-300 uppercase mt-1">{product.unit}</span>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-14 h-14 rounded-3xl bg-emerald-600 flex items-center justify-center text-white hover:bg-[#A3E635] hover:text-emerald-900 transition-all duration-500 hover:rotate-12 active:scale-90 shadow-xl"
          >
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiRecipe, setAiRecipe] = useState<AIResponse | null>(null);
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  
  // Custom Viewport Animation Hooks
  const [heroRef, heroVisible] = useOnScreen({ threshold: 0.1 });
  const [shopRef, shopVisible] = useOnScreen({ threshold: 0.1 });
  const [whyRef, whyVisible] = useOnScreen({ threshold: 0.1 });

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  }, []);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  const handleGenerateRecipe = async () => {
    if (cart.length === 0) return;
    setIsGeneratingRecipe(true);
    setIsAIModalOpen(true);
    try {
      const recipe = await getRecipeSuggestions(cart);
      setAiRecipe(recipe);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingRecipe(false);
    }
  };

  return (
    <div className="min-h-screen relative text-emerald-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-emerald-100/50">
  <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-center h-24">
    <div className="flex items-center gap-16">
      <div className="flex items-center space-x-3 group cursor-pointer">
        <div className="w-14 h-14 bg-emerald-600 rounded-[22px] flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-700 shadow-lg shadow-emerald-200 overflow-hidden">
          <img
            src={logo}
            alt="Abhyuday Logo"
            className="w-9 h-9 object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-3xl font-black tracking-tighter text-emerald-900 leading-none">
            Abhyuday
          </span>
          <span className="text-[10px] font-black tracking-[0.4em] text-emerald-500 uppercase mt-0.5">
            Food H3+
          </span>
        </div>
      </div>

      <div className="hidden xl:flex items-center gap-12 text-[18px] font-black uppercase tracking-[0.3em] text-emerald-300">
        <button className="text-emerald-900 hover:text-emerald-500 transition-all relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-[#A3E635]">
          Home
        </button>
        <button className="hover:text-emerald-900 transition-all">
          Collections
        </button>
        <button className="hover:text-emerald-900 transition-all">
          Our Services
        </button>
        <button className="hover:text-emerald-900 transition-all">
          Contact
        </button>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <button className="p-4 hover:bg-emerald-100 rounded-2xl transition-all text-emerald-600">
        <Search size={22} />
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="group relative flex items-center gap-4 bg-emerald-600 text-white px-10 py-4 rounded-[24px] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] transition-all active:scale-95"
      >
        <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
        <span className="text-[11px] font-black uppercase tracking-widest hidden sm:block">
          Cart ({cartCount})
        </span>

        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#A3E635] text-emerald-900 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black ring-4 ring-emerald-50 animate-bounce">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <header ref={heroRef} className={`pt-56 pb-28 px-6 lg:px-12 max-w-[1600px] mx-auto relative z-10 section-reveal ${heroVisible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full text-[16px] font-black uppercase tracking-[0.5em] text-emerald-600 shadow-sm border border-emerald-100">
              <Sparkles size={16} className="text-[#A3E635]" /> Farm to Table Protocol
            </div>
            <h1 className="text-7xl lg:text-[110px] font-black leading-[0.8] tracking-tighter text-emerald-950">
              Fresh Roots. <br />
              <span className="text-emerald-500 underline decoration-[#A3E635] decoration-8">Life Restored.</span>
            </h1>
            <p className="text-2xl text-emerald-800/60 font-medium max-w-xl leading-relaxed">
              Experience the purest form of nutrition. We bring chemical-free, nutrient-dense organic harvest directly from our soil to your doorstep.
            </p>
            <div className="flex flex-wrap gap-6 pt-6">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-600 text-white px-14 py-7 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-[0_30px_60px_-15px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
              >
                Shop Now <ArrowRight size={20} />
              </button>
              <button 
                onClick={handleGenerateRecipe}
                className="bg-white text-emerald-600 px-14 py-7 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-sm hover:bg-emerald-50 transition-all border border-emerald-100 flex items-center gap-4"
              >
                <UtensilsCrossed size={20} /> AI Recipe Guide
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-emerald-300/30 rounded-full blur-[100px] animate-pulse" />
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
              alt="Fresh Produce" 
              className="relative z-10 w-full h-full object-contain animate-liquid drop-shadow-2xl rounded-[100px] border-[20px] border-white"
            />
          </div>
        </div>
      </header>

      {/* Category Section */}
      <section className="py-20 px-6 lg:px-12 max-w-[1600px] mx-auto overflow-x-auto no-scrollbar">
         <div className="flex flex-row justify-around items-center gap-6 pb-10">

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center gap-4 min-w-[140px] p-8 rounded-[48px] transition-all duration-700 ${
                selectedCategory === cat.id 
                ? 'bg-emerald-600 text-white shadow-2xl scale-110' 
                : 'bg-white text-emerald-400 hover:bg-emerald-50'
              }`}
            >
              <span className="text-5xl animate-bounce">{cat.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-widest text-center">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Shop Main Grid */}
      <main id="shop" ref={shopRef} className={`px-6 lg:px-12 py-20 max-w-[1600px] mx-auto relative z-10 section-reveal ${shopVisible ? 'visible' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-emerald-950 mb-4 draw-line active">Our Best Sellers.</h2>
            <p className="text-xl text-emerald-400 font-bold uppercase tracking-widest">Selected for your wellness</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-3 rounded-full shadow-lg border border-emerald-50">
            <button className="px-8 py-4 rounded-full bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest">Trending</button>
            <button className="px-8 py-4 rounded-full text-emerald-400 font-black text-[10px] uppercase tracking-widest">New Arrival</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredProducts.map((p, i) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAddToCart={addToCart} 
              onViewDetail={setSelectedProductDetail}
              index={i}
            />
          ))}
        </div>

        <div className="mt-40">
           <DealsBanner />
        </div>
      </main>

      {/* Why Choose Us */}
      <section ref={whyRef} className={`py-32 px-6 lg:px-12 max-w-[1600px] mx-auto section-reveal ${whyVisible ? 'visible' : ''}`}>
        <div className="text-center space-y-6 mb-24">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-emerald-950">Why Abhyuday?</h2>
          <p className="text-xl text-emerald-500 font-bold uppercase tracking-[0.4em]">The H3+ Quality Standard</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { Icon: Truck, title: 'Fast Delivery', desc: 'From soil to door in under 24 hours.' },
            { Icon: Leaf, title: 'Fresh & Organic', desc: 'No pesticides, no chemicals. Pure life.' },
            { Icon: Sparkles, title: 'Best Prices', desc: 'Direct farm sourcing ensures affordability.' },
            { Icon: ShieldCheck, title: 'H3+ Grade', desc: 'Our rigorous three-tier purity audit.' }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-12 rounded-[60px] text-center space-y-8 border border-emerald-50 hover:scale-105 transition-all duration-700 group">
              <div className="w-24 h-24 bg-emerald-50 rounded-[32px] flex items-center justify-center mx-auto text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-700">
                {/* Fixed: Replaced React.cloneElement with direct component rendering to avoid TS error */}
                <feature.Icon size={40} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-emerald-900 mb-3 tracking-tight">{feature.title}</h4>
                <p className="text-emerald-800/50 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 lg:px-12 max-w-[1600px] mx-auto mb-40">
        <div className="bg-[#A3E635] rounded-[80px] p-16 md:p-32 text-center space-y-12 relative overflow-hidden group">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-emerald-900 leading-none">Join the <br />Organic Movement.</h2>
          <p className="text-xl text-emerald-900/60 font-bold uppercase tracking-widest max-w-xl mx-auto">Get monthly rituals, farm updates, and exclusive harvest access.</p>
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-[40px] shadow-2xl">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow bg-transparent px-8 py-6 outline-none font-bold text-lg text-emerald-900"
            />
            <button className="bg-emerald-600 text-white px-12 py-6 rounded-[32px] font-black text-xs uppercase tracking-widest hover:bg-emerald-950 transition-all">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* Full Localized Footer for Abhyuday Food H3+ */}
      <footer className="bg-emerald-950 text-emerald-100/40 pt-48 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2000px] h-[500px] bg-emerald-600/5 rounded-full blur-[150px]" />
        
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 relative z-10">
          <div className="space-y-14">
            <div className="flex items-center space-x-4">
             <div className="w-16 h-16 bg-[#A3E635] rounded-[24px] flex items-center justify-center rotate-6 shadow-2xl shadow-lime-900/20 overflow-hidden">
                <img
                  src={logo}
                  alt="Abhyuday Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-4xl font-black tracking-tighter text-white">Abhyuday</span>
                <span className="text-[11px] font-black tracking-[0.5em] text-[#A3E635] uppercase mt-1">Food H3+</span>
              </div>
            </div>
            <p className="text-xl font-medium leading-relaxed opacity-60">
              Abhyuday Food H3+ is your trusted destination for pure, natural, and organic food. We bring farm-fresh products directly to your doorstep.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#A3E635] hover:text-emerald-950 transition-all text-[#A3E635]">
                  <Icon size={24} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-12 lg:pl-16">
            <h5 className="text-[12px] font-black uppercase tracking-[0.6em] text-white">Company</h5>
            <ul className="space-y-7 text-lg font-bold text-white/30">
              <li><button className="hover:text-[#A3E635] transition-all">Home</button></li>
              <li><button className="hover:text-[#A3E635] transition-all">Categories</button></li>
              <li><button className="hover:text-[#A3E635] transition-all">Store Locator</button></li>
              <li><button className="hover:text-[#A3E635] transition-all">Contact Us</button></li>
            </ul>
          </div>

          <div className="space-y-12 lg:pl-16">
            <h5 className="text-[12px] font-black uppercase tracking-[0.6em] text-white">Information</h5>
            <ul className="space-y-7 text-lg font-bold text-white/30">
              <li><button className="hover:text-[#A3E635] transition-all">Privacy Policy</button></li>
              <li><button className="hover:text-[#A3E635] transition-all">Terms & Conditions</button></li>
              <li><button className="hover:text-[#A3E635] transition-all">Return Policy</button></li>
              <li><button className="hover:text-[#A3E635] transition-all">Shipping Policy</button></li>
            </ul>
          </div>

          <div className="space-y-14">
            <h5 className="text-[12px] font-black uppercase tracking-[0.6em] text-white">Contact Us</h5>
            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <MapPin className="text-[#A3E635] shrink-0 mt-2" size={28} />
                <p className="text-lg font-medium leading-relaxed opacity-70">
                  GF-13, Seista Dwelling, Opp West Face, <br />
                  Hebatpur Rd, Thaltej, 380059, Ahmedabad.
                </p>
              </div>
              <div className="flex items-center gap-6 group">
                <Phone className="text-[#A3E635]" size={28} />
                <p className="text-2xl font-black text-white">+91 90549 96354</p>
              </div>
              <div className="flex items-center gap-6 group">
                <Mail className="text-[#A3E635]" size={28} />
                <p className="text-2xl font-black text-white underline decoration-white/10">food@abhyuday.in</p>
              </div>
              <div className="flex items-start gap-6 pt-8 border-t border-white/5">
                <Clock className="text-[#A3E635] shrink-0" size={28} />
                <div>
                   <p className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-1">Office Hours</p>
                   <p className="text-lg font-bold text-white/80">Mon - Sat: 10AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto mt-40 pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-10 text-[11px] font-black uppercase tracking-[0.6em]">
           <span className="opacity-30">&copy; 2024 Abhyuday Food H3+. All Roots Protected.</span>
           <div className="flex gap-16">
              <button className="hover:text-[#A3E635] transition-all">Security Protocol</button>
              <button className="hover:text-[#A3E635] transition-all">Regenerative Earth</button>
           </div>
        </div>
      </footer>

      {/* Quick Detail Modal */}
      {selectedProductDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-14">
           <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-2xl animate-in fade-in duration-700" onClick={() => setSelectedProductDetail(null)} />
           <div className="relative w-full max-w-7xl bg-white rounded-[80px] overflow-hidden shadow-2xl flex flex-col lg:row h-full max-h-[92vh] animate-in zoom-in-95 duration-700">
             <button onClick={() => setSelectedProductDetail(null)} className="absolute top-12 right-12 z-10 p-6 bg-white shadow-2xl rounded-full text-emerald-900 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-50"><X size={28} /></button>
             <div className="flex flex-col lg:flex-row h-full">
               <div className="lg:w-[45%] h-full bg-emerald-50 relative flex items-center justify-center p-20">
                 <img src={selectedProductDetail.image} alt={selectedProductDetail.name} className="relative z-10 w-full h-full object-contain animate-liquid" />
               </div>
               <div className="lg:w-[55%] h-full p-16 lg:p-28 overflow-y-auto no-scrollbar bg-white">
                  <div className="space-y-16">
                    <div>
                      <p className="text-emerald-500 font-black text-xs uppercase tracking-[0.6em] mb-4">{selectedProductDetail.category}</p>
                      <h2 className="text-7xl font-black text-emerald-950 leading-[0.9] tracking-tighter mb-10">{selectedProductDetail.name}</h2>
                      <div className="flex items-center gap-12">
                         <span className="text-6xl font-black text-emerald-600">${selectedProductDetail.price.toFixed(2)}</span>
                         <span className="text-emerald-300 font-bold uppercase tracking-[0.4em] text-sm">/ {selectedProductDetail.unit}</span>
                      </div>
                    </div>
                    <p className="text-slate-500 leading-relaxed font-medium text-2xl">{selectedProductDetail.description}</p>
                    <button 
                      onClick={() => { addToCart(selectedProductDetail); setSelectedProductDetail(null); }}
                      className="w-full bg-emerald-600 text-white py-8 rounded-[40px] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-emerald-950 transition-all flex items-center justify-center gap-5"
                    >
                      <Plus size={28} strokeWidth={3} /> Add to Basket
                    </button>
                  </div>
               </div>
             </div>
           </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-700">
            <div className="p-14 border-b border-emerald-50 flex items-center justify-between">
              <h2 className="text-4xl font-black text-emerald-950 tracking-tighter">My Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-4 hover:bg-emerald-50 rounded-full text-emerald-900"><X size={28} /></button>
            </div>
            <div className="flex-grow overflow-y-auto p-14 space-y-10 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-emerald-300 opacity-40"><ShoppingBag size={120} /></div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-8 group animate-in slide-in-from-bottom duration-500">
                    <img src={item.image} className="w-32 h-36 rounded-[40px] object-cover bg-emerald-50" />
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <h4 className="font-black text-emerald-950 text-2xl tracking-tight">{item.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-emerald-50 rounded-[24px] p-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-emerald-400"><Minus size={18}/></button>
                          <span className="w-12 text-center text-2xl font-black text-emerald-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-emerald-400"><Plus size={18}/></button>
                        </div>
                        <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-emerald-200 hover:text-rose-500 transition-colors"><Trash2 size={24}/></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-14 bg-emerald-50 space-y-10">
                <div className="flex justify-between items-end">
                  <span className="text-emerald-400 font-black uppercase tracking-widest">Total Pay</span>
                  <span className="text-5xl font-black text-emerald-950">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-emerald-600 text-white py-8 rounded-[40px] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-emerald-950 transition-all flex items-center justify-center gap-5">
                  Secure Checkout <ArrowRight size={26} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-emerald-950/95 backdrop-blur-3xl" onClick={() => setIsAIModalOpen(false)} />
          <div className="relative w-full max-w-5xl bg-emerald-50 rounded-[80px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-1000">
             <div className="p-16 bg-emerald-600 text-white flex justify-between items-center">
               <div className="flex items-center gap-8">
                 <div className="bg-[#A3E635] p-6 rounded-[32px] text-emerald-900 animate-liquid"><UtensilsCrossed size={40} /></div>
                 <h2 className="text-5xl font-black tracking-tighter">Chef AI Insight</h2>
               </div>
               <button onClick={() => setIsAIModalOpen(false)} className="p-4 hover:bg-white/10 rounded-full transition-all"><X size={32} /></button>
             </div>
             <div className="flex-grow overflow-y-auto p-16 no-scrollbar">
                {isGeneratingRecipe ? (
                  <div className="py-24 text-center space-y-12">
                    <div className="w-32 h-32 border-8 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
                    <p className="text-3xl font-black text-emerald-900 tracking-tighter">Brewing the perfect recipe...</p>
                  </div>
                ) : aiRecipe && (
                  <div className="space-y-16 animate-in slide-in-from-bottom-12 duration-1000">
                    <h1 className="text-7xl font-black text-emerald-950 tracking-tighter leading-none">{aiRecipe.recipeName}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div className="space-y-10">
                        <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-emerald-400 border-b border-emerald-100 pb-4">Ingredients</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {aiRecipe.ingredients.map((ing, i) => (
                            <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-emerald-50"><div className="w-2 h-2 rounded-full bg-[#A3E635]" />{ing}</div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-10">
                         <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-emerald-400 border-b border-emerald-100 pb-4">Steps</h3>
                         <div className="space-y-8">
                            {aiRecipe.instructions.map((step, i) => (
                              <div key={i} className="flex gap-6"><span className="w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black flex-shrink-0">{i+1}</span><p className="text-lg text-emerald-800/80 leading-relaxed">{step}</p></div>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
