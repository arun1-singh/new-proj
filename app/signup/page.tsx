"use client";
import React from "react";
import SignupForm from "../_components/SignUpForm";


const SignupPage: React.FC = () => {
  const selectedPlan = "Standard";

  return <SignupForm selectedPlan={selectedPlan} />;
};

export default SignupPage;
