"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fullName = searchParams.get("fullName") || "Friend";
  const plan = searchParams.get("selectedPlan") || "Unknown Plan";


  const [typed, setTyped] = useState("");
  const message = `Congratulations, ${fullName}! 🎉 You’ve successfully signed up for the ${plan} plan.`;


  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setTyped((prev) => prev + message[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 text-white">
      
      <Confetti recycle={false} numberOfPieces={500} />

      
      <motion.div
        className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10"
        animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-pink-300/20 rounded-full blur-3xl bottom-20 right-10"
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl text-center p-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 text-transparent bg-clip-text"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Welcome Aboard 🚀
        </motion.h1>

        <p className="text-lg md:text-xl leading-relaxed font-medium text-white/90 min-h-[80px]">
          {typed}
        </p>

    
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #fff" }}
          className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold shadow-lg"
          onClick={() => router.push("/")}
        >
          Go Back to Home 🌟
        </motion.button>
      </motion.div>
    </div>
  );
}
