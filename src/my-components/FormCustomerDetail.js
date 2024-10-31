// Function Component
function FormCustomerDetail({ customerData, handleInputChange }) {
    // Component UI: HTML Rendering
    return (
        <>
            <h2>Customer Details</h2>

            {/* Customer type */}
            <div className="row customerInput">
                <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
                    <legend className="col-11 float-none w-auto">Customer type *</legend>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Customer</label>
                        <input
                            type="radio"
                            id="customerType"
                            name="customer-type"
                            value="customer"
                            checked={customerData.customerType === 'customer'}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="col-12 col-md-12 col-lg-4">Business</label>
                        <input
                            type="radio"
                            id="businessType"
                            name="customer-type"
                            value="business"
                            checked={customerData.customerType === 'business'}
                            onChange={handleInputChange}
                        />
                    </div>
                </fieldset>
            </div>

            {/* Title field */}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Title: *</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    id="title"
                    value={customerData.title}
                    onChange={handleInputChange}
                    required
                >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr">Dr</option>
                </select>
            </div>

            {/* First Name */}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">First Name: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="fname"
                    pattern="[A-Za-z\s\-]+"
                    title="First Name can only contain letters, spaces, and -"
                    onInvalid={(e) => e.target.setCustomValidity('First Name can only contain letters, spaces, and -')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    value={customerData.fname}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Last Name */}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Last Name: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="lname"
                    pattern="[A-Za-z\s\-]+"
                    title="Last Name can only contain letters, spaces, and -"
                    onInvalid={(e) => e.target.setCustomValidity('Last Name can only contain letters, spaces, and -')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    value={customerData.lname}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Street */}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Street: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="street"
                    value={customerData.street}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Suburb */}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Suburb: </label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="suburb"
                    value={customerData.suburb}
                    onChange={handleInputChange}
                />
            </div>

            {/* City */}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">City: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="city"
                    value={customerData.city}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Post Code */}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Post Code: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="postcode"
                    minLength={4}
                    maxLength={4}
                    pattern="\d{4}"
                    title="Postcode must be 4 Digits Long"
                    onInvalid={(e) => e.target.setCustomValidity('Postcode must be 4 Digits Long')}
                    onInput={(e) => e.target.setCustomValidity('')}
                    value={customerData.postcode}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Phone Number */}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Phone Number: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="text"
                    id="phone"
                    pattern="[\d\s\-\(\)\+]+"
                    title="Only numbers, spaces, and the symbols ()-+ are allowed"
                    value={customerData.phone}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Email */}
            <div className="row mt-1 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Email: *</label>
                <input
                    className="col-12 col-md-12 col-lg-7"
                    type="email"
                    id="email"
                    value={customerData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </>
    );
}

export default FormCustomerDetail;
