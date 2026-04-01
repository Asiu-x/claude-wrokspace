import { CheckCircle2, RotateCcw, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { SingleLineEllipsisTooltip } from './common/TruncatedLineClampTooltip';

interface FlipCardProps {
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  detailDescription: string;
}

// Simple Card components for FlipCard
const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className || ''}`}>{children}</div>
);

const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`p-6 ${className || ''}`}>{children}</div>
);

const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <h3 className={`font-semibold ${className || ''}`}>{children}</h3>
);

export function FlipCard({
  icon: Icon,
  title,
  category,
  description,
  features,
  image,
  detailDescription
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[380px] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Flip Container */}
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <Card
          className="absolute inset-0 backface-hidden border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden rounded-lg mx-4 mt-4">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-2.5 py-1 bg-white/90 text-gray-700 rounded-lg text-xs mb-2">
                {category}
              </span>
              <CardTitle className="text-xl text-white">{title}</CardTitle>
            </div>
            {/* Flip Hint */}
            <div className="absolute top-3 right-3 bg-white/80 rounded-full p-1.5">
              <RotateCcw className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <CardContent className="pt-4">
            <p className="text-gray-600 mb-3 leading-relaxed text-sm">
              {description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {features.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 text-xs border border-gray-200 bg-gray-50 rounded-lg"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1 text-teal-500" />
                  {feature}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          className="absolute inset-0 backface-hidden rotate-y-180 border-gray-200 overflow-visible shadow-lg bg-gradient-to-br from-teal-50 to-emerald-50"
        >
          <CardContent className="h-full min-h-0 flex flex-col p-5">
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-lg text-xs">
                  {category}
                </span>
              </div>
            </div>

            {/* Detail Description */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <h4 className="font-medium text-sm text-gray-600 mb-2">详细说明</h4>
              <p className="text-sm text-gray-900 leading-relaxed">
                {detailDescription}
              </p>
            </div>

            {/* Features */}
            <div className="mt-3 shrink-0 border-t border-gray-200 pt-3">
              <h4 className="font-medium text-sm text-gray-600 mb-2">核心功能</h4>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex min-w-0 items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-500" />
                    <div className="min-w-0 flex-1">
                      <SingleLineEllipsisTooltip text={feature} className="text-xs text-gray-900" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flip Back Hint */}
            <div className="mt-3 flex shrink-0 items-center justify-center gap-1 pb-0.5 text-xs text-gray-500">
              <RotateCcw className="h-3 w-3 shrink-0" />
              <span className="shrink-0">点击翻转回正面</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
