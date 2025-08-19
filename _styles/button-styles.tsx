import classNames from "classnames";

export const buttonStyles = (
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean,
  colorBlack?: boolean
) =>
  classNames(
    "border-4 flex text-subheading text-center py-0.5 px-4 justify-center duration-500 rounded-md min-w-[100px] cursor-pointer",
    cssClasses,
    {
      "opacity-50 cursor-not-allowed hover:none": pending || disabled,
      "bg-black border-black text-white": colorBlack,
      "bg-yellow border-yellow text-black": !colorBlack,
      "desktop:hover:bg-black desktop:hover:text-white":
        !colorBlack && !(disabled || pending),
      "desktop:hover:bg-yellow desktop:hover:text-black":
        colorBlack && !(disabled || pending),
    }
  );
