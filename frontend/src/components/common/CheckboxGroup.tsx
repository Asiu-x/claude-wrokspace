import React from 'react';

interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues?: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues = [],
  onChange,
  className = ''
}) => {
  const handleCheckboxChange = (option: CheckboxOption, checked: boolean) => {
    const newSelected = checked
      ? [...selectedValues, option.value]
      : selectedValues.filter(value => value !== option.value);
    onChange?.(newSelected);
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
            type="checkbox"
            checked={selectedValues.includes(option.value)}
            onChange={(e) => handleCheckboxChange(option, e.target.checked)}
            disabled={option.disabled}
            className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};
