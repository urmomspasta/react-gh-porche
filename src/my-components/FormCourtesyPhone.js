import React, { useState, useEffect } from 'react'; 

export const courtesyList = [
    { id: 1, type: 'phone', name: 'iPhone X', bond: 275 },
    { id: 2, type: 'phone', name: 'iPhone 14', bond: 300 },
    { id: 3, type: 'phone', name: 'iPhone 16', bond: 500 },
    { id: 4, type: 'phone', name: 'Samsung Galaxy', bond: 200 },
    { id: 5, type: 'phone', name: 'Nokia', bond: 150 },
    { id: 6, type: 'phone', name: 'Xiaomi', bond: 100 },
    { id: 7, type: 'charger', name: 'iPhone charger', bond: 45 },
    { id: 8, type: 'charger', name: 'Samsung charger', bond: 30 },
    { id: 9, type: 'charger', name: 'Nokia charger', bond: 25 },
    { id: 10, type: 'charger', name: 'Xiaomi charger', bond: 25 },
];

function FormCourtesyPhone({
    customerType,
    handleBondUpdate,
    setSelectedDevices, // NEW: Prop to update selected devices in parent (Home)
}) {
    const [selectedPhone, setSelectedPhone] = useState(null);
    const [selectedCharger, setSelectedCharger] = useState(null);
    const [totalBond, setTotalBond] = useState(0);

    const calculateTotalBond = (phone, charger) => {
        let bond = 0;
        if (customerType === 'customer') {
            if (phone) bond += phone.bond;
            if (charger) bond += charger.bond;
        }
        return bond;
    };

    const updateBond = (newPhone, newCharger) => {
        const bond = calculateTotalBond(newPhone, newCharger);
        setTotalBond(bond);
        handleBondUpdate(bond);
    };

    useEffect(() => {
        updateBond(selectedPhone, selectedCharger);
        setSelectedDevices({ phone: selectedPhone, charger: selectedCharger }); // Pass selected devices to parent
    }, [selectedPhone, selectedCharger, customerType]);

    const handleDragStart = (e, item) => {
        e.dataTransfer.setData('item', JSON.stringify(item));
    };

    const handleDrop = (e, target) => {
        e.preventDefault();
        const item = JSON.parse(e.dataTransfer.getData('item'));

        if (target === 'selected') {
            if (item.type === 'phone' && !selectedPhone) {
                setSelectedPhone(item);
            } else if (item.type === 'charger' && !selectedCharger) {
                setSelectedCharger(item);
            }
        } else if (target === 'available') {
            if (item.type === 'phone') {
                setSelectedPhone(null);
            } else if (item.type === 'charger') {
                setSelectedCharger(null);
            }
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleRemoveAll = () => {
        setSelectedPhone(null);
        setSelectedCharger(null);
        handleBondUpdate(0);
    };

    return (
        <>
            <h2>Courtesy Phone</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <div
                    onDrop={(e) => handleDrop(e, 'available')}
                    onDragOver={handleDragOver}
                    style={{
                        width: '45%',
                        minHeight: '300px',
                        padding: '10px',
                        border: '2px dashed black',
                        backgroundColor: '#96e3ff',
                    }}
                >
                    <h4>Available Items</h4>
                    {courtesyList.map((item) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item)}
                            style={{
                                padding: '10px',
                                margin: '5px 0',
                                backgroundColor: '#96e3ff',
                                cursor: 'grab',
                                border: '1px solid black',
                            }}
                        >
                            {item.name} - ${item.bond}
                        </div>
                    ))}
                </div>
                <div
                    onDrop={(e) => handleDrop(e, 'selected')}
                    onDragOver={handleDragOver}
                    style={{
                        width: '45%',
                        minHeight: '300px',
                        padding: '10px',
                        border: '2px dashed black',
                        backgroundColor: '#96e3ff',
                    }}
                >
                    <h4>Selected Items</h4>
                    {selectedPhone && (
                        <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, selectedPhone)}
                            style={{
                                padding: '10px',
                                margin: '5px 0',
                                backgroundColor: '#96e3ff',
                                cursor: 'grab',
                                border: '1px solid black',
                            }}
                        >
                            {selectedPhone.name} - ${selectedPhone.bond}
                        </div>
                    )}
                    {selectedCharger && (
                        <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, selectedCharger)}
                            style={{
                                padding: '10px',
                                margin: '5px 0',
                                backgroundColor: '#96e3ff',
                                cursor: 'grab',
                                border: '1px solid black',
                            }}
                        >
                            {selectedCharger.name} - ${selectedCharger.bond}
                        </div>
                    )}
                    <h5>Total Bond: ${totalBond}</h5>
                </div>
            </div>
            <button
                type="button"
                className="btn btn-warning"
                onClick={handleRemoveAll}
                style={{ backgroundColor: '#ffcc00', color: 'black', border: '1px solid black' }}
            >
                Remove All
            </button>
        </>
    );
}

export default FormCourtesyPhone;