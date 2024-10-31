import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Invoice.css';

function Invoice() {
    const location = useLocation();
    const {
        title,
        fname,
        lname,
        postcode,
        phone,
        email,
        street,
        city,
        purchaseDate,
        repairDate,
        bondAmount = 0,  // Default to 0
        warrantyStatus = false,  // Default to false
        courtesyDevices = [],  // Default to empty array
        imei,
        deviceMake,
        modelNumber,
        faultCategory,
        description
    } = location.state || {};

    console.log("Received Data in Invoice:", location.state);  // Debugging log
    console.log("Received Courtesy Devices:", courtesyDevices);

    // Generate a unique job number and invoice date
    const jobNumber = Date.now().toString(); // For simplicity, use timestamp as unique ID
    const invoiceDate = new Date().toLocaleString('en-GB', { hour12: false }); // Include time in 24-hour format
    const paymentDueDate = new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString('en-GB'); // 7 days from today
    const totalDue = (bondAmount + (warrantyStatus ? 0 : 85)) * 1.15;
    const formatDate = (date) => {
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime()) ? 'Invalid Date' : parsedDate.toLocaleDateString('en-GB');
    };

    const formatDateTime = (date) => {
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime())
            ? 'Invalid Date'
            : parsedDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
    };


    const adjustFontSize = (container, increment) => {
        // Select all text elements inside the container: paragraphs, headings, etc.
        const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li, td, th');

        textElements.forEach(element => {
            const style = window.getComputedStyle(element);
            const currentFontSize = parseFloat(style.fontSize); // Get current font size in pixels

            // Increment font size by the given value
            if (currentFontSize) {
                element.style.fontSize = `${currentFontSize + increment}px`;
            }
        });
    };

    const exportToPDF = () => {
        const input = document.getElementById('pdf-content');

        // Increase font size by 6px for all text elements before export
        adjustFontSize(input, 10);
        input.classList.add('export-pdf-margin');

        html2canvas(input, { scale: 3 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Set margins for the PDF output
            const margin = 10; // 10mm margin on all sides
            const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add the image with calculated margin offsets
            pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);
            pdf.save(`Repair_Booking_${Date.now()}.pdf`);

            // Reset font size to original after export
            adjustFontSize(input, -10);
            input.classList.remove('export-pdf-margin');
        });
    };


    return (
        <>
            <div id="pdf-content" className="invoice-content" style={{ minHeight: '71vh', color: 'black', backgroundColor: '#FFFFFF', margin: '30px', fontFamily: 'Times New Roman, Times, serif' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#D3D3D3', padding: '10px', height: '120px' }}>
                    <h1><strong>Repair Booking</strong></h1>
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>Amount Due</h2>
                        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }}>${totalDue.toFixed(2)}</h2>
                    </div>
                </div>

                <div style={{ margin: '30px' }}>
                    {/* Customer and Repair Job Details */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid black', paddingBottom: '10px', marginTop: '20px' }}>
                        {/* Customer Details */}
                        <div>
                            <h3 style={{ fontSize: '30px' }}><strong>Customer</strong></h3>
                            <div style={{ marginLeft: '5vh' }}>
                                <p>{title} {fname} {lname}</p>
                                <p>{street}, {city}, {postcode}</p>
                                <p>{phone}</p>
                                <p>{email}</p>
                            </div>
                        </div>

                        {/* Repair Job Details */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ textAlign: 'left', marginRight: '3vh' }}>
                                <h2 style={{ marginLeft: '-5vh', fontSize: '30px' }}><strong>Repair Job</strong></h2> {/* Offset the heading slightly to the left */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '400px', marginBottom: '5px' }}>
                                    <p><strong>Job Number:</strong></p>
                                    <p style={{ textAlign: 'right' }}>{jobNumber}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '400px', marginBottom: '5px' }}>
                                    <p><strong>Invoice Date:</strong></p>
                                    <p style={{ textAlign: 'right' }}>{invoiceDate}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '400px', marginBottom: '5px' }}>
                                    <p><strong>Payment Due:</strong></p>
                                    <p style={{ textAlign: 'right' }}>{paymentDueDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Repair Details */}
                    <h2 style={{ marginTop: '20px' }}>Repair Details</h2>
                    <div style={{ margin: '30px' }}>
                        <p><strong>Purchase Date:</strong> {formatDate(purchaseDate)}</p>
                        <p><strong>Repair Date/Time:</strong> {repairDate ? formatDateTime(repairDate) : 'Not Provided'}</p>
                        <p><strong>Under Warranty:</strong> {warrantyStatus ? 'Yes ✔️' : 'No ❌'}</p>
                        <p><strong>IMEI Number:</strong> {imei}</p>
                        <p><strong>Device Make:</strong> {deviceMake}</p>
                        <p><strong>Model Number:</strong> {modelNumber}</p>
                        <p><strong>Fault Category:</strong> {faultCategory}</p>
                        <p><strong>Description:</strong> {description}</p>
                    </div>

                    {/* Courtesy Loan Device Details */}
                    <h2 style={{ marginTop: '20px' }}>Courtesy Loan Device Details</h2>
                    <table style={{ width: '95%', border: '1px solid black', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '5px' }}>Item</th>
                                <th style={{ border: '1px solid black', padding: '5px' }}>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courtesyDevices.map((device, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid black', padding: '5px' }}>
                                        {device.name || 'N/A'}
                                    </td>
                                    <td style={{ border: '1px solid black', padding: '5px' }}>
                                        ${device.bond?.toFixed(2) || '0.00'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '20px' }}>
                        <h3>Total Due: ${totalDue.toFixed(2)}</h3>
                    </div>
                    {/* Totals on the Right Side with Labels Left-Aligned */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <div style={{ textAlign: 'left', marginRight: '15vh' }}>
                            <h2 style={{ marginLeft: '-30px' }}><strong>Totals</strong></h2> {/* Offset the heading slightly to the left */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', marginBottom: '5px' }}>
                                <p><strong>Bond:</strong></p>
                                <p style={{ textAlign: 'right' }}>${bondAmount.toFixed(2)}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', marginBottom: '5px' }}>
                                <p><strong>Service Fee:</strong></p>
                                <p style={{ textAlign: 'right' }}>{warrantyStatus ? '$0.00' : '$85.00'}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', marginBottom: '5px' }}>
                                <p><strong>Total:</strong></p>
                                <p style={{ textAlign: 'right' }}>${(bondAmount + (warrantyStatus ? 0 : 85)).toFixed(2)}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', marginBottom: '5px' }}>
                                <p><strong>GST:</strong></p>
                                <p style={{ textAlign: 'right' }}>${((bondAmount + (warrantyStatus ? 0 : 85)) * 0.15).toFixed(2)}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', marginBottom: '5px' }}>
                                <p><strong>Total (+GST):</strong></p>
                                <p style={{ textAlign: 'right' }}>${totalDue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid black', paddingTop: '10px', marginTop: '40px' }}>
                        <div>
                            <p><strong>Phone Fix Services</strong></p>
                            <p>42 Fixed It Drive</p>
                            <p>Alexander</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p><strong>Contact Us</strong></p>
                            <p>Phone: 06876543</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Export to PDF Button */}
            <button onClick={exportToPDF} className="btn btn-primary" style={{ marginTop: '20px', fontFamily: 'Helvetica', margin: '40px', width: '96%', fontSize: '24px' }}>Export to PDF</button>
        </>
    );
}

export default Invoice;