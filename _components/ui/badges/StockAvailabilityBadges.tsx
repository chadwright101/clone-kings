interface StockAvailabilityBadgesProps {
  inStock: boolean;
}

const StockAvailabilityBadges = ({ inStock }: StockAvailabilityBadgesProps) => {
  if (inStock) {
    return (
      <div className="bg-yellow flex items-center justify-center px-2 border-4 border-yellow  rounded-md">
        <p
          className="text-black text-[14px] text-subheading"
          style={{ fontVariant: "small-caps" }}
        >
          In Stock
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-yellow flex items-center justify-center px-1 rounded-md">
      <p
        className="text-black text-[14px] text-subheading"
        style={{ fontVariant: "small-caps" }}
      >
        Out of Stock
      </p>
    </div>
  );
};

export default StockAvailabilityBadges;