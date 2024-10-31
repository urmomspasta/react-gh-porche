
// Import all dependencies, other Components
import React, { useState, useEffect } from 'react';

//Function Component
function AutoSlideshow() {
    //Component UI: HTML Rendering
    return (
        <div style={{ minHeight: '60vh' }}>
            {/* Render Automatic Slideshow */}
            <AutomaticSlideshow />
        </div>
    );
}

// Define a new style for responsive images
const responsiveImageStyle = {
    width: '100%',       // Makes the image take full width of the container
    height: 'auto',      // Keeps the aspect ratio intact
    objectFit: 'contain' // Ensures the image doesn't overflow
};

// Array with movie data
const topMovies = [
    { id: 0, title: "iPhone Charger", bond: 45, image_url: require('./images/iphone-charger.jpg') },
    { id: 1, title: "Samsung Charger", bond: 30, image_url: require('./images/samsung-charger.jpg') },
    { id: 2, title: "Nokia Charger", bond: 25, image_url: require('./images/nokia-charger.webp') },
    { id: 3, title: "Xiaomi Charger", bond: 25, image_url: require('./images/xiaomi-charger.jpeg') }
];

// Automatic Slideshow Component without buttons
function AutomaticSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = topMovies.map(movie => movie.image_url);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // Change image every 2 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [images.length]);

    return (
        <div style={slideShowStyle}>
            <h2 style={{ padding: '10px' }}>Courtesy Phones</h2>
            <img
                style={responsiveImageStyle}
                src={images[currentIndex]}
                alt={topMovies[currentIndex].title}
            />
            <h3 style={{ paddingTop: '10px' }}>{topMovies[currentIndex].title}</h3>
            <p>Bond: ${topMovies[currentIndex].bond}</p>
        </div>
    );
}

// Define CSS variables
const slideShowStyle = {
    height: '50vh',
    backgroundColor: '#ffcc00',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    margin: '10px',
    border: '1px solid black',
};

//Export this component to the entire app, can be re-used or hooked into other Components
export default AutoSlideshow; 