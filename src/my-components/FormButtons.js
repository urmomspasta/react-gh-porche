// Import all dependencies, other Components
import { Link } from 'react-router-dom'; // Add this import to resolve the error

// Function Component
function FormButtons({ errorMessage, onSubmit }) {

    const handleReset = () => {
        window.location.reload();  // Simplifies the reset process
    };
    
    // Component UI: HTML Rendering
    return (
        <>
            <input 
                type="submit" 
                className="btn me-3 text-dark bg-white" 
                style={{ width: '5em' }} 
                value="SUBMIT" 
                onClick={onSubmit}
            />
            <input type="reset" className="btn me-3 text-dark bg-white" style={{ width: '5em' }} value="RESET" onClick={(handleReset)}/>
            <Link to="/faq">
                <input type="button" className="btn me-3 text-dark bg-white" style={{ width: '5em' }} value="FAQ" />
            </Link>
            {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                    {errorMessage}
                </div>
            )}
        </>
    );
}

// Export this component to the entire app, can be re-used or hooked into other Components
export default FormButtons;
