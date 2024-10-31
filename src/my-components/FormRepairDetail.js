import React, { useState } from 'react';

function FormRepairDetail({ customerData, handleInputChange, handleWarrantyStatusUpdate, warrantyStatus }) {
    const [imagePreview, setImagePreview] = useState(null);
    
    const checkWarranty = () => {
        const purchaseDate = new Date(document.getElementById("purchaseDate").value);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - purchaseDate);
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        
        // Only enable/disable warranty checkbox, do not set it directly
        document.getElementById("warranty").disabled = diffMonths > 24;

        // Allow the checkbox to control the warranty status
    };

    const checkPurchaseDate = () => {
        const purchaseDate = new Date(document.getElementById("purchaseDate").value);
        const currentDate = new Date();

        // Ensure purchase date is not in the future
        if (purchaseDate > currentDate) {
            document.getElementById("purchaseDate").setCustomValidity("Purchase Date cannot be in the future");
        } else {
            document.getElementById("purchaseDate").setCustomValidity(""); // Clear the error
        }

        checkWarranty();
        // Re-check repair date whenever the purchase date changes
        checkRepairDate();
    };

    const checkRepairDate = () => {
        const purchaseDate = new Date(document.getElementById("purchaseDate").value);
        const repairDate = new Date(document.getElementById("repairDate").value);

        // Ensure the repair date is after the purchase date
        if (repairDate <= purchaseDate) {
            document.getElementById("repairDate").setCustomValidity("Repair Date must be after the Purchase Date");
        } else {
            document.getElementById("repairDate").setCustomValidity(""); // Clear the error if valid
        }
    };

    const handleWarrantyChange = (e) => {
        // Set warranty status based on checkbox value
        handleWarrantyStatusUpdate(e.target.checked);
    };
    
    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const validTypes = [
                'image/jpeg', 
                'image/jpg', 
                'image/png', 
                'image/webp'
            ];

            if (!validTypes.includes(file.type)) {
                alert("Invalid file type. Please upload a valid photo.");
                e.target.value = ''; // Clear the input
                setImagePreview(null); // Clear preview if invalid
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result); // Set the preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        handleFileUpload(file); // Pass the file to the parent handler
    };

    return (
        <>
            <h2>Repair Details</h2>
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Purchase Date: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="date"
                    id="purchaseDate"
                    title="Purchase Date cannot be in the future"
                    onInvalid={(e) => e.target.setCustomValidity('Purchase Date cannot be in the future')}
                    onInput={(e) => {
                        e.target.setCustomValidity('');
                        checkPurchaseDate(); // Validate purchase date and check repair date
                        checkWarranty(); // Update warranty status
                    }}
                    value={customerData.purchaseDate}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Repair Date: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="date"
                    id="repairDate"
                    title="Repair Date must be after the Purchase Date"
                    onInvalid={(e) => e.target.setCustomValidity('Repair Date must be after the Purchase Date')}
                    onInput={(e) => {
                        e.target.setCustomValidity('');
                        checkRepairDate(); // Ensure repair date is valid
                    }}
                    value={customerData.repairDate}
                    onChange={handleInputChange}
                    required
                />
            </div>
            {/*Under Warranty*/}
            <div className="row customerInput">
                <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                    <legend className="col-11 float-none w-auto">Under Warranty</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                        <input
                            type="checkbox"
                            id="warranty"
                            onChange={handleWarrantyChange}
                            disabled={true} // Disabled initially
                        />
                    </div>
                </fieldset>
            </div>
            {/*Other details*/}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">IMEI *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="imei"
                    pattern="\d{15}"
                    title="IMEI must be exactly 15 digits"
                    value={customerData.imei}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Make: *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    id="deviceMake"
                    value={customerData.deviceMake}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Make</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Motorola">Motorola</option>
                    <option value="LG">LG</option>
                    <option value="Nokia">Nokia</option>
                    <option value="Sony">Sony</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Model Number:</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="modelNumber"
                    value={customerData.modelNumber}
                    onChange={handleInputChange}
                />
            </div>
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    id="faultCategory"
                    value={customerData.faultCategory}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Fault</option>
                    <option value="Battery">Battery</option>
                    <option value="Charging">Charging</option>
                    <option value="Screen">Screen</option>
                    <option value="SD-Storage">SD Storage</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Description: *</label>
                <textarea
                    className="col-12 col-md-12 col-lg-7"
                    id="description"
                    value={customerData.description}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Upload Supporting Files:</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="file"
                    id="supportingFiles"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={handleFileUpload}
                />
            </div>

            {/* Image Preview */}
            {imagePreview && (
                <div className="row mt-3">
                    <label className="col-12 col-md-12 col-lg-4">Image Preview:</label>
                    <img 
                        src={imagePreview} 
                        alt="Uploaded Preview" 
                        className="col-12 col-md-12 col-lg-7" 
                        style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                    />
                </div>
            )}
        </>
    );
}

export default FormRepairDetail;
