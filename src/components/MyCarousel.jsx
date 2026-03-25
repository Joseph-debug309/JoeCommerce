import React, { useState } from 'react';

const MyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=882&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Smart Accessories",
      description: "Best deals on smart accessories."
    },
    {
      image: "https://images.unsplash.com/photo-1506169894395-36397e4aaee4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",
      caption: "Travell essentials",
      description: "Get travelling essentials for you at best prices."
    },
    {
      image: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",
      caption: "Beauty and products",
      description: "Get beauty products at best prices."
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: 'auto', overflow: 'hidden', borderRadius: '8px' }}>
      
      {/* Slide Container */}
      <div style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${activeIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} style={{ minWidth: '100%', position: 'relative' }}>
            <img src={slide.image} alt={slide.caption} style={{ width: '100%', display: 'block' }} />
            
            {/* Caption Overlay */}
            <div style={{
              position: 'absolute', bottom: '0', background: 'rgba(0,0,0,0.6)', 
              color: 'white', width: '100%', padding: '20px', textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{slide.caption}</h3>
              <p style={{ margin: '0', fontSize: '14px' }}>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button onClick={prevSlide} style={{...navButtonStyle,  left: '10px' }}>❮</button>
      <button onClick={nextSlide} style={{...navButtonStyle,  right: '10px' }}>❯</button>
    </div>
  );
};

// Simple shared style for buttons
const navButtonStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(255, 255, 255, 0.23)',
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
  borderRadius: '5%',
  zIndex: 10
};

export default MyCarousel;
