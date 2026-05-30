import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import SkillsCanvas from './components/SkillsCanvas';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import Footer from './components/Footer';
import ScrollProvider from './components/ScrollProvider';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Simple intersection observer to update active section in navbar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
         <div className="opacity-0 animate-[role-fade-in_1s_ease-out_forwards]">
            <CustomCursor />
            <ScrollProvider>
              <Navbar activeSection={activeSection} />
              <main>
                <Hero />
                <SelectedWorks />
                <section id="skills">
                  <SkillsCanvas />
                </section>
                <Journal />
                <Explorations />
                <Stats />
              </main>
              <Footer />
            </ScrollProvider>
         </div>
      )}
    </>
  );
}

export default App;
