import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: ReactNode; 
  onIconClick?: () => void; 
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, icon, onIconClick, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...props}
          />
          {icon && (
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
              onClick={onIconClick}
            >
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';