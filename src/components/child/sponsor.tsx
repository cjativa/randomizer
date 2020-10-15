import React, { ReactHTML, useEffect, useState } from 'react';
import Progress from 'react-circle-progress-bar';
import axios from 'axios';

const SponsorForm = (props: any) => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: any }>({});
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const [submitProgress, setSubmitProgress] = useState(0);

    useEffect(() => {

        let progressInterval: any;

        const submitSponship = async () => {

            // Submit the payload
            const response = await axios.post('/api/sponsor/setSponsorForRecipient', {
                organization_id: 7,
                recipient_id: 1,
                sponsor_email: email,
                sponsor_name: name,
                sponsor_phone_number: phoneNumber
            });

            console.log(response);
        };

        if (formSubmitted) {

            submitSponship();

            // Increment the progress circle by a quarter every 1/4th of a second
            progressInterval = setInterval(() => {
                setSubmitProgress(submitProgress + 25);
            }, 100);

            // Once we've reached 100 percent, we can clear the interval and wrap up
            if (submitProgress == 100) {
                clearInterval(progressInterval);

                const updateFormTimeout = setTimeout(() => {
                    setFormSubmitted(false);
                    clearTimeout(updateFormTimeout);
                }, 1000);
            }
        }

        if (formSubmitted == false && submitProgress > 0) {
            setSubmitProgress(0);
            props.setShowChildModal(false);
        }

        return () => clearInterval(progressInterval);

    }, [formSubmitted, submitProgress]);

    /** Update the UI with the correct input that's being typed into */
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

    /** Check the form for errors and submit if possible */
    const handleSubmit = () => {

        const errors: { [key: string]: any } = {};
        let formHasErrors = false;

        // Check if the name entered is valid
        if (name.trim().length < 3) {
            errors['name'] = 'Please enter a valid name.';
            formHasErrors = true;
        }

        // Check if the email entered is valid
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false) {
            errors['email'] = 'Please enter a valid email address.';
            formHasErrors = true;
        }

        // Check if phone number is valid
        if (phoneNumber.replace(/\D/g, "").length != 10) {
            errors['phoneNumber'] = 'Please enter a valid phone number.';
            formHasErrors = true;
        }

        // Let's update the UI with the error
        if (formHasErrors) {
            setErrors(errors);
        }

        // Otherwise, no errors so let's submit
        else {
            setFormSubmitted(true);
        }
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

            <button className="sponsor__submit" onClick={handleSubmit} disabled={formSubmitted}>Submit</button>

            {/** Only display the progress circle when the form's been submitted */}
            {formSubmitted &&
                <Progress className="circle" progress={submitProgress} />}
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