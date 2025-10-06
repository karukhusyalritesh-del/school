import React, { useState, useEffect, useRef } from 'react';

const Counters = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCounts, setCurrentCounts] = useState([0, 0, 0, 0]);
  const containerRef = useRef(null);
  const animationTimersRef = useRef([]);

  const counterData = [
    { count: 20, suffix: '', label: 'Teachers' },
    { count: 500, suffix: '+', label: 'Students' },
    { count: 100, suffix: '%', label: 'Excellence' },
    { count: 10, suffix: '+', label: 'Years of Experience' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCurrentCounts([0, 0, 0, 0]);
          animationTimersRef.current.forEach(timer => timer && clearInterval(timer));
          animationTimersRef.current = [];
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      animationTimersRef.current.forEach(timer => timer && clearInterval(timer));
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    animationTimersRef.current.forEach(timer => timer && clearInterval(timer));
    animationTimersRef.current = [];

    counterData.forEach((item, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = item.count / steps;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(Math.floor(increment * currentStep), item.count);

        setCurrentCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = currentValue;
          return newCounts;
        });

        if (currentStep >= steps) clearInterval(timer);
      }, stepDuration);

      animationTimersRef.current[index] = timer;
    });
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row flex-wrap justify-around items-center py-12 px-6 md:px-12 bg-[#263675] text-white text-center relative"
    >
      {counterData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center max-w-[220px] w-full md:w-auto mx-0 md:mx-4 my-4 md:my-0 relative"
        >
          {/* Divider for desktop only */}
          {index !== counterData.length - 1 && (
            <div className="hidden md:block absolute right-[-1rem] top-1/2 transform -translate-y-1/2 w-0.5 h-12 bg-white"></div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold">
            {currentCounts[index]}
            {item.suffix}
          </h1>
          <h3 className="mt-2 text-lg md:text-xl">{item.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default Counters;
