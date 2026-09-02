import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { IntroPreloader } from './components/IntroPreloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FinnApiGoSection } from './components/FinnApiGoSection';
import { VovinamSection } from './components/VovinamSection';
import { WriteupsSection } from './components/WriteupsSection';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { JakeAI } from './components/JakeAI';
import { ThemeTransitionEffect } from './components/ThemeTransitionEffect';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-surface-950 text-zinc-100 font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
          <ThemeTransitionEffect />
          <IntroPreloader />
          <Navbar />
          <main>
            <Hero />
            <FinnApiGoSection />
            <VovinamSection />
            <WriteupsSection />
            <Skills />
            <About />
            <Contact />
          </main>
          {/* JakeAI Corgi Companion & AI Hub */}
          <JakeAI
            greeting="Chào bạn! Mình là Jake, chú cún Corgi hướng dẫn viên portfolio của Nguyễn Hoàng Anh Quân. Bạn có thể hỏi mình về FinnApiGo, VovinamApiNode hoặc thử nghiệm API nhé!"
            position="bottom-right"
            speed={10}
            theme="dark"
            enableSound={true}
          />
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
