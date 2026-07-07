import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { CREMES } from '@/lib/orderData';
import StepCard from './StepCard';

export default function CremeStep({ selected, onSelect, disabled }) {
  return (
    <StepCard
      step={3}
      title="Escolha seu Creme Grátis"
      description="Escolha 1 creme (incluído no preço)"
    >
      <div
        className={`grid sm:grid-cols-2 gap-3 transition-opacity ${
          disabled ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        {CREMES.map((creme) => {
          const isSelected = selected === creme.name;
          return (
            <button
              key={creme.name}
              onClick={() => onSelect(isSelected ? null : creme.name)}
              disabled={disabled}
              className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-[#7B2CBF] bg-[#7B2CBF]/8 shadow-md shadow-[#7B2CBF]/10'
                  : 'border-gray-100 hover:border-[#C77DFF] hover:bg-[#F5F5F5]'
              }`}
            >
              <span className="text-2xl">🍦</span>
              <div className="flex-1">
                <p className="font-semibold text-sm sm:text-base text-[#4B0E6B]">
                  {creme.name}
                </p>
                <span className="inline-flex items-center gap-1 text-xs bg-[#7ED957]/15 text-[#5ba336] font-semibold px-2 py-0.5 rounded-full mt-1">
                  Grátis
                </span>
              </div>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-[#7ED957] flex items-center justify-center"
                >
                  <Check size={14} className="text-white" />
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </StepCard>
  );
}
