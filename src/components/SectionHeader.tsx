interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  subline?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  headline,
  subline,
  align = "left",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-4${isCenter ? " items-center text-center" : ""}`}
    >
      <span className="eyebrow">{eyebrow}</span>

      <h2 data-split-headline>{headline}</h2>

      {subline && (
        <p
          className={`text-body mt-2${isCenter ? " max-w-2xl" : " max-w-xl"}`}
        >
          {subline}
        </p>
      )}
    </div>
  );
}
