interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2 sm:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base lg:text-lg text-white/80 dark:text-white/80 light:text-gray-700 max-w-2xl mx-auto px-4 sm:px-0">
          {subtitle}
        </p>
      )}
    </div>
  );
}
