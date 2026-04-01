import React from 'react';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
  className = ''
}) => {
  const handleRadioChange = (option: RadioOption) => {
    onChange?.(option.value);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {options.map(option => (
        <label
          key={option.value}
          className={`flex items-center gap-2 text-sm cursor-pointer ${
            option.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
          }`}
        >
          <input
            type="radio"
            checked={selectedValue === option.value}
            onChange={() => handleRadioChange(option)}
            disabled={option.disabled}
            className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
