interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white mb-4">
        {title}
      </h2>
      <p className="text-white/70 text-lg">
        {subtitle}
      </p>
    </div>
  );
}
