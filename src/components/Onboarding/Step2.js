import React, { useState, useRef } from 'react';
import '../../index.css';

const Step2 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    size: ''
  });
  const [errors, setErrors] = useState({});

  const companyRef = useRef(null);
  const industryRef = useRef(null);
  const sizeRef = useRef(null);

  const lettersOnlyPattern = /^[A-Za-z\s]+$/;
  const sizePattern = /^\d+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      companyRef.current.focus();
    }else if (!lettersOnlyPattern.test(formData.companyName.trim())) {
      newErrors.companyName = 'Only letters and spaces allowed';
      companyRef.current.focus();
    }

    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
      industryRef.current.focus();
    }else if (!lettersOnlyPattern.test(formData.industry.trim())) {
      newErrors.industry = 'Only letters and spaces allowed';
      industryRef.current.focus();
    }

    if (!formData.size.trim()) {
      newErrors.size = 'Company size is required';
      sizeRef.current.focus();
    } else if (!sizePattern.test(formData.size.trim())) {
      newErrors.size = 'Must be a number';
      sizeRef.current.focus();
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({
      companyName: formData.companyName.trim(),
      industry: formData.industry.trim(),
      size: formData.size.trim()
    });
  };

  const handleKeyDownCompany = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      industryRef.current.focus();
    }
  };

  const handleKeyDownIndustry = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sizeRef.current.focus();
    }
  };

  const handleKeyDownSize = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="step2-wrapper">
      <div className="step-header">
        <h2>Company Information</h2>
        <p>Tell us about your organization</p>
      </div>

      <form className="step2-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            ref={companyRef}
            type="text"
            name="companyName"
            placeholder="Acme Inc."
            value={formData.companyName}
            onChange={handleChange}
            className={`form-input ${errors.companyName ? 'input-error' : ''}`}
            autoFocus
            pattern="[A-Za-z\s]+"
            title="Only letters and spaces allowed"
          />
          {errors.companyName && (
            <span className="error-message">{errors.companyName}</span>
          )}
        </div>
            

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            id="industry"
            ref={industryRef}
            type="text"
            name="industry"
            placeholder="Technology, Healthcare"
            value={formData.industry}
            onChange={handleChange}
            className={`form-input ${errors.industry ? 'input-error' : ''}`}
            pattern="[A-Za-z\s]+"
            title="Only letters and spaces allowed"
          />
          {errors.industry && (
            <span className="error-message">{errors.industry}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="size">Company Size</label>
          <input
            id="size"
            ref={sizeRef}
            type="text"
            name="size"
            placeholder="Number of employees"
            value={formData.size}
            onChange={handleChange}
            onKeyDown={handleKeyDownSize}
            className={`form-input ${errors.size ? 'input-error' : ''}`}
          />
          {errors.size && <span className="error-message">{errors.size}</span>}
        </div>

        <div className="button-group">
          <button type="button" onClick={onBack} className="back-button">
            Back
          </button>
          <button type="submit" className="next-button">
            Continue <span>→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;