import { useFormStatus } from "react-dom";
import { ButtonProps } from "@/_types/button-types";
import { buttonStyles } from "@/_styles/button-styles";

const ButtonType = ({
  children,
  onClick,
  cssClasses,
  type = "submit",
  disabled = false,
  colorBlack = false,
  ariaLabel,
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={buttonStyles(cssClasses, disabled, pending, colorBlack)}
      disabled={disabled || pending}
      style={{ fontVariant: "small-caps" }}
    >
      {pending && type === "submit" ? (
        <div className="py-[3px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default ButtonType;
