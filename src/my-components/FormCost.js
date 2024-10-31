import { useEffect, useState } from 'react';

function FormCost({ bondAmount, customerType, warrantyStatus }) {
    const [serviceFee, setServiceFee] = useState(0);
    const [total, setTotal] = useState(0);
    const [gst, setGst] = useState(0);
    const [totalWithGst, setTotalWithGst] = useState(0);

    // Format the number into a $ format with 2 decimal places
    const formatCurrency = (value) => `$${(value || 0).toFixed(2)}`;

    // Calculate the costs whenever bond amount, customer type, or warranty changes
    useEffect(() => {
        console.log("Warranty status:", warrantyStatus); // Add log to verify the warranty status

        // If the phone is out of warranty, the service fee should be $85, otherwise it's $0
        let serviceFeeTemp = warrantyStatus === false ? 85 : 0;  // If warranty is inactive, apply service fee
        setServiceFee(serviceFeeTemp);
        console.log("Service Fee Temp:", serviceFeeTemp); // Log the calculated service fee

        // Calculate the total cost: bond + service fee
        let totalTemp = bondAmount + serviceFeeTemp;
        setTotal(totalTemp);
        console.log("Total Temp:", totalTemp); // Log the total before GST

        // Calculate GST as 15% of the total cost
        let gstTemp = totalTemp * 0.15;
        setGst(gstTemp);

        let totalWithGstTemp = totalTemp + gstTemp;
        setTotalWithGst(totalWithGstTemp);

        console.log("Total with GST calculated:", totalWithGstTemp);
    }, [bondAmount, customerType, warrantyStatus]);


    return (
        <>
            <h2>Cost</h2>
            {/* Bond */}
            <div className="row mt-2 ms-3 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" id="bond" value={formatCurrency(bondAmount)} readOnly />
            </div>
            {/* Service Fee */}
            <div className="row mt-1 ms-3 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" id="serviceFee" value={formatCurrency(serviceFee)} readOnly />
            </div>
            {/* Total without GST */}
            <div className="row mt-1 ms-3 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Total ($)</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" id="totalFee" value={formatCurrency(total)} readOnly />
            </div>
            {/* GST */}
            <div className="row mt-1 ms-3 customerInput">
                <label className="col-12 col-md-12 col-lg-4">GST ($)</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" id="gst" value={formatCurrency(gst)} readOnly />
            </div>
            {/* Total with GST */}
            <div className="row mt-1 ms-3 customerInput">
                <label className="col-12 col-md-12 col-lg-4">Total (+GST) ($)</label>
                <input className="col-12 col-md-12 col-lg-7" type="text" id="totalWithGst" value={formatCurrency(totalWithGst)} readOnly />
            </div>
        </>
    );
}

export default FormCost;
