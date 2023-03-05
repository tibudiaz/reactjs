import React, { useState, useEffect } from 'react';
import Logo from '../img/large.mp4';
import Nombre from '../img/nombre.jpg';

export const Propaganda = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showNombre, setShowNombre] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
      clearInterval(interval);
    }, 1000);
    const interval = setInterval(() => {
      setOpacity((prevOpacity) => prevOpacity - 0.1);
    }, 100);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleVideoEnd = () => {
    setShowVideo(true);
    setShowNombre(false);
  };

  return (
    <div>
      <div className='Propaganda'>
        {showNombre && (
          <img
            className={`Nombre ${showVideo ? 'fadeOut' : 'bounce'}`}
            src={Nombre}
            alt=''
            style={{ opacity }}
          />
        )}
        {showVideo && (
          <video
            className="Logo"
            autoPlay
            muted
            onEnded={handleVideoEnd}
          >
            <source src={Logo} type='video/mp4' />
            Tu navegador no admite la reproducción de videos.
          </video>
        )}
      </div>
    </div>
  );
};

