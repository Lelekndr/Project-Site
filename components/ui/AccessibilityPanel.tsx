"use client";

import { useState } from 'react';
import { Accessibility, Eye, Type, Zap, X } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { highContrast, largeText, reducedMotion, toggleHighContrast, toggleLargeText, toggleReducedMotion } = useAccessibility();

  return (
    <>
      {/* Botão flutuante de acessibilidade */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-label="Abrir painel de acessibilidade"
        title="Abrir opções de acessibilidade"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Painel de acessibilidade */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Painel */}
          <div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 id="accessibility-title" className="text-xl font-bold text-gray-900 dark:text-white">
                Opções de Acessibilidade
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Fechar painel de acessibilidade"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Opções */}
            <div className="space-y-4">
              {/* Alto Contraste */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Alto Contraste
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Aumenta o contraste das cores
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 border-2 ${
                    highContrast 
                      ? 'bg-blue-600 border-blue-400' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={highContrast}
                  aria-labelledby="high-contrast-label"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${
                      highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Texto Grande */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Type className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Texto Grande
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Aumenta o tamanho do texto
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleLargeText}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 border-2 ${
                    largeText 
                      ? 'bg-green-600 border-green-400' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={largeText}
                  aria-labelledby="large-text-label"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${
                      largeText ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Movimento Reduzido */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Reduzir Movimento
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Reduz animações e transições
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleReducedMotion}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 border-2 ${
                    reducedMotion 
                      ? 'bg-purple-600 border-purple-400' 
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
                  }`}
                  role="switch"
                  aria-checked={reducedMotion}
                  aria-labelledby="reduced-motion-label"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${
                      reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                As configurações são salvas automaticamente
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
