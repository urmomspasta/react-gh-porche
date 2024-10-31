import { useState, useRef } from 'react';  // Include useRef here
import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import { courtesyList } from './FormCourtesyPhone';  // Import courtesyList
import FormCost from './FormCost';
import FormButtons from './FormButtons';
import { useNavigate } from 'react-router-dom';

const ErrorModal = ({ message, onClose }) => {
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <h2>Error</h2>
        <p>{message}</p>
        <button style={buttonStyle} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

function Home() {
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    fname: '',
    lname: '',
    postcode: '',
    phone: '',
    email: '',
    title: 'Mr',
    street: '',
    city: '',
    purchaseDate: '',
    repairDate: '',
    courtesyPhone: '',
    cost: '',
    customerType: 'customer', // Default to 'customer'
    imei: '',
    deviceMake: '',
    modelNumber: '',
    faultCategory: '',
    description: ''
  });

  const phoneListRef = useRef(null);
  const chargerListRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalBond, setTotalBond] = useState(0);
  const [isWarrantyActive, setIsWarrantyActive] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState({ phone: null, charger: null });

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { id, value, name } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name === "customer-type" ? "customerType" : id]: value,
    }));
  };

  const validateFields = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to midnight for accurate date comparison
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    if (!customerData.fname || !/^[A-Za-z\s\-]+$/.test(customerData.fname)) {
      return 'Invalid First Name.';
    }
    if (!customerData.lname || !/^[A-Za-z\s\-]+$/.test(customerData.lname)) {
      return 'Invalid Last Name.';
    }
    if (!customerData.street || !customerData.street.trim()) {
      return 'Street is required.';
    }
    if (!customerData.city || !customerData.city.trim()) {
      return 'City is required.';
    }
    if (!/^\d{4}$/.test(customerData.postcode)) {
      return 'Postcode must be exactly 4 digits.';
    }
    if (!/^[\d\s\-\(\)\+]+$/.test(customerData.phone)) {
      return 'Invalid Phone Number.';
    }
    if (!customerData.email || !customerData.email.includes('@')) {
      return 'Email must contain an "@" symbol.';
    }
    if (!customerData.email || !emailRegex.test(customerData.email)) {
      return 'Email must contain valid characters before and after the "@" symbol.';
    }
    const purchaseDate = new Date(customerData.purchaseDate);
    if (isNaN(purchaseDate.getTime())) {
      return 'Invalid Purchase Date.';
    }
    if (purchaseDate >= today) {
      return 'Purchase Date must be before today.';
    }
    const repairDate = new Date(customerData.repairDate); // Moved initialization up here
    if (isNaN(repairDate.getTime())) {
      return 'Invalid Repair Date.';
    }
    if (repairDate <= today) {
      return 'Repair Date must be after today.';
    }
    if (repairDate <= purchaseDate) {
      return 'Repair Date must be after the Purchase Date.';
    }
    if (!/^\d{15}$/.test(customerData.imei)) {
      return 'IMEI must be exactly 15 digits.';
    }
    if (!customerData.deviceMake) {
      return 'Device Make is required.';
    }
    if (!customerData.faultCategory) {
      return 'Fault Category is required.';
    }
    if (!customerData.description || !customerData.description.trim()) {
      return 'Description cannot be empty.';
    }
    return '';
  };


  const handleBondUpdate = (newBond) => {
    setTotalBond(newBond);
  };

  // Handle warranty status update from FormRepairDetail
  const handleWarrantyStatusUpdate = (status) => {
    setIsWarrantyActive(status);
  };

  const validateCourtesyPhone = () => {
    const phoneSelected = phoneListRef.current?.value;
    const chargerSelected = chargerListRef.current?.value;

    console.log("Phone selected:", phoneSelected);
    console.log("Charger selected:", chargerSelected);

    if (phoneSelected === "none" && chargerSelected === "none") {
      console.log("Courtesy phone is not valid.");
      return false;
    }

    console.log("Courtesy phone is valid.");
    return true;
  };

  const findDeviceByName = (name) => {
    return courtesyList.find((item) => item.name === name) || { name: "None", bond: 0 };
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const error = validateFields();
    const isValid = event.target.checkValidity();
    const isCourtesyPhoneValid = validateCourtesyPhone();

    if (error || !isCourtesyPhoneValid) {
      setErrorMessage(error || "Please select a Courtesy Phone or Charger.");
      setModalVisible(true);
      return;
    }

    console.log("Repair Date Before Sending to Invoice:", customerData.repairDate); // Debugging log

    if (!isValid || !isCourtesyPhoneValid) {
      setErrorMessage("Please fill out all required fields and select Courtesy Phone details.");
      return;
    }

    const selectedPhoneName = phoneListRef.current?.value;
    const selectedChargerName = chargerListRef.current?.value;

    const phoneDevice = findDeviceByName(phoneListRef.current?.value);
    const chargerDevice = findDeviceByName(chargerListRef.current?.value);

    const handleReset = () => {
      window.location.reload();  // Simplifies the reset process
    };


    const formData = {
      ...customerData,
      bondAmount: totalBond, // Ensure bond amount is passed
      warrantyStatus: isWarrantyActive, // Pass warranty status to Invoice
      courtesyDevices: [
        selectedDevices.phone || { name: 'None', bond: 0 },
        selectedDevices.charger || { name: 'None', bond: 0 }
      ]
    };

    console.log("Form Data Sent to Invoice:", formData);  // Debugging log
    console.log("Repair Date Before Sending to Invoice:", customerData.repairDate);

    navigate('/invoice', { state: { ...formData } });
    console.log("Repair Date After Sending to Invoice:", customerData.repairDate);
  };

  return (
    <form onSubmit={onSubmit} className="row" style={{ minHeight: '60vh' }}>
      <div className="col-12 col-lg-4 p-4 m-0" style={{ backgroundColor: '#FCF3CF' }}>
        <FormCustomerDetail
          customerData={customerData}
          handleInputChange={handleInputChange}
        />
      </div>

      <div className="col-12 col-lg-4 p-4 m-0" style={{ backgroundColor: '#D5F5E3' }}>
        <FormRepairDetail
          customerData={customerData}
          handleInputChange={handleInputChange}
          handleWarrantyStatusUpdate={handleWarrantyStatusUpdate}
        />
      </div>

      <div className="col-12 col-lg-4 p-0 m-0">
        <div className="p-4" style={{ minHeight: '30vh', backgroundColor: '#2874A6' }}>
          <FormCourtesyPhone
            customerType={customerData.customerType}
            setSelectedDevices={setSelectedDevices} // NEW: Set selected devices
            handleBondUpdate={handleBondUpdate}
            validateCourtesyPhone={validateCourtesyPhone}
            setErrorMessage={setErrorMessage}
            phoneListRef={phoneListRef}
            chargerListRef={chargerListRef}
            customerData={customerData}
            isWarrantyActive={isWarrantyActive}
            navigate={navigate}
          />
        </div>

        <div className="p-4" style={{ backgroundColor: '#EDBB99' }}>
          <FormCost
            bondAmount={totalBond}
            customerType={customerData.customerType}
            warrantyStatus={isWarrantyActive}
          />
        </div>
      </div>

      <div className="p-4 text-center" style={{ backgroundColor: '#EDBB99' }}>
        <FormButtons errorMessage={errorMessage} onSubmit={onSubmit} />
      </div>

      {isModalVisible && (
        <ErrorModal message={errorMessage} onClose={() => setModalVisible(false)} />
      )}
    </form>
  );
}

export default Home;
