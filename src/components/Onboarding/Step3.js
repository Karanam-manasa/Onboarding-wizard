

import React, { useState, useRef, useEffect } from 'react';
import '../../index.css';

const Step3 = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    theme: 'light',
    layout: 'grid'
  });
  const [errors, setErrors] = useState({});

  const themeRef = useRef(null);
  const layoutRef = useRef(null);

  // Apply theme preview immediately
  useEffect(() => {
    document.body.className = formData.theme === 'dark' ? 'dark-theme' : '';
  }, [formData.theme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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

    if (!formData.theme) newErrors.theme = 'Please select a theme';
    if (!formData.layout) newErrors.layout = 'Please select a layout';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };


  const handleKeyDownTheme = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      layoutRef.current.focus();
    }
  };

  const handleKeyDownLayout = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="step3-wrapper">
      <div className="step-header">
        <h2>Preferences</h2>
        <p>Customize your experience</p>
      </div>

      <form className="step3-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="theme">Theme Preference</label>
          <div className={`select-wrapper ${errors.theme ? 'input-error' : ''}`}>
            <select
              id="theme"
              ref={themeRef}
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              onKeyDown={handleKeyDownTheme}
              className="form-select"
              autoFocus
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
            </select>
          </div>
          {errors.theme && <span className="error-message">{errors.theme}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="layout">Dashboard Layout</label>
          <div className={`select-wrapper ${errors.layout ? 'input-error' : ''}`}>
            <select
              id="layout"
              ref={layoutRef}
              name="layout"
              value={formData.layout}
              onChange={handleChange}
              onKeyDown={handleKeyDownLayout}
              className="form-select"
            >
              <option value="grid">Grid Layout</option>
              <option value="list">List Layout</option>
            </select>
          </div>
          {errors.layout && <span className="error-message">{errors.layout}</span>}
        </div>

        <div className="button-group">
          <button type="button" onClick={onBack} className="back-button">
            Back
          </button>
          <button type="submit" className="submit-button">
            Complete Setup <span>✓</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;