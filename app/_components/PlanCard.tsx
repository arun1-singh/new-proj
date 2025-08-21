"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export type Plan = {
  name: string;
  price: string;
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  buttonText: string;
  popular: boolean;
  gradient: string;
};

interface PlanCardProps {
  plan: Plan;
  onChoose: (planName: string) => void;
}

export default function PlanCard({ plan, onChoose }: PlanCardProps) {
  const Icon = plan.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative rounded-2xl overflow-hidden"
    >
      {/* Card Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700 z-0 transition-all duration-300 hover:shadow-xl hover:border-purple-500/50">
        
        {/* ⭐ Recommended Tag (Now Inside Card Layer) */}
        {plan.popular && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-10"
          >
            ⭐ Recommended
          </motion.span>
        )}

        <Icon className="w-14 h-14 mb-4 text-white bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg" />

        <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
        <p className="text-4xl font-bold">
          {plan.price}
          <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
            {plan.period}
          </span>
        </p>

        <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-300 text-left w-full">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              {feature}
            </li>
          ))}
        </ul>

        <Button
          onClick={() => onChoose(plan.name)}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          {plan.buttonText}
        </Button>
      </div>
    </motion.div>
  );
}
