//------------------------------------------------------------------
//Import all necessary sources, dependencies, libraries, other components

//Function Component
function Footer() {
    const footerStyle = {
        minHeight: '10vh',
        width: '100%',
        fontSize: '1.2em',
        color: 'white',
        backgroundColor: '#2C3E50',
        /* Centralize item both vertical and horizontal */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    //Component UI: HTML Rendering
    return (<>
        <footer style={footerStyle}>
            <p className='text-center'>Advanced Web App Development. Porche Potgieter. @2024.</p>
        </footer>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default Footer; 