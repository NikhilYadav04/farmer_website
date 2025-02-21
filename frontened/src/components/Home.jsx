import React from 'react';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import FAQs from './FAQs';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="mt-[10rem] flex flex-col items-center justify-between gap-24">
      <HeroSection />
      <FeatureSection />
      <FAQs />
      <Footer />
    </div>
  );
};

export default Home;
