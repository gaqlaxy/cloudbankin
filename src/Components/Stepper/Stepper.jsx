import React, { useState, useEffect } from "react";
import "../../styles/Stepper.css";
import FormContent from "../FormContent/FormContent";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Step titles
  const steps = [
    "Borrower Company Info",
    "Director Info",
    "Financial Info",
    "Past Performance Details",
    "Document Upload",
  ];

  // Effect to check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Update state based on screen size
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize); // Listen for resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup on component unmount
  }, []);

  return (
    <div className="stepper-container">
      <div
        className="stepper"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin="1"
        aria-valuemax={steps.length}
      >
        {steps.map((label, index) => (
          <React.Fragment key={index}>
            <div
              className={`step ${currentStep === index + 1 ? "active" : ""}`}
            >
              <div className="circle">{index + 1}</div>
              <span className="label">
                {/* Render dynamic text based on screen size */}
                {index === 0 && isSmallScreen ? "Borrower Info" : label}
              </span>
            </div>
            {/* Dotted line between steps */}
            {index < steps.length - 1 && (
              <div
                className={`dotted-line ${
                  currentStep > index + 1 ? "completed" : ""
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <FormContent currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default Stepper;
