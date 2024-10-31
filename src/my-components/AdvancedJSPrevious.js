
// Import all dependencies, other Components
import React, { useState, useEffect } from 'react';

//Function Component
function AdvancedJS() {
    //Component UI: HTML Rendering
    return (<>
        <div style={{ minHeight: '60vh' }}>
            <h1>THIS IS ADVANCED JS PAGE</h1>
            {/* Render Manual Slideshow */}
            <ManualSlideshow />
            {/* Render Automatic Slideshow */}
            <AutomaticSlideshow />
            {/* Render Address Autocomplete */}
            <AddressAutocomplete />
            {/* Render User Preferences */}
            <UserPreferences />
            {/* Render Courtesy Phone Drag and Drop */}
            <CourtesyPhoneSelection />
        </div>
    </>);
}

// 1. Address Search & Autocomplete using API
function AddressAutocomplete() {
    const [address, setAddress] = useState('');

    const handleInputChange = (e) => {
        setAddress(e.target.value);
        // Ideally call an API like Google Places Autocomplete for address suggestions
        // Example: Call fetch API to get the autocomplete results here
    };

    return (
        <div style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>
            <h2>Address Autocomplete</h2>
            <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={handleInputChange}
                style={{ width: '300px', padding: '5px' }}
            />
        </div>
    );
}

// 2. User Preferences via Local Storage
function UserPreferences() {
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || '16px');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('theme', theme);
    }, [fontSize, theme]);

    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div style={{ fontSize: fontSize, backgroundColor: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', padding: '10px', margin: '10px', border: '1px solid black' }}>
            <h2>User Preferences</h2>
            <div>
                <label>Font Size: </label>
                <input type="range" min="10" max="30" value={parseInt(fontSize)} onChange={handleFontSizeChange} />
            </div>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}

// 3. Drag-and-Drop Courtesy Phone Selection
function CourtesyPhoneSelection() {
    const [selectedPhone, setSelectedPhone] = useState('');

    const phones = ['Phone A', 'Phone B', 'Phone C'];

    const handleDragStart = (e, phone) => {
        e.dataTransfer.setData('phone', phone);
    };

    const handleDrop = (e) => {
        const phone = e.dataTransfer.getData('phone');
        setSelectedPhone(phone);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div style={{ padding: '10px', margin: '10px', border: '1px solid black' }}>
            <h2>Drag and Drop: Courtesy Phone Selection</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h3>Available Phones</h3>
                    {phones.map((phone) => (
                        <div
                            key={phone}
                            draggable
                            onDragStart={(e) => handleDragStart(e, phone)}
                            style={{ padding: '10px', margin: '5px', backgroundColor: '#96e3ff', cursor: 'grab' }}
                        >
                            {phone}
                        </div>
                    ))}
                </div>
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{ width: '200px', height: '200px', border: '2px dashed black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {selectedPhone ? <h3>{selectedPhone} Selected</h3> : <h3>Drop Here</h3>}
                </div>
            </div>
        </div>
    );
}

// Array with movie data
const topMovies = [
    { id: 0, title: "The Shawshank Redemption", year: 1994, image_url: require('./images/movie0.jpg') },
    { id: 1, title: "The Godfather", year: 1972, image_url: require('./images/movie1.jpg') },
    { id: 2, title: "The Dark Knight", year: 2008, image_url: require('./images/movie2.jpg') },
    { id: 3, title: "12 Angry Men", year: 1957, image_url: require('./images/movie3.jpg') },
    { id: 4, title: "Schindler's List", year: 1993, image_url: require('./images/movie4.jpg') }
];

// Manual Slideshow Component with buttons
function ManualSlideshow() {
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
            <h2>Manual Slideshow: Two buttons</h2>
            <img
                style={{ height: '250px' }}
                src={images[currentIndex]}
                alt={topMovies[currentIndex].title}
            />
            <h3>{topMovies[currentIndex].title}</h3>
            <p>Year: {topMovies[currentIndex].year}</p>
            <div>
                <button onClick={goToPrev}>Previous</button>
                <button onClick={goToNext}>Next</button>
            </div>
        </div>
    );
}

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
            <h2>Automatic Slideshow</h2>
            <img
                style={{ height: '250px' }}
                src={images[currentIndex]}
                alt={topMovies[currentIndex].title}
            />
            <h3>{topMovies[currentIndex].title}</h3>
            <p>Year: {topMovies[currentIndex].year}</p>
        </div>
    );
}

// Define CSS variables
const slideShowStyle = {
    minHeight: '20vh',
    backgroundColor: '#96e3ff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    margin: '10px',
    border: '1px solid black',
};

//Export this component to the entire app, can be re-used or hooked into other Components
export default AdvancedJS; 