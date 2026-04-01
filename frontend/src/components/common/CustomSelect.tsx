import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, options, onChange, icon, size = 'md', className = '' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const btnCls = size === 'sm'
    ? `flex items-center gap-1.5 ${icon ? 'pl-2.5' : 'pl-3'} pr-7 py-1.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-colors w-full text-left`
    : `flex items-center gap-2 ${icon ? 'pl-3' : 'pl-4'} pr-8 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-colors w-full text-left`;

  const chevronCls = size === 'sm'
    ? 'absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none'
    : 'absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none';

  const dropdownCls = size === 'sm'
    ? 'absolute z-50 mt-1 w-full min-w-[80px] bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-auto'
    : 'absolute z-50 mt-1 w-full min-w-[120px] bg-white border border-gray-200 rounded-xl shadow-lg py-1 max-h-60 overflow-auto';

  const itemCls = size === 'sm' ? 'px-3 py-2 text-sm' : 'px-4 py-2.5 text-sm';

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen(!open)} className={btnCls}>
        {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}
        <span className="truncate">{selected?.label || ''}</span>
      </button>
      <svg className={chevronCls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>

      {open && (
        <div className={dropdownCls}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`${itemCls} cursor-pointer transition-colors ${
                opt.value === value
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
