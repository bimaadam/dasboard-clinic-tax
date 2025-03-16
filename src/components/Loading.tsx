"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    </div>
  );
}
