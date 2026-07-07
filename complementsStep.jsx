import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { SIZES, FREE_COMPLEMENTS } from '@/lib/orderData';
import StepCard from './StepCard';

export default function ComplementsStep({ size, selected, onToggle }) {
  const sizeData = SIZES.find((s) => s.id === size);
  const maxFree = sizeData?.freeComplements || 0;
  const remaining = maxFree - selected.length;
  const disabled = !size;

  return (
    <StepCard
      step={2}
      title="Complementos Gratuitos"
      description={
        size
          ? `Escolha até ${maxFree} complementos grátis`
          : 'Selecione um tamanho primeiro'
      }
    >
      {size && (
        <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-gradient-to-r from-[#4B0E6B]/5 to-[#7B2CBF]/5 border border-[#C77DFF]/20">
          <span className="text-sm font-medium text-[#4B0E6B]">
            Créditos restantes
          </span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: maxFree }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-2.5 rounded-full transition-colors ${
                    i < selected.length ? 'bg-[#7B2CBF]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <span
              className={`text-sm font-bold ${
                remaining === 0 ? 'text-[#7ED957]' : 'text-[#7B2CBF]'
              }`}
            >
              {remaining}/{maxFree}
            </span>
          </div>
        </div>
      )}

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 gap-2.5 transition-opacity ${
          disabled ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        {FREE_COMPLEMENTS.map((name) => {
          const isSelected = selected.includes(name);
          const canSelect = remaining > 0 || isSelected;
          return (
            <button
              key={name}
              onClick={() => onToggle(name)}
              disabled={!canSelect}
              className={`relative flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all text-xs sm:text-sm font-medium ${
                isSelected
                  ? 'border-[#7B2CBF] bg-[#7B2CBF]/8 text-[#4B0E6B]'
                  : canSelect
                    ? 'border-gray-100 hover:border-[#C77DFF] text-gray-700 hover:bg-[#F5F5F5]'
                    : 'border-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#7B2CBF] border-[#7B2CBF]'
                    : 'border-gray-300'
                }`}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check size={12} className="text-white" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="leading-tight">{name}</span>
            </button>
          );
        })}
      </div>
    </StepCard>
  );
}
