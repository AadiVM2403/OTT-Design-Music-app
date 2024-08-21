import React, { useState, useEffect,useRef,useContext,useCallback } from 'react';
import './otp.css';
import { Navigate } from 'react-router-dom';
import  PhoneContext from './PhoneContext';
import { Link } from 'react-router-dom';

function Otp() {
  const [countdownValue, setCountdownValue] = useState(30);
  const [isResendBtnVisible, setIsResendBtnVisible] = useState(true);
  const [inputValues, setInputValues] = useState(["", "", "", ""])
  const [inputsFilled, setInputsFilled] = useState(false);
  const [redirectToMain, setRedirectToMain] = useState(false);
  const countdownIntervalRef = useRef(null);
  
  const phoneContext = useContext(PhoneContext); 
  const PhoneNumber = phoneContext.PhoneNumber; 
 
  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    const inputs = document.querySelectorAll(".input-field input");
    const currentInput = inputs[index];

    if (value.length > 1) {
      currentInput.value = "";
      return;
    }

    const nextInput = currentInput.nextElementSibling;
    const prevInput = currentInput.previousElementSibling;

    if (nextInput && nextInput.hasAttribute("disabled") && value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    if (value === "") {
      inputs.forEach((input, index2) => {
        if (index <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }

    const isAllInputsFilled = [...inputs].every((input) => input.value);
    setInputsFilled(isAllInputsFilled);
  };
  

  const updateCountdown = () => {
    setCountdownValue(prevValue => (prevValue > 0 ? prevValue - 1 : 0));
  };

  const startCountdown = useCallback(() => {
    countdownIntervalRef.current = setInterval(updateCountdown, 1000);
  }, []);
  

  useEffect(() => {
    startCountdown();
    return () => {
      clearInterval(countdownIntervalRef.current);
    };
  }, [startCountdown]);

  useEffect(() => {
    if (countdownValue === 0) {
      clearInterval(countdownIntervalRef.current);
      setIsResendBtnVisible(true);
    }
  }, [countdownValue]);

  const handleResendClick = async () => {
    setIsResendBtnVisible(false);
    setCountdownValue(30);
    startCountdown();
  
    try {
      const response = await fetch("https://adidev01.ipadlive.com/TEST/api.php", {
        method: "POST",
        body: JSON.stringify ({
          action: "sendotp",
          phno: PhoneNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result.status === "SUCCESS") {
          console.log("Success");
          alert(`OTP sent: ${data.result.otp}`);
          localStorage.setItem('otprec', data.result.otp);
        } else {
          console.error("Sending OTP failed:", data.result.message);
        }
      } else {
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNextClick = async () => {
    const otp = inputValues.join(''); // Combine the OTP input values
    try {
      const response = await fetch("https://adidev01.ipadlive.com/TEST/api.php", {
        method: "POST",
        body: JSON.stringify({
          action: "verifyotp",
          phno: PhoneNumber,
          otp: otp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result.status === "SUCCESS") {
          // Verify whether the entered OTP matches the one sent by the API
          const otpsent = localStorage.getItem('otprec');
          if (otpsent === otp) {
            console.log("Verification successful");
            setRedirectToMain(true);
          } else {
            console.error("Entered OTP does not match");
            alert("Entered OTP does not match")
          }
        } else {
          console.error("Verification failed:", data.result.message);
        }
      } else {
        console.error("Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirectToMain) {
    return <Navigate to={'/Main'} replace={true} />;
  }
  
  return (
    <div className="container">
      <Link to="/login" className="back">&lt;</Link>
      <h4>Enter OTP</h4>
      <p>
        We have sent an OTP on: {PhoneNumber}
      </p>
      <div className="input-field">
          <input type="number" onChange={(e) => handleInputChange(0, e.target.value)} />
          <input type="number" disabled onChange={(e) => handleInputChange(1, e.target.value)} />
          <input type="number" disabled onChange={(e) => handleInputChange(2, e.target.value)} />
          <input type="number" disabled onChange={(e) => handleInputChange(3, e.target.value)} />
      </div>
      <div id="verificationContainer">
        <button
          id="resendBtn"
          onClick={handleResendClick}
          style={{ display: isResendBtnVisible ? 'block' : 'none' }}
        >
          Resend OTP
        </button>
        <p id="resendTxt" style={{ display: isResendBtnVisible ? 'none' : 'block' }}>
          Resend OTP in {countdownValue} sec
        </p>
        <button
          id="nextBtn"
          className={`uk-button submit-button ${!inputsFilled ? 'disabled' : ''}`}
          disabled={!inputsFilled}
          onClick={handleNextClick} // Call the API verification function on button click
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Otp;













