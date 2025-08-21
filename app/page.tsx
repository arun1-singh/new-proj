'use client';
import { useState, useEffect } from 'react';
import Header from './_components/Header';
import PlanCard from './_components/PlanCard';
import { Star, Shield, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from './contexts/ThemeContext';

export default function LandingPage() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [showSticky, setShowSticky] = useState(false);

  const plans = [
    { name: 'Basic', price: '$9', period: '/month', icon: Shield, features: ['Up to 5 projects','Basic support','10GB storage'], buttonText: 'Choose Basic', popular: false, gradient: 'from-gray-400 to-gray-600' },
    { name: 'Standard', price: '$29', period: '/month', icon: Star, features: ['Up to 25 projects','Priority support','100GB storage','Advanced analytics'], buttonText: 'Choose Standard', popular: true, gradient: 'from-blue-500 to-purple-600' },
    { name: 'Premium', price: '$59', period: '/month', icon: Crown, features: ['Unlimited projects','24/7 support','1TB storage','White-label solution'], buttonText: 'Choose Premium', popular: false, gradient: 'from-purple-600 to-pink-600' }
  ];

  const handleChoosePlan = (planName: string) => {
    router.push(`/signup?plan=${planName}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('pricing-section');
      setShowSticky(section ? section.getBoundingClientRect().bottom < 0 && window.innerWidth <= 768 : false);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark:bg-gray-900' : 'bg-slate-50'}`}>
      <Header />
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <h1 className={`text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Perfect Plan</span>
        </h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xl mb-12`}>
          Unlock your potential with our flexible subscription plans. Start your journey today.
        </p>
      </section>

      <section id="pricing-section" className="py-20 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map(plan => <PlanCard key={plan.name} plan={plan} onChoose={handleChoosePlan} />)}
      </section>

      {showSticky && (
        <button onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl animate-bounce-slow">
          Get Started - View Plans
        </button>
      )}
    </div>
  );
}