"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Logo {
  name: string;
  logo: string;
  className: string;
}

const PHARMA_LOGOS: Logo[] = [
  { name: "Pfizer", logo: "https://i.ibb.co.com/Y7BWjjms/image-removebg-preview-1.png", className: "h-8 md:h-10 w-auto" },
  { name: "Novartis", logo: "https://i.ibb.co.com/Y7BWjjms/image-removebg-preview-1.png", className: "h-6 md:h-8 w-auto" },
  { name: "GSK", logo: "https://i.ibb.co.com/Y7BWjjms/image-removebg-preview-1.png", className: "h-8 md:h-10 w-auto" },
  { name: "Roche", logo: "https://i.ibb.co.com/Y7BWjjms/image-removebg-preview-1.png", className: "h-7 md:h-9 w-auto" },
  { name: "Sanofi", logo: "https://i.ibb.co.com/Y7BWjjms/image-removebg-preview-1.png", className: "h-6 md:h-7 w-auto" },
  { name: "Bayer", logo: "https://i.ibb.co.com/Y7BWjjms/image-removebg-preview-1.png", className: "h-10 md:h-12 w-auto" },
  { name: "Abbott", logo: "https://i.ibb.co.com/Y7BWjjms/image-removebg-preview-1.png", className: "h-6 md:h-7 w-auto" },
  { name: "AstraZeneca", logo: "https://i.ibb.co.com/Y7BWjjms/image-removebg-preview-1.png", className: "h-7 md:h-9 w-auto" }
];

const Logos8 = ({ className }: { className?: string }) => {
  const firstRow = [...PHARMA_LOGOS, ...PHARMA_LOGOS];
  const secondRow = [...PHARMA_LOGOS, ...PHARMA_LOGOS];

  const marqueeVariants = (direction: "left" | "right") => ({
    animate: {
      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  });

  return (
    <section className={cn("py-5 overflow-hidden", className)}>
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">Our Authorized Partners</h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto mt-3 rounded-full" />
      </div>

      <div className="relative flex flex-col gap-8 md:gap-12">
        <div className="absolute left-0 top-0 bottom-0 w-24 " />
        <div className="absolute right-0 top-0 bottom-0 w-24 " />

        <motion.div
          className="flex whitespace-nowrap gap-12 md:gap-20 items-center"
          variants={marqueeVariants("left")}
          animate="animate"
          whileHover={{ animationPlayState: "paused" }}
        >
          {firstRow.map((logo, index) => (
            <div key={index} className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src={logo.logo} alt={logo.name} className={logo.className} />
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex whitespace-nowrap gap-12 md:gap-20 items-center"
          variants={marqueeVariants("right")}
          animate="animate"
          whileHover={{ animationPlayState: "paused" }}
        >
          {secondRow.map((logo, index) => (
            <div key={index} className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src={logo.logo} alt={logo.name} className={logo.className} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-12 flex justify-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dispensing Quality Since 2024</p>
      </div>
    </section>
  );
};

export { Logos8 };