import React, { ReactHTML, useState } from 'react';

const SponsorForm = () => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: any }>({});

    const handleInput = (e: any) => {

        const { name, value } = e.target;

        // Handle setting the appropriate value during input entry
        switch (name) {

            case 'name': {
                setName(value);
                break;
            }

            case 'email': {
                setEmail(value);
                break;
            }

            case 'phoneNumber': {
                setPhoneNumber(formatToPhone(value));
                break
            }
        }
    };

    const handleSubmit = () => {

        const errors: { [key: string]: any } = {};

        // Check if the name entered is valid
        if (name.trim().length < 3) {
            errors['name'] = 'Please enter a valid name.';
        }

        // Check if the email entered is valid
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false) {
            errors['email'] = 'Please enter a valid email address.';
        }

        // Check if phone number is valid
        if (phoneNumber.replace(/\D/g, "").length != 10) {
            errors['phoneNumber'] = 'Please enter a valid phone number.';
        }

        setErrors(errors);
    };

    return (
        <div className='sponsor'>
            <div className="form-field">
                <label>Name</label>
                {errors.hasOwnProperty('name') && <span className="error">{errors.name}</span>}
                <input type="text" value={name} name="name" onChange={handleInput} />
            </div>

            <div className="form-field">
                <label>Phone Number</label>
                {errors.hasOwnProperty('phoneNumber') && <span className="error">{errors.phoneNumber}</span>}
                <input type="tel" value={phoneNumber} name="phoneNumber" onChange={handleInput} />
            </div>

            <div className="form-field">
                <label>Email</label>
                {errors.hasOwnProperty('email') && <span className="error">{errors.email}</span>}
                <input type="email" value={email} name="email" onChange={handleInput} />
            </div>

            <button className="sponsor__submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
};

export default SponsorForm;

const isNumericInput = (event: any) => {
    const key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    );
};

const isModifierKey = (event: any) => {
    const key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        )
};

const formatToPhone = (value: any): string => {

    // I am lazy and don't like to type things more than once
    const input = value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    let formatted = '';

    if (input.length > 6) { formatted = `(${zip}) ${middle} - ${last}`; }
    else if (input.length > 3) { formatted = `(${zip}) ${middle}`; }
    else if (input.length > 0) { formatted = `(${zip}`; }

    return formatted;
};