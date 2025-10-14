interface StrainDetailsProps {
  strain: {
    type?: string;
    tac?: string;
    length?: string;
    effects?: string;
    yield?: string;
    floweringTime?: string;
    terpeneProfile?: string;
  };
  cssClasses?: string;
}

const detailConfig = [
  { key: "type", label: "Strain Type:" },
  { key: "tac", label: "TAC:" },
  { key: "length", label: "Height:" },
  { key: "effects", label: "Effects & Benefits:" },
  { key: "yield", label: "Yield:" },
  { key: "floweringTime", label: "Flowering Time:" },
  { key: "terpeneProfile", label: "Terpene Profile:" },
];

export default function StrainDetails({
  strain,
  cssClasses,
}: StrainDetailsProps) {
  return (
    <div className={cssClasses}>
      {detailConfig.map(({ key, label }) => {
        const value = strain[key as keyof typeof strain];
        if (!value) return null;

        return (
          <div key={key}>
            <h3 className="text-subheading mb-1 leading-[20px] desktop:mb-2">
              {label}
            </h3>
            <p className="leading-[140%]">{value}</p>
          </div>
        );
      })}
    </div>
  );
}
