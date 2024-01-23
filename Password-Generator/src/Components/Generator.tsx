import React, { ChangeEvent, useState } from 'react';
import Checkbox from './Checkbox';
import '../styles/Generator.css';

const Generator: React.FC = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(8);
    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeLowercase, setIncludeLowercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        switch (event.target.id) {
            case 'includeUppercase':
                setIncludeUppercase(!includeUppercase);
                break;
            case 'includeLowercase':
                setIncludeLowercase(!includeLowercase);
                break;
            case 'includeNumbers':
                setIncludeNumbers(!includeNumbers);
                break;
            case 'includeSymbols':
                setIncludeSymbols(!includeSymbols);
                break;
        }
    };

    const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLength(Number(event.target.value));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const copyPassword = async () => {
        await navigator.clipboard.writeText(password);
    };
    const createPassword = () => {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const digitChars = "0123456789";
        const symbolChars = "!@#$%^&*()-_=+[{]};:'\"<>,.?/";

        let validChars = "";
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            alert("You must select at least one character type!");
            return;
        }
        if (includeUppercase) validChars += uppercaseChars;
        if (includeLowercase) validChars += lowercaseChars;
        if (includeNumbers) validChars += digitChars;
        if (includeSymbols) validChars += symbolChars;

        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * validChars.length);
            generatedPassword += validChars[randomIndex];
        }

        setPassword(generatedPassword);
    };
    return (
        <div className='generator-container'>
            <h1>Password Generator</h1>
            <div className='input-container'>
                <div className='number-input'>
                <label htmlFor="password-length">Password Length :
                </label>
                <input type="number" value={length} onChange={handleLengthChange} />
                </div>
                <Checkbox value={includeUppercase} id="includeUppercase" label="Include Uppercase" onChange={handleCheckboxChange} />
                <Checkbox value={includeLowercase} id="includeLowercase" label="Include Lowercase" onChange={handleCheckboxChange} />
                <Checkbox value={includeNumbers} id="includeNumbers" label="Include Numbers" onChange={handleCheckboxChange} />
                <Checkbox value={includeSymbols} id="includeSymbols" label="Include Symbols" onChange={handleCheckboxChange} />
            </div>
            <button onClick={createPassword}>Generate Password</button>
            {password && (
                <div>
                    <h3>Your generated password:</h3>
                    <div className="password-display">
                        {showPassword ? (
                            <input type="text" value={password} readOnly />
                        ) : (
                            <input type="password" value={password} readOnly />
                        )}
                        <button id="copyButton" onClick={copyPassword}>Copy</button>
                        <button onClick={toggleShowPassword}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Generator;
