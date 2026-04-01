import React, { useLayoutEffect, useRef, useState } from 'react';

interface TruncatedLineClampTooltipProps {
  text: string;
  lineClamp?: number;
  className?: string;
}

/**
 * 多行省略展示；仅在内容被截断时，悬停显示全文（避免短文案出现空弹层）。
 */
export const TruncatedLineClampTooltip: React.FC<TruncatedLineClampTooltipProps> = ({
  text,
  lineClamp = 2,
  className = '',
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !text.trim()) {
      const id = requestAnimationFrame(() => setTruncated(false));
      return () => cancelAnimationFrame(id);
    }
    const check = () => {
      setTruncated(el.scrollHeight > el.clientHeight + 1);
    };
    const rafId = requestAnimationFrame(check);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [text]);

  if (!text.trim()) {
    return null;
  }

  const lineClampClass =
    lineClamp === 1
      ? 'line-clamp-1'
      : lineClamp === 2
        ? 'line-clamp-2'
        : lineClamp === 3
          ? 'line-clamp-3'
          : 'line-clamp-2';

  return (
    <div className={truncated ? 'group/sum relative mb-3' : 'mb-3'}>
      <p
        ref={ref}
        className={`text-gray-500 text-sm leading-relaxed ${lineClampClass} ${className}`.trim()}
      >
        {text}
      </p>
      {truncated ? (
        <div
          role="tooltip"
          className="absolute left-0 right-0 top-full z-40 -mt-px max-h-52 overflow-y-auto rounded-lg border border-gray-200 bg-white px-3 pb-2 pt-2 text-sm leading-relaxed text-gray-700 shadow-lg opacity-0 invisible transition-opacity duration-150 group-hover/sum:visible group-hover/sum:opacity-100 pointer-events-none"
        >
          {text}
        </div>
      ) : null}
    </div>
  );
};

const tooltipPopupClass =
  'absolute z-50 max-w-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-relaxed text-gray-700 shadow-lg opacity-0 invisible transition-opacity duration-150 group-hover/et:visible group-hover/et:opacity-100 pointer-events-none';

/**
 * 单行不换行省略；仅在横向溢出时悬停显示全文。
 */
export const SingleLineEllipsisTooltip: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [truncated, setTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !text.trim()) {
      const id = requestAnimationFrame(() => setTruncated(false));
      return () => cancelAnimationFrame(id);
    }
    const check = () => setTruncated(el.scrollWidth > el.clientWidth + 1);
    const rafId = requestAnimationFrame(check);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [text]);

  if (!text.trim()) {
    return null;
  }

  return (
    <span className={truncated ? 'group/et relative block w-full min-w-0' : 'block w-full min-w-0'}>
      <span ref={ref} className={`block w-full truncate ${className}`.trim()}>
        {text}
      </span>
      {truncated ? (
        <div role="tooltip" className={`left-0 bottom-full mb-1 ${tooltipPopupClass}`}>
          {text}
        </div>
      ) : null}
    </span>
  );
};
