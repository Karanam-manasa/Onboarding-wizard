// File: src/pages/OnboardingPage.js
import React, { useState } from 'react';
import Step1 from '../components/Onboarding/Step1';
import Step2 from '../components/Onboarding/Step2';
import Step3 from '../components/Onboarding/Step3';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Called by Step1 & Step2 to merge data and advance step
  const handleNext = (dataFromStep) => {
    setFormData({ ...formData, ...dataFromStep });
    setStep(step + 1);
  };

  // Called by any step’s “Back” button
  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (dataFromStep3) => {
  const finalData = { ...formData, ...dataFromStep3 };
  localStorage.setItem('userData', JSON.stringify(finalData));
  alert("Welcome! Your setup is complete.");
  navigate('/dashboard');
};

  return (
    <div className="container">
      <h1 className="heading">Onboarding Wizard</h1>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }} />
      </div>

      <div className="onboarding-step">
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <Step3 onBack={handleBack} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default OnboardingPage;
