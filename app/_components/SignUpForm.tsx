"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

interface SignupFormProps {
  selectedPlan: string;
}

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ selectedPlan }) => {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const newErrors: FormErrors = {};
    if (touched.fullName && !formData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (touched.password && formData.password.length < 6)
      newErrors.password = "Password min 6 chars";
    if (
      touched.confirmPassword &&
      formData.password !== formData.confirmPassword
    )
      newErrors.confirmPassword = "Passwords do not match";
    if (touched.acceptTerms && !formData.acceptTerms)
      newErrors.acceptTerms = "Accept terms";
    setErrors(newErrors);
  }, [formData, touched]);

  const handleBlur = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = () =>
    Object.keys(errors).length === 0 &&
    formData.fullName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.acceptTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });

    if (isFormValid()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        router.push(
          `/confirmation?fullName=${encodeURIComponent(
            formData.fullName
          )}&email=${encodeURIComponent(
            formData.email
          )}&selectedPlan=${encodeURIComponent(selectedPlan)}`
        );
      }, 2000);
    }
  };

  const getInputClassName = (field: keyof FormErrors) => {
    let base = `w-full px-4 py-3 pl-12 border rounded-2xl transition-all duration-300 backdrop-blur-xl shadow-inner focus:scale-[1.02] ${
      isDark ? "bg-gray-900/60 text-white" : "bg-white/70 text-gray-900"
    }`;
    if (errors[field])
      return base + " border-red-400 focus:ring-2 focus:ring-red-300 animate-shake";
    if (touched[field] && !errors[field])
      return base + " border-green-400 focus:ring-2 focus:ring-green-300";
    return base + " border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200";
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden`}
    >
    
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x opacity-70 dark:opacity-50"></div>

      
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full shadow-md bg-white/40 dark:bg-black/40 backdrop-blur-lg"
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-600" />}
      </button>

      
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-md w-full bg-white/30 dark:bg-gray-900/50 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl space-y-6 relative border border-white/20"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Create Your Account
        </h2>
        <p className="text-center text-gray-200 dark:text-gray-400">
          You’ve selected the <span className="font-semibold">{selectedPlan}</span> plan
        </p>

        
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={() => handleBlur("fullName")}
            placeholder="Full Name"
            className={getInputClassName("fullName")}
          />
        </div>

        
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            placeholder="Email"
            className={getInputClassName("email")}
          />
        </div>

        
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => handleBlur("password")}
            placeholder="Password"
            className={getInputClassName("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={() => handleBlur("confirmPassword")}
            placeholder="Confirm Password"
            className={getInputClassName("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-2"
        >
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            onBlur={() => handleBlur("acceptTerms")}
            className="h-5 w-5 rounded-lg border-gray-400 text-indigo-500 focus:ring-2 focus:ring-indigo-300"
          />
          <label className="text-sm text-gray-700 dark:text-gray-300">
            I accept Terms & Privacy
          </label>
        </motion.div>

        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className={`w-full py-3 rounded-2xl font-semibold text-white shadow-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all relative overflow-hidden ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </div>
          ) : (
            "✨ Create Account ✨"
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default SignupForm;
