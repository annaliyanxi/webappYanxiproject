import { useMemo, useState } from 'react'
import './App.css'

const categories = ['All', 'Dim Sum', 'Noodles', 'Rice', 'Roast', 'Sichuan', 'Desserts']

const dishes = [
  { id: 1, name: 'Xiao Long Bao', category: 'Dim Sum', price: 16.9, rating: 4.9, spicy: 0, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80', desc: 'Steamed soup dumplings with ginger vinegar.' },
  { id: 2, name: 'Lanzhou Beef Noodles', category: 'Noodles', price: 22.9, rating: 4.8, spicy: 1, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80', desc: 'Hand-pulled noodles, slow-braised beef and clear broth.' },
  { id: 3, name: 'Sichuan Mapo Tofu', category: 'Sichuan', price: 18.9, rating: 4.8, spicy: 3, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80', desc: 'Silken tofu, minced beef, chilli oil and peppercorn.' },
  { id: 4, name: 'Cantonese Roast Duck', category: 'Roast', price: 29.9, rating: 4.9, spicy: 0, image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=900&q=80', desc: 'Crisp-skinned roast duck with plum sauce.' },
  { id: 5, name: 'Yangzhou Fried Rice', category: 'Rice', price: 17.9, rating: 4.7, spicy: 0, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80', desc: 'Wok-tossed rice with egg, prawns, chicken and greens.' },
  { id: 6, name: 'Dan Dan Noodles', category: 'Noodles', price: 19.9, rating: 4.8, spicy: 2, image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=900&q=80', desc: 'Sesame chilli noodles with fragrant pork crumble.' },
  { id: 7, name: 'Har Gow', category: 'Dim Sum', price: 14.9, rating: 4.7, spicy: 0, image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=80', desc: 'Crystal shrimp dumplings, steamed to order.' },
  { id: 8, name: 'Mango Sago', category: 'Desserts', price: 12.9, rating: 4.9, spicy: 0, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80', desc: 'Chilled mango, pomelo, coconut milk and sago pearls.' },
]

function Icon({ children, size = 20 }) {
  return <span style={{ width: size, height: size }} className="inline-flex items-center justify-center">{children}</span>
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const filtered = useMemo(() => dishes.filter((dish) => {
    const categoryMatch = activeCategory === 'All' || dish.category === activeCategory
    const searchMatch = dish.name.toLowerCase().includes(query.toLowerCase())
    return categoryMatch && searchMatch
  }), [activeCategory, query])

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const delivery = subtotal === 0 || subtotal >= 45 ? 0 : 4.9

  const addToCart = (dish) => {
    setCart((prev) => ({
      ...prev,
      [dish.id]: { ...dish, qty: (prev[dish.id]?.qty || 0) + 1 },
    }))
  }

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const next = { ...prev }
      const qty = (next[id]?.qty || 0) + delta
      if (qty <= 0) delete next[id]
      else next[id] = { ...next[id], qty }
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] text-[#1f211d]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f3ed]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3 no-underline text-inherit">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#a42920] text-lg font-black text-white shadow-sm">玉</div>
            <div>
              <p className="font-display text-xl font-semibold leading-none">Jade Bowl</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">Chinese Kitchen</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#menu">Menu</a><a href="#story">Our Story</a><a href="#reviews">Reviews</a>
          </nav>

          <div className="flex items-center gap-2">
            <button aria-label="Open cart" onClick={() => setCartOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-xl">🛍</span>
              {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#a42920] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white md:hidden">☰</button>
          </div>
        </div>
        {mobileOpen && <div className="border-t border-black/5 bg-[#f7f3ed] px-5 py-4 md:hidden"><div className="flex flex-col gap-3 text-sm font-semibold"><a href="#menu">Menu</a><a href="#story">Our Story</a><a href="#reviews">Reviews</a></div></div>}
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
            <div className="hero-copy relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#a42920]/20 bg-[#a42920]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8f211b]">Crafted with tradition</span>
              <h1 className="font-display mt-7 max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Chinese comfort food, <em className="font-normal text-[#a42920]">made fresh</em> for you.</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-black/60 sm:text-lg">From delicate dim sum to wok-charred noodles, every dish is cooked to order with honest ingredients and recipes we grew up with.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#menu" className="rounded-full bg-[#1f211d] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:bg-[#a42920]">Order now</a>
                <a href="#story" className="rounded-full border border-black/15 bg-white/70 px-6 py-3.5 text-sm font-bold transition hover:bg-white">Our story</a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-black/55">
                <span><strong className="text-black">4.9 ★</strong> 2.4k reviews</span>
                <span><strong className="text-black">30–40 min</strong> delivery</span>
                <span><strong className="text-black">Free</strong> over RM45</span>
              </div>
            </div>

            <div className="relative min-h-[520px]">
              <div className="absolute right-[-16%] top-0 h-[470px] w-[470px] rounded-full bg-[#a42920] opacity-95 sm:h-[560px] sm:w-[560px] lg:right-[-8%]" />
              <div className="hero-photo absolute inset-0 z-10 m-auto h-[480px] w-[78%] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/20 sm:h-[560px] sm:w-[74%] lg:w-[72%]">
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=85" alt="Chinese dishes on a dining table" />
              </div>
              <div className="float-card absolute bottom-6 left-0 z-20 rounded-2xl bg-white p-4 shadow-xl sm:left-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/40">Tonight's favourite</p>
                <p className="mt-1 font-display text-lg font-semibold">Cantonese Roast Duck</p>
                <p className="mt-1 text-sm font-bold text-[#a42920]">RM 29.90</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-[#efe6d8] py-5">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-5 text-xs font-bold uppercase tracking-[0.18em] text-black/50">
            <span>Freshly cooked</span><span>•</span><span>No MSG added</span><span>•</span><span>Halal-friendly options</span><span>•</span><span>Delivered warm</span>
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a42920]">Our menu</p><h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">What are you craving?</h2></div>
            <label className="flex w-full max-w-sm items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 shadow-sm"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Search dishes..." /></label>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${activeCategory === category ? 'bg-[#1f211d] text-white' : 'border border-black/10 bg-white hover:border-black/30'}`}>{category}</button>)}
          </div>

          <div className="mt-10 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((dish) => <article key={dish.id} className="dish-card group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-white">
                <img src={dish.image} alt={dish.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <button onClick={() => addToCart(dish)} className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-white text-xl font-light shadow-lg transition hover:scale-110 hover:bg-[#a42920] hover:text-white">+</button>
              </div>
              <div className="px-1 pt-4"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl font-semibold leading-tight">{dish.name}</h3><span className="whitespace-nowrap text-sm font-bold">RM {dish.price.toFixed(2)}</span></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-black/50">{dish.desc}</p><div className="mt-3 flex items-center gap-3 text-xs font-semibold text-black/50"><span className="text-[#b7801e]">★ {dish.rating}</span>{dish.spicy > 0 && <span>{'🌶'.repeat(dish.spicy)}</span>}</div></div>
            </article>)}
          </div>
          {filtered.length === 0 && <div className="py-16 text-center text-black/50">No dishes found. Try another search.</div>}
        </section>

        <section id="story" className="bg-[#20231f] text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
            <div className="overflow-hidden rounded-[2rem]"><img className="h-full min-h-[420px] w-full object-cover" src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85" alt="Chef cooking in a kitchen" /></div>
            <div className="flex flex-col justify-center lg:pl-8"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e49b8f]">Made like home</p><h2 className="font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">A little piece of the family table.</h2><p className="mt-6 max-w-xl leading-7 text-white/65">Jade Bowl started with one idea: the best Chinese food is the food that feels familiar. Our menu brings together recipes from Sichuan, Guangdong, Shanghai and beyond, prepared with patience and served without shortcuts.</p><div className="mt-8 grid grid-cols-3 gap-5 border-t border-white/10 pt-8"><div><b className="font-display text-3xl">12+</b><p className="mt-1 text-xs text-white/45">Years cooking</p></div><div><b className="font-display text-3xl">28</b><p className="mt-1 text-xs text-white/45">Signature dishes</p></div><div><b className="font-display text-3xl">4.9</b><p className="mt-1 text-xs text-white/45">Guest rating</p></div></div></div>
          </div>
        </section>

        <section id="reviews" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="rounded-[2.5rem] bg-[#a42920] px-6 py-12 text-white sm:px-12"><p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">What guests say</p><blockquote className="font-display mt-5 max-w-4xl text-3xl font-medium leading-tight sm:text-4xl">“The noodles tasted like something from a proper neighbourhood shop — rich broth, springy noodles, and it arrived piping hot.”</blockquote><div className="mt-8 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 font-bold">JL</div><div><p className="text-sm font-bold">Jamie L.</p><p className="text-xs text-white/60">Verified order · Petaling Jaya</p></div></div></div></section>
      </main>

      <footer className="border-t border-black/5 px-5 py-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-black/45 sm:flex-row lg:px-3"><p>© 2026 Jade Bowl. Made fresh in Malaysia.</p><div className="flex gap-5"><a href="#">Instagram</a><a href="#">Privacy</a><a href="#">Contact</a></div></div></footer>

      {cartOpen && <div className="fixed inset-0 z-50 flex justify-end"><button aria-label="Close cart" onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" /><aside className="cart-panel relative z-10 flex h-full w-full max-w-md flex-col bg-[#fbf8f3] shadow-2xl"><div className="flex items-center justify-between border-b border-black/10 px-6 py-5"><div><p className="font-display text-2xl font-semibold">Your order</p><p className="text-xs text-black/45">{cartCount} item{cartCount !== 1 ? 's' : ''}</p></div><button onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white">✕</button></div><div className="flex-1 overflow-auto px-6 py-5">{cartItems.length === 0 ? <div className="grid h-full place-items-center text-center"><div><div className="text-5xl">🥟</div><p className="font-display mt-4 text-xl font-semibold">Your bowl is empty</p><p className="mt-2 text-sm text-black/45">Add something delicious from the menu.</p></div></div> : <div className="space-y-5">{cartItems.map((item) => <div key={item.id} className="flex gap-4"><img src={item.image} alt="" className="h-20 w-20 rounded-2xl object-cover"/><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><p className="font-display font-semibold">{item.name}</p><p className="text-sm font-bold">RM {(item.price * item.qty).toFixed(2)}</p></div><div className="mt-3 inline-flex items-center rounded-full border border-black/10 bg-white"><button onClick={() => updateQty(item.id, -1)} className="h-8 w-8">−</button><span className="w-7 text-center text-sm font-bold">{item.qty}</span><button onClick={() => updateQty(item.id, 1)} className="h-8 w-8">+</button></div></div></div>)}</div>}</div>{cartItems.length > 0 && <div className="border-t border-black/10 px-6 py-5"><div className="space-y-2 text-sm"><div className="flex justify-between text-black/55"><span>Subtotal</span><span>RM {subtotal.toFixed(2)}</span></div><div className="flex justify-between text-black/55"><span>Delivery</span><span>{delivery === 0 ? 'Free' : `RM ${delivery.toFixed(2)}`}</span></div><div className="flex justify-between pt-2 font-display text-xl font-semibold"><span>Total</span><span>RM {(subtotal + delivery).toFixed(2)}</span></div></div><button className="mt-5 w-full rounded-full bg-[#a42920] py-3.5 text-sm font-bold text-white transition hover:bg-[#8d211b]">Proceed to checkout</button></div>}</aside></div>}
    </div>
  )
}

export default App
