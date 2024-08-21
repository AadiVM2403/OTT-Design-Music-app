import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import './login.css'; 
import  PhoneContext  from './PhoneContext';
import { Link } from 'react-router-dom';

function LoginPage() {
  const phoneValue = useContext(PhoneContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [redirectToOTP, setRedirectToOTP] = useState(false);
  

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    const maxLength = 10;
  
    if (/^[0-9]*$/.test(inputValue) && inputValue.length === maxLength) {
      setIsButtonDisabled(false);
      phoneValue.setPhoneNumber(inputValue);
      localStorage.setItem('PhoneNumber', inputValue);
    } else {
      setIsButtonDisabled(true);
    }
  };
  

  const handleOTPButtonClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (isButtonDisabled) {
      alert('Please enter a valid phone number.');
    } else {
      try {
        const response = await fetch("https://adidev01.ipadlive.com/TEST/api.php", {
          method: "POST",
          body: JSON.stringify ({
            action: "sendotp",
            phno: phoneValue.PhoneNumber,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.result.status === "SUCCESS") {
            console.log("Success");
            alert(`OTP sent: ${data.result.otp}`);
            localStorage.setItem('otprec', data.result.otp);
            setRedirectToOTP(true);
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
  }  

  if (redirectToOTP) {
    return <Navigate to={'/otp'} replace={true} />;
  }

  return (
    <form className='cont'>
      <Link to="/" className="back">&lt;</Link>
      <h3>Login</h3><br />
      <div className="Welcome">Hello!! Welcome back to your account</div>
      <label htmlFor="phone">Phone Number</label>
      <div className="phone">
        <select id="country-code">
          <option value="+91">IND (+91)</option>
          <option value="+1">USA (+1)</option>
          <option value="+44">UK (+44)</option>
          <option value="+61">AUS (+61)</option>
          <option value="+86">CHN (+86)</option>
          <option value="+33">FRA (+33)</option>
          <option value="+49">GER (+49)</option>
          <option value="+81">JPN (+81)</option>
          <option value="+82">SKR (+82)</option>
          <option value="+52">MEX (+52)</option>
          <option value="+7">RUS (+7)</option>
          <option value="+34">SPA (+34)</option>
          <option value="+968">OM (+968)</option>
          <option value="+46">SWE (+46)</option>
          <option value="+41">SWZ (+41)</option>
        </select>
        <span className="lineusingborder"></span>
        <input
          type="tel"
          id="phone-number"
          placeholder="Enter your phone number"
          onChange={handlePhoneNumberChange}
          autoComplete="off"
        />
      </div>
      <a href='/otp' disabled={isButtonDisabled} className={`otp-button`} onClick={handleOTPButtonClick}>
        Request OTP
      </a>
      <div className="horizontal-line">
        <span className="text-between-lines">or Continue with</span>
      </div>
      <div className="social">
        <img id="google" src="https://cdn-teams-slug.flaticon.com/google.jpg" alt="Google" />
        <img id="facebook" src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" />
      </div>
    </form>
  );
}

export default LoginPage;

