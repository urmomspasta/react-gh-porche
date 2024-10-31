
// Import all dependencies, other Components
import React, { useState, useEffect } from 'react';

//Function Component
function ManualSlideshow() {
    //Component UI: HTML Rendering
    return (
        <div style={{ minHeight: '60vh' }}>
            {/* Render Manual Slideshow */}
            <ManualSlideshows />
        </div>
    );
}

// Define a new style for responsive images
const responsiveImageStyle = {
    maxWidth: '100%',       // Makes the image take full width of the container
    maxHeight: '25vh',      // Keeps the aspect ratio intact
    objectFit: 'contain' // Ensures the image doesn't overflow
};

// Array with movie data
const topMovies = [
    { id: 0, title: "iPhone X", bond: 275, image_url: require('./images/iphone-x-silver.webp') },
    { id: 1, title: "iPhone 14", bond: 300, image_url: require('./images/iphone-14.webp') },
    { id: 2, title: "iPhone 16", bond: 500, image_url: require('./images/iphone-16.webp') },
    { id: 3, title: "Samsung Galaxy", bond: 200, image_url: require('./images/samsung-galaxy.webp') },
    { id: 4, title: "Nokia", bond: 150, image_url: require('./images/nokie.webp') },
    { id: 5, title: "Xiaomi", bond: 100, image_url: require('./images/xiaomi.webp') }
];

// Manual Slideshow Component with buttons
function ManualSlideshows() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = topMovies.map(movie => movie.image_url);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

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

            <div className="row justify-content-between">
                <div className="col-auto">
                    <button onClick={goToPrev} className="btn btn-primary">
                        <i className="fas fa-chevron-left"></i> {/* Chevron Left Icon */}
                    </button>
                </div>
                <div className="col-auto">
                    <button onClick={goToNext} className="btn btn-primary">
                        <i className="fas fa-chevron-right"></i> {/* Chevron Right Icon */}
                    </button>
                </div>
            </div>
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
export default ManualSlideshow; 