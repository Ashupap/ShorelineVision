import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Products from "@/components/sections/products";
import Stats from "@/components/sections/stats";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-lg font-semibold text-ocean-blue mb-4">OVER 90+ CUSTOMERS GLOBALLY</p>
            </div>
            <div className="overflow-hidden">
              <div className="flex animate-scroll space-x-12 items-center justify-center">
                {/* Customer logos */}
                {["SEASTAR", "COSTAR", "GEISHA", "SELECT", "GOLDEN BAY", "AZURE", "GENSEA"].map((logo, index) => (
                  <div key={index} className="flex-shrink-0 h-16 w-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-ocean-blue font-bold text-sm">{logo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <About />
        <Stats />
        <Products />
        <Testimonials />
        <section className="py-20 bg-gradient-to-r from-ocean-blue to-deep-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Discover Fresh Flavors<br />Order Your Premium Seafood Today!
            </h2>
            <p className="text-xl text-light-marine mb-8 max-w-3xl mx-auto">
              Explore our exquisite selection of freshly caught seafood, sourced from the world's finest waters. 
              Order now to experience the taste of quality and sustainability!
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-coral-accent hover:bg-golden-orange text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105"
              data-testid="button-get-in-touch"
            >
              GET IN TOUCH
            </button>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
