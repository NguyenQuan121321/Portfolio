import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { IntroPreloader } from './components/IntroPreloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FinnApiGoSection } from './components/FinnApiGoSection';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-surface-950 text-zinc-100 font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
        <IntroPreloader />
        <Navbar />
        <main>
          <Hero />
          <FinnApiGoSection />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
