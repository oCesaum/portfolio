interface SectionNumberProps {
  index: number;
}

export default function SectionNumber({ index }: SectionNumberProps) {
  const padded = index.toString().padStart(2, "0");
  return (
    <span className="font-mono text-sm text-[var(--color-foreground-muted)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
      {padded}
    </span>
  );
}
