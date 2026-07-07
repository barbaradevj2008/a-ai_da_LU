import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Store, MapPin, AlertTriangle } from 'lucide-react';
import { formatPhone, formatCurrency, calculateFreight, isWeekend } from '@/lib/orderData';
import StepCard from './StepCard';

export default function DeliveryStep({
  deliveryType,
  onDeliveryTypeChange,
  address,
  onAddressChange,
  distanceKm,
  onDistanceChange,
  disabled,
}) {
  const dist = parseFloat(distanceKm);
  const freight = dist > 0 ? calculateFreight(dist) : null;
  const weekend = isWeekend();

  const inputClass =
    'w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#7B2CBF] focus:outline-none focus:ring-2 focus:ring-[#C77DFF]/20 text-sm transition-all';
  const labelClass = 'text-xs font-medium text-gray-500 mb-1 block';

  return (
    <StepCard
      step={5}
      title="Entrega ou Retirada"
      description="Escolha como deseja receber seu pedido"
    >
      <div
        className={`grid grid-cols-2 gap-3 mb-5 transition-opacity ${
          disabled ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        <button
          onClick={() => onDeliveryTypeChange('delivery')}
          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
            deliveryType === 'delivery'
              ? 'border-[#7B2CBF] bg-[#7B2CBF]/8 shadow-md shadow-[#7B2CBF]/10'
              : 'border-gray-100 hover:border-[#C77DFF]'
          }`}
        >
          <Truck
            size={24}
            className={deliveryType === 'delivery' ? 'text-[#7B2CBF]' : 'text-gray-400'}
          />
          <span
            className={`text-sm font-semibold ${
              deliveryType === 'delivery' ? 'text-[#4B0E6B]' : 'text-gray-500'
            }`}
          >
            Entrega
          </span>
        </button>
        <button
          onClick={() => onDeliveryTypeChange('pickup')}
          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
            deliveryType === 'pickup'
              ? 'border-[#7B2CBF] bg-[#7B2CBF]/8 shadow-md shadow-[#7B2CBF]/10'
              : 'border-gray-100 hover:border-[#C77DFF]'
          }`}
        >
          <Store
            size={24}
            className={deliveryType === 'pickup' ? 'text-[#7B2CBF]' : 'text-gray-400'}
          />
          <span
            className={`text-sm font-semibold ${
              deliveryType === 'pickup' ? 'text-[#4B0E6B]' : 'text-gray-500'
            }`}
          >
            Retirar na Loja
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {deliveryType === 'delivery' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FFA500]/8 border border-[#FFA500]/20 mb-4">
              <AlertTriangle size={18} className="text-[#FFA500] flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#8a6d00] font-medium">
                Realizamos entregas apenas dentro do raio de até 5 km da loja.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Nome *</label>
                <input
                  className={inputClass}
                  value={address.name}
                  onChange={(e) => onAddressChange('name', e.target.value)}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className={labelClass}>Telefone *</label>
                <input
                  className={inputClass}
                  value={address.phone}
                  onChange={(e) =>
                    onAddressChange('phone', formatPhone(e.target.value))
                  }
                  placeholder="(84) 99999-9999"
                  inputMode="tel"
                />
              </div>
              <div className="sm:col-span-2 grid sm:grid-cols-[1fr_auto] gap-3">
                <div>
                  <label className={labelClass}>Rua *</label>
                  <input
                    className={inputClass}
                    value={address.street}
                    onChange={(e) => onAddressChange('street', e.target.value)}
                    placeholder="Nome da rua"
                  />
                </div>
                <div className="w-full sm:w-24">
                  <label className={labelClass}>Número *</label>
                  <input
                    className={inputClass}
                    value={address.number}
                    onChange={(e) => onAddressChange('number', e.target.value)}
                    placeholder="Nº"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Bairro *</label>
                <input
                  className={inputClass}
                  value={address.neighborhood}
                  onChange={(e) => onAddressChange('neighborhood', e.target.value)}
                  placeholder="Seu bairro"
                />
              </div>
              <div>
                <label className={labelClass}>Complemento</label>
                <input
                  className={inputClass}
                  value={address.complement}
                  onChange={(e) => onAddressChange('complement', e.target.value)}
                  placeholder="Apto, bloco..."
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Ponto de referência</label>
                <input
                  className={inputClass}
                  value={address.reference}
                  onChange={(e) => onAddressChange('reference', e.target.value)}
                  placeholder="Próximo a..."
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-[#F5F5F5] border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-[#7B2CBF]" />
                <label className="text-sm font-medium text-[#4B0E6B]">
                  Distância da loja (km) *
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className={inputClass + ' sm:w-40'}
                  value={distanceKm}
                  onChange={(e) => onDistanceChange(e.target.value)}
                  placeholder="Ex: 2.5"
                />
                <div className="flex-1">
                  {dist > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {freight !== null ? (
                        <>
                          <span className="text-sm text-gray-500">
                            Frete ({weekend ? 'Fim de semana' : 'Seg a Qui'}):
                          </span>
                          <span className="text-lg font-bold text-[#7B2CBF]">
                            {formatCurrency(freight)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-red-500 font-medium">
                          ⚠ Fora do raio de entrega (máx 5 km)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {deliveryType === 'pickup' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 p-4 rounded-xl bg-[#7ED957]/8 border border-[#7ED957]/20"
        >
          <Store size={20} className="text-[#5ba336]" />
          <p className="text-sm text-[#5ba336] font-medium">
            Retirada na loja — sem frete! Avise quando estiver pronto. 📍
          </p>
        </motion.div>
      )}
    </StepCard>
  );
}
