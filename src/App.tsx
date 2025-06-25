import React, { useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import emailjs from '@emailjs/browser';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  [key: string]: number;
}

const App = () => {
  // Navigation state
  const [activeLink, setActiveLink] = useState('hero');

  // Shop state
  const products: Product[] = [
    { id: 'tshirt1', name: 'Beige Team Brothers T-Shirt', price: 1800 },
    { id: 'tshirt2', name: 'Black Team Brothers T-Shirt', price: 1800 },
    { id: 'hoodie1', name: 'White Team Brothers Hoodie', price: 3000 },
    { id: 'hoodie2', name: 'Black Team Brothers Hoodie', price: 3000 }
  ];

  const [cart, setCart] = useState<CartItem>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    tshirt1: 0,
    tshirt2: 0,
    hoodie1: 0,
    hoodie2: 0
  });

  // Booking form state
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    eventDetails: ''
  });

  // Add a ref for the form
  const formRef = React.useRef<HTMLFormElement>(null);

  // Handle navigation click
  const handleNavClick = (link: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLink(link);
    const target = document.getElementById(link);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle quantity change
  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  // Add to cart
  const addToCart = (productId: string) => {
    const qty = quantities[productId];
    if (qty > 0) {
      setCart(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + qty
      }));
      setQuantities(prev => ({
        ...prev,
        [productId]: 0
      }));
      const product = products.find(p => p.id === productId);
      if (product) {
        alert(`${qty} x ${product.name} added to cart`);
      }
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart({});
  };

  // Handle booking form change
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs.sendForm(
        'service_x1ohjby',    // Replace with your EmailJS service ID
        'template_5n3i97j',   // Replace with your EmailJS template ID
        formRef.current,
        'BUbFTx8yrfr9UaX0r'     // Replace with your EmailJS public key
      )
      .then(() => {
        alert(
          `Thank you, ${bookingData.fullName}! Your event booking request has been sent. We will contact you at ${bookingData.email}.`
        );
        setBookingData({
          fullName: '',
          email: '',
          phone: '',
          eventDate: '',
          eventTime: '',
          eventDetails: ''
        });
      }, (error) => {
        alert('Failed to send booking. Please try again later.');
        console.error(error);
      });
    }
  };

  // Calculate cart total
  const calculateTotal = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        return total + (cart[productId] * product.price);
      }
      return total;
    }, 0);
  };

  return (
    <div className="App">
      <header>
        <div className="logo-container">
          <img src="/LOGO/brand logo.png" alt="Team Brothers Logo" />
          <h1>Team Brothers</h1>
        </div>
        <nav aria-label="Primary navigation">
          <ul>
            <li><a href="#hero" className={activeLink === 'hero' ? 'active' : ''} onClick={(e) => handleNavClick('hero', e)}>Home</a></li>
            <li><a href="#artists" className={activeLink === 'artists' ? 'active' : ''} onClick={(e) => handleNavClick('artists', e)}>Artists</a></li>
            <li><a href="#nasheed" className={activeLink === 'nasheed' ? 'active' : ''} onClick={(e) => handleNavClick('nasheed', e)}>Nasheed Audios</a></li>
            <li><a href="#gallery" className={activeLink === 'gallery' ? 'active' : ''} onClick={(e) => handleNavClick('gallery', e)}>Gallery</a></li>
            <li><a href="#shop" className={activeLink === 'shop' ? 'active' : ''} onClick={(e) => handleNavClick('shop', e)}>Shop</a></li>
            <li><a href="#booking" className={activeLink === 'booking' ? 'active' : ''} onClick={(e) => handleNavClick('booking', e)}>Booking</a></li>
          </ul>
        </nav>
      </header>

      <section id="hero" tabIndex={-1} role="banner" aria-label="Hero section with team image and about">
        <div id="hero-content">
          <h2>Team Brothers<br />Islamic Nasheed Label</h2>
          <p>Sharing soulful Islamic nasheed through inspiring music and unity.</p>
        </div>
      </section>

      <main className="container" tabIndex={-1}>
        <section id="artists" aria-label="Artists Profiles Section">
          <h2>Our Artists</h2>
          <div className="artist-list">
            <article className="artist-card" tabIndex={0} aria-label="Artist profile Abu Waseem">
              <img src="/images/abu waseem.jpg" alt="Abu Waseem photo" className="artist-photo" />
              <h3 className="artist-name">Abu Waseem</h3>
            </article>
            <article className="artist-card" tabIndex={0} aria-label="Artist profile Abu Sukeyna">
              <img src="/images/abu sukeyna.jpg" alt="Abu Sukeyna photo" className="artist-photo" />
              <h3 className="artist-name">Abu Sukeyna</h3>
            </article>
            <article className="artist-card" tabIndex={0} aria-label="Artist profile Prince Babli">
              <img src="/images/prince babli.jpg" alt="Prince Babli photo" className="artist-photo" />
              <h3 className="artist-name">Prince Babli</h3>
            </article>
            <article className="artist-card" tabIndex={0} aria-label="Artist profile Umar Albany">
              <img src="/images/albany.jpg" alt="Umar Albany photo" className="artist-photo" />
              <h3 className="artist-name">Umar Albany</h3>
            </article>
            <article className="artist-card" tabIndex={0} aria-label="Artist profile Jauzy">
              <img src="/images/jauzy.jpg" alt="Jauzy photo" className="artist-photo" />
              <h3 className="artist-name">Jauzy</h3>
            </article>
          </div>
        </section>

        <section id="nasheed" aria-label="Nasheed audios section">
          <h2>Nasheed Audios Playlist</h2>
          <ul className="audio-list">
            <li>
              <span className="audio-title">Ta'araf Aleyhi(Know Him)</span>
              <audio controls preload="none" src="/Music/Know Him.mp3" aria-label="Ta'araf Aleyhi(Know Him) by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Nimempata</span>
              <audio controls preload="none" src="/Music/Team Brothers - Nimempata (Nasheed) Official Video.mp3" aria-label="Nimempata by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Mtume ni Wewe</span>
              <audio controls preload="none" src="/Music/Team Brothers - MTUME NI WEWE ｜｜ (Official Video Nasheed).mp3" aria-label="Mtume Ni Wewe by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Assalam Aleykum</span>
              <audio controls preload="none" src="/Music/Team Brothers - ASSALAM ALEIKUM(Official Video Nasheed).mp3" aria-label="Assalam Aleykum by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Eid Mubarak Ft Yusuf Abdi</span>
              <audio controls preload="none" src="/Music/Eid Mubarak ｜｜ Yusuf Abdi Ft. Team Brothers.mp3" aria-label="Eid Mubarak by Team Brothers Ft Yusuf Abdi"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Furaha</span>
              <audio controls preload="none" src="/Music/Furaha ｜ Official Nasheed Audio ｜ Team Brothers.mp3" aria-label="Furaha by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Mama Medley</span>
              <audio controls preload="none" src="/Music/Mama Medley ｜｜ Team Brothers (Audio lyrics).mp3" aria-label="Mama Medley by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Mombasa Yetu</span>
              <audio controls preload="none" src="/Music/Mombasa Yetu ｜｜ Team Brothers ｜｜ Official Nasheed Audio.mp3" aria-label="MOmbasa Yetu by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Pongezi</span>
              <audio controls preload="none" src="/Music/Pongezi ｜｜ Team Brothers ｜｜ Official Nasheed Audio.mp3" aria-label="Pongezi by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Sallam Ya Ghaza</span>
              <audio controls preload="none" src="/Music/SALAAM YA GHAZA 🇵🇸  ｜｜ Team Brothers Official.mp3" aria-label="Sallam Ya Ghaza by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Ramadhan</span>
              <audio controls preload="none" src="/Music/Team Brothers - Ramadhan (Nasheed) Official Audio.mp3" aria-label="Ramadhan by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Wangu Wa Halali</span>
              <audio controls preload="none" src="/Music/Team Brothers - Wangu Wa Halali (Jauzy) Official Video.mp3" aria-label="Wangu Wa Halali by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Mama</span>
              <audio controls preload="none" src="/Music/Team Brothers ｜ Mama (Visualiser) ｜ Jauzy.mp3" aria-label="Mama by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Heya Ummi</span>
              <audio controls preload="none" src="/Music/Team Brothers- Heya Ummi ｜｜ هي أمي (She is my mother).mp3" aria-label="Heya Ummi by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Tabassam Ni Sunnah</span>
              <audio controls preload="none" src="/Music/Team brothers (TABASSAM NI SUNNAH) Official video nasheed..mp3" aria-label="Tabassam Ni Sunnah by Team Brothers"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Ya Ilahi Rabbi Ft Twayib Zain</span>
              <audio controls preload="none" src="/Music/Ya Ilahi Rabbi ｜｜ Team Brothers ft. Twayib Zain (Official Nasheed Audio).mp3" aria-label="Ya Ilahi Rabbi by Team Brothers Ft Twayib Zain"></audio>
            </li>
            <li>
              <span className="audio-title">Nasheed: Rafiki</span>
              <audio controls preload="none" src="/Music/Rafiki ｜｜ Team Brothers (Official video Nasheed).mp3" aria-label="Rafiki by Team Brothers"></audio>
            </li>
          </ul>
        </section>

        <section id="gallery" aria-label="Photo gallery section">
          <h2>Photo Gallery</h2>
          <div className="gallery-grid">
            <div className="gallery-item"><img src="/GALLERY/LIVE PERFORMANCE.JPG" alt="Team Brothers live performance" loading="lazy" /></div>
            <div className="gallery-item"><img src="/GALLERY/BAND MEMBERS.JPG" alt="Band members on stage" loading="lazy" /></div>
            <div className="gallery-item"><img src="/GALLERY/AUDIENCE.JPG" alt="Audience enjoying the music" loading="lazy" /></div>
            <div className="gallery-item"><img src="/GALLERY/PEFORMANCE.JPG" alt="performance" loading="lazy" /></div>
            <div className="gallery-item"><img src="/GALLERY/BACKSTAGE.JPG" alt="Band backstage" loading="lazy" /></div>
            <div className="gallery-item"><img src="/GALLERY/LOVE.JPG" alt="Love" loading="lazy" /></div>
          </div>
        </section>

        <section id="shop" aria-label="Online Shop section">
          <h2>Shop Our Brand</h2>
          <div className="products">
            <article className="product-card" data-id="tshirt1" aria-label="Beige Team Brothers T-Shirt, KSH 1800">
              <img 
                src="/GALLERY/beige tshirt.JPG" 
                alt="Beige Team Brothers T-Shirt" className="product-image" />
              <h3 className="product-name">Beige Team Brothers T-Shirt</h3>
              <p className="product-price">KSH 1800</p>
              <div className="quantity-select">
                <label htmlFor="qty-tshirt1">Quantity:</label>
                <input 
                  type="number" 
                  id="qty-tshirt1" 
                  min="0" 
                  max="10" 
                  value={quantities.tshirt1} 
                  onChange={(e) => handleQuantityChange('tshirt1', parseInt(e.target.value) || 0)}
                />
              </div>
              <button 
                className="add-to-cart" 
                aria-label="Add Beige Team Brothers T-Shirt to cart" 
                disabled={quantities.tshirt1 <= 0}
                onClick={() => addToCart('tshirt1')}
              >
                Add to Cart
              </button>
            </article>

            <article className="product-card" data-id="tshirt2" aria-label="Black Team Brothers T-Shirt, KSH 1800">
              <img 
                src="/GALLERY/black tshirt 3.jpg" 
                alt="Black Team Brothers T-Shirt" className="product-image" />
              <h3 className="product-name">Black Team Brothers T-Shirt</h3>
              <p className="product-price">KSH 1800</p>
              <div className="quantity-select">
                <label htmlFor="qty-tshirt2">Quantity:</label>
                <input 
                  type="number" 
                  id="qty-tshirt2" 
                  min="0" 
                  max="10" 
                  value={quantities.tshirt2} 
                  onChange={(e) => handleQuantityChange('tshirt2', parseInt(e.target.value) || 0)}
                />
              </div>
              <button 
                className="add-to-cart" 
                aria-label="Add Black Team Brothers T-Shirt to cart" 
                disabled={quantities.tshirt2 <= 0}
                onClick={() => addToCart('tshirt2')}
              >
                Add to Cart
              </button>
             
            </article>

            <article className="product-card" data-id="hoodie1" aria-label="White Team Brothers Hoodie, KSH 3000">
              <img 
                src="/GALLERY/white hoodie.jpg" 
                alt="White Team Brothers Hoodie" className="product-image" />
              <h3 className="product-name">Grey Team Brothers Hoodie</h3>
              <p className="product-price">KSH 3000</p>
              <div className="quantity-select">
                <label htmlFor="qty-hoodie1">Quantity:</label>
                <input 
                  type="number" 
                  id="qty-hoodie1" 
                  min="0" 
                  max="5" 
                  value={quantities.hoodie1} 
                  onChange={(e) => handleQuantityChange('hoodie1', parseInt(e.target.value) || 0)}
                />
              </div>
              <button 
                className="add-to-cart" 
                aria-label="Add Grey Team Brothers Hoodie to cart" 
                disabled={quantities.hoodie1 <= 0}
                onClick={() => addToCart('hoodie1')}
              >
                Add to Cart
              </button>
            </article>

            <article className="product-card" data-id="hoodie2" aria-label="Black Team Brothers Hoodie, KSH 3000">
              <img 
                src="/GALLERY/black hoodie 2.JPG" 
                alt="Black Team Brothers Hoodie" className="product-image" />
              <h3 className="product-name">Black Team Brothers Hoodie</h3>
              <p className="product-price">KSH 3000</p>
              <div className="quantity-select">
                <label htmlFor="qty-hoodie2">Quantity:</label>
                <input 
                  type="number" 
                  id="qty-hoodie2" 
                  min="0" 
                  max="5" 
                  value={quantities.hoodie2} 
                  onChange={(e) => handleQuantityChange('hoodie2', parseInt(e.target.value) || 0)}
                />
              </div>
              <button 
                className="add-to-cart" 
                aria-label="Add Black Team Brothers Hoodie to cart" 
                disabled={quantities.hoodie2 <= 0}
                onClick={() => addToCart('hoodie2')}
              >
                Add to Cart
              </button>
            </article>
          </div>

          <section id="cart" aria-live="polite" aria-atomic="true">
            <h3>Your Cart</h3>
            <ul id="cart-items" aria-label="Shopping Cart Items">
              {Object.keys(cart).length === 0 ? (
                <li>No items selected.</li>
              ) : (
                Object.keys(cart).map(productId => {
                  const product = products.find(p => p.id === productId);
                  if (!product) return null;
                  return (
                    <li key={productId}>
                      {product.name} × {cart[productId]}
                      <span>KSH {(cart[productId] * product.price).toFixed(2)}</span>
                    </li>
                  );
                })
              )}
            </ul>
            {Object.keys(cart).length > 0 && (
              <>
                <div className="total" id="cart-total">
                  Total: KSH {calculateTotal().toLocaleString()}
                </div>
                <button className="clear-cart" id="clear-cart-btn" aria-label="Clear shopping cart" onClick={clearCart}>
                  Clear Cart
                </button>
                <a
                  className="checkout"
                  id="checkout-btn"
                  aria-label="Proceed to checkout"
                  href="https://store.pesapal.com/teambrothers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proceed to Checkout
                </a>
              </>
            )}
          </section>
        </section>

        <section id="booking" aria-label="Event Booking Form Section">
          <h2>Book Us for Your Event</h2>
          <form
            id="booking-form"
            ref={formRef}
            onSubmit={handleBookingSubmit}
            noValidate
          >
            <div>
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                aria-required="true"
                autoComplete="name"
                value={bookingData.fullName}
                onChange={handleBookingChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                autoComplete="email"
                value={bookingData.email}
                onChange={handleBookingChange}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                pattern="^\\+?[0-9\\s\\-]{7,15}$"
                required
                aria-required="true"
                placeholder="+254 731 816 632"
                autoComplete="tel"
                value={bookingData.phone}
                onChange={handleBookingChange}
              />
            </div>
            <div>
              <label htmlFor="eventDate">Event Date *</label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                required
                aria-required="true"
                value={bookingData.eventDate}
                onChange={handleBookingChange}
              />
            </div>
            <div>
              <label htmlFor="eventTime">Event Time *</label>
              <input
                type="time"
                id="eventTime"
                name="eventTime"
                required
                aria-required="true"
                value={bookingData.eventTime}
                onChange={handleBookingChange}
              />
            </div>
            <div>
              <label htmlFor="eventDetails">Event Details *</label>
              <textarea
                id="eventDetails"
                name="eventDetails"
                required
                aria-required="true"
                placeholder="Describe your event..."
                value={bookingData.eventDetails}
                onChange={handleBookingChange}
              ></textarea>
            </div>
            <button type="submit" className="book-submit" aria-label="Submit booking form">
              Submit Booking
            </button>
          </form>
        </section>
      </main>

      <footer>
        <div className="contacts" aria-label="Contact information">
          <p>Contact us: <a href="mailto:teambrothers001official@gmail.com">teambrothers001official@gmail.com</a> | Phone: <a href="tel:+254731816632">+254 731 816 632</a></p>
        </div>
        <div className="socials" aria-label="Social media links">
          <a href="https://www.tiktok.com/@teambrothersofficial_?_t=ZM-8wtP0qoxsCm&_r=1" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok" aria-hidden="true"></i>
          </a>
          <a href="https://www.instagram.com/teambrothersofficial_?igsh=dWtxYWFvMm5naWU3" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="https://youtube.com/@teambrothers5official?si=LX2NEMcxNhHQQTNV" aria-label="YouTube" target="_blank" rel="noopener noreferrer"> 
           <i className="fab fa-youtube" aria-hidden="true"></i>

          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Team Brothers. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Make sure this is at the top level, not inside any function or block
export default App;