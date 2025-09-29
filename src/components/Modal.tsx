import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
      {/* Container principal do modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg z-50">
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold"
          >
            &times; 
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};