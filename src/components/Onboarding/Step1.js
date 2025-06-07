import React, { useState, useRef } from 'react';
import '../../index.css';

const Step1 = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const emailPattern = /^\S+@gmail+\.com+$/;
  const namePattern = /^[A-Za-z ]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!namePattern.test(name.trim())) {
      newErrors.name = 'Only letters and spaces allowed';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext({ name: name.trim(), email: email.trim() });
  };

  const handleKeyDownName = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      emailRef.current.focus();
    }
  };

  const handleKeyDownEmail = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="step1-wrapper">
      <div className="step-header">
        <h2>Personal Information</h2>
        
      </div>

      <form className="step1-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            ref={nameRef}
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({...errors, name: ''});
            }}
            onKeyDown={handleKeyDownName}
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            autoFocus
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({...errors, email: ''});
            }}
            onKeyDown={handleKeyDownEmail}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <button type="submit" className="next-button">
          Continue <span>→</span>
        </button>
      </form>
    </div>
  );
};

export default Step1;