"use client";
import React from 'react';
import SignupForm from '../_components/SignUpForm';
import { useSearchParams } from 'next/navigation';

const SignupPage: React.FC = () => {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get('selectedPlan') || 'Standard';

  return <SignupForm selectedPlan={selectedPlan} />;
};

export default SignupPage;
