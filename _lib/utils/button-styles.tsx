import classNames from "classnames";

export const buttonStyles = (
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean
) =>
  classNames(
    "bg-yellow text-black border-4 border-yellow flex text-subheading text-center py-0.5 px-4 justify-center duration-500 rounded-md min-w-[100px] cursor-pointer desktop:hover:bg-black desktop:hover:text-white",
    cssClasses,
    {
      "opacity-50 cursor-not-allowed hover:none": pending || disabled,
    }
  );
