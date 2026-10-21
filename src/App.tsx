/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext.tsx';
import { LanguageProvider, useLanguage } from './context/LanguageContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ShopPage } from './pages/ShopPage.tsx';
import { ProductDetailPage } from './pages/ProductDetailPage.tsx';
import { CartPage } from './pages/CartPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage.tsx';
import { QualityPage } from './pages/QualityPage.tsx';
import { FaqPage } from './pages/FaqPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { PrivacyPolicyPage, TermsPage, ShippingReturnsPage } from './pages/PolicyPages.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [lastOrderData, setLastOrderData] = useState<any>(null);
  const { isBn } = useLanguage();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const basePath = currentPath.split('?')[0];

  // Dynamic document title in Bangla and English
  useEffect(() => {
    let title = isBn
      ? 'শাহী এগ্রো ফার্ম — প্রিমিয়াম ঘাস সাইলেজ ও খাঁটি গাভীর ঘি (বাংলাদেশ)'
      : 'Shahi Agro Farm — Pure Goodness. Rooted in Nature.';

    if (basePath === '/shop') {
      title = isBn ? 'শপ ও পণ্যতালিকা — শাহী এগ্রো ফার্ম' : 'Storefront & Products — Shahi Agro Farm';
    } else if (
      basePath === '/products/grass-silage' || 
      basePath === '/products/shahi-grass-silage' ||
      basePath === '/product/shahi-grass-silage' ||
      basePath === '/product/grass-silage'
    ) {
      title = isBn ? 'ঘাস সাইলেজ (৫০ কেজি) — শাহী এগ্রো ফার্ম' : 'Grass Silage (50 kg) — Shahi Agro Farm';
    } else if (
      basePath === '/products/shahi-ghee-200g' || 
      basePath === '/product/shahi-ghee-200g'
    ) {
      title = isBn ? 'শাহী ঘি (২০০ গ্রাম) — শাহী এগ্রো ফার্ম' : 'Shahi Ghee 200g — Shahi Agro Farm';
    } else if (
      basePath === '/products/shahi-ghee-900g' || 
      basePath === '/product/shahi-ghee-900g'
    ) {
      title = isBn ? 'শাহী ফ্যামিলি ঘি (৯০০ গ্রাম) — শাহী এগ্রো ফার্ম' : 'Shahi Family Ghee 900g — Shahi Agro Farm';
    } else if (basePath === '/cart') {
      title = isBn ? 'শপিং কার্ট — শাহী এগ্রো ফার্ম' : 'Shopping Cart — Shahi Agro Farm';
    } else if (basePath === '/checkout') {
      title = isBn ? 'চেকআউট — শাহী এগ্রো ফার্ম' : 'Checkout & Dispatch — Shahi Agro Farm';
    } else if (basePath === '/order-status' || basePath === '/order-confirmation') {
      title = isBn ? 'অর্ডার স্ট্যাটাস ও রশিদ — শাহী এগ্রো ফার্ম' : 'Order Status & Receipt — Shahi Agro Farm';
    } else if (basePath === '/quality') {
      title = isBn ? 'গুণমান ও বৈজ্ঞানিক প্রক্রিয়া — শাহী এগ্রো ফার্ম' : 'Our Quality & Process — Shahi Agro Farm';
    } else if (basePath === '/about') {
      title = isBn ? 'আমাদের খামারের পরিচিতি — শাহী এগ্রো ফার্ম' : 'About Shahi Agro Farm';
    } else if (basePath === '/faq') {
      title = isBn ? 'সচরাচর জিজ্ঞাসা (FAQ) — শাহী এগ্রো ফার্ম' : 'FAQ — Shahi Agro Farm';
    } else if (basePath === '/contact') {
      title = isBn ? 'যোগাযোগ ও হোয়াটসঅ্যাপ — শাহী এগ্রো ফার্ম' : 'Contact & Support — Shahi Agro Farm';
    } else if (basePath === '/privacy' || basePath === '/privacy-policy') {
      title = isBn ? 'প্রাইভেসি পলিসি — শাহী এগ্রো ফার্ম' : 'Privacy Policy — Shahi Agro Farm';
    } else if (basePath === '/terms') {
      title = isBn ? 'শর্তাবলী ও নিয়ম — শাহী এগ্রো ফার্ম' : 'Terms and Conditions — Shahi Agro Farm';
    } else if (basePath === '/shipping-returns') {
      title = isBn ? 'ডেলিভারি ও রিটার্ন — শাহী এগ্রো ফার্ম' : 'Shipping and Returns — Shahi Agro Farm';
    } else if (basePath !== '/') {
      title = isBn ? 'পেজটি পাওয়া যায়নি — শাহী এগ্রো ফার্ম' : 'Page Not Found — Shahi Agro Farm';
    }

    document.title = title;
  }, [basePath, isBn]);

  const renderRoute = () => {
    // 1. Home
    if (basePath === '/' || basePath === '') {
      return <HomePage navigate={navigate} />;
    }

    // 2. Shop
    if (basePath === '/shop') {
      return <ShopPage navigate={navigate} />;
    }

    // 3, 4, 5. Specific Product Routes & Aliases
    if (basePath === '/products/grass-silage' || basePath === '/product/grass-silage' || basePath === '/product/shahi-grass-silage' || basePath === '/products/shahi-grass-silage') {
      return <ProductDetailPage productId="grass-silage" navigate={navigate} />;
    }
    if (basePath === '/products/shahi-ghee-200g' || basePath === '/product/shahi-ghee-200g') {
      return <ProductDetailPage productId="shahi-ghee-200g" navigate={navigate} />;
    }
    if (basePath === '/products/shahi-ghee-900g' || basePath === '/product/shahi-ghee-900g') {
      return <ProductDetailPage productId="shahi-ghee-900g" navigate={navigate} />;
    }

    // Generic product detail match fallback
    if (basePath.startsWith('/products/') || basePath.startsWith('/product/')) {
      const slug = basePath.replace(/^\/(?:products|product)\//, '').split('?')[0];
      return <ProductDetailPage productId={slug} navigate={navigate} />;
    }

    // 6. Cart
    if (basePath === '/cart') {
      return <CartPage navigate={navigate} />;
    }

    // 7. Checkout
    if (basePath === '/checkout') {
      return (
        <CheckoutPage
          navigate={navigate}
          onOrderSuccess={(orderData) => setLastOrderData(orderData)}
        />
      );
    }

    // 8. Order Status & Confirmation
    if (basePath === '/order-status' || basePath === '/order-confirmation') {
      return <OrderConfirmationPage navigate={navigate} orderData={lastOrderData} />;
    }

    // 9. About Us
    if (basePath === '/about') {
      return <AboutPage navigate={navigate} />;
    }

    // 10. Our Quality
    if (basePath === '/quality') {
      return <QualityPage navigate={navigate} />;
    }

    // 11. Contact
    if (basePath === '/contact') {
      return <ContactPage />;
    }

    // 12. FAQ
    if (basePath === '/faq') {
      return <FaqPage navigate={navigate} />;
    }

    // 13. Privacy Policy
    if (basePath === '/privacy' || basePath === '/privacy-policy') {
      return <PrivacyPolicyPage navigate={navigate} />;
    }

    // 14. Terms and Conditions
    if (basePath === '/terms') {
      return <TermsPage navigate={navigate} />;
    }

    // 15. Shipping and Returns
    if (basePath === '/shipping-returns') {
      return <ShippingReturnsPage navigate={navigate} />;
    }

    // 16. Custom 404 page
    return <NotFoundPage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D0B] text-[#F6F4EC] font-sans selection:bg-[#063D2E] selection:text-[#D8B56D]">
      <Navbar currentPath={currentPath} navigate={navigate} />
      <main className="flex-1">
        {renderRoute()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}
