import React, { useState } from 'react';

const MyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      image: "https://www.vecteezy.com/photo/71038960-clean-and-modern-aesthetic-workspace-with-laptop",
      caption: "Serene Valley",
      description: "A peaceful morning in the heart of nature."
    },
    {
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      caption: "Mountain Peaks",
      description: "Reaching new heights in the alpine range."
    },
    {
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      caption: "Lakeside Sunset",
      description: "The perfect end to a long summer day."
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
  background: 'rgba(255,255,255,0.7)',
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
  borderRadius: '50%',
  zIndex: 10
};

export default MyCarousel;
