"use client";

import Link from "next/link";
import { useState } from "react";

import classNames from "classnames";

import { fetchPhoneNumber } from "@/_actions/contact-actions";

import { showContactProps } from "@/_types/general-types";

const ShowPhoneNumber = ({ buttonClasses, linkClasses }: showContactProps) => {
  const [showPhone, setShowPhone] = useState("Show phone number");
  const [showSpinnerPhone, setShowSpinnerPhone] = useState(false);

  const handleShowPhoneNumbers = async () => {
    setShowSpinnerPhone(true);
    const phoneNumber = (await fetchPhoneNumber()) || "Phone number not found";
    setShowPhone(phoneNumber);
    setShowSpinnerPhone(false);
  };

  if (showPhone === "Show phone number") {
    return (
      <button
        onClick={() => handleShowPhoneNumbers()}
        className={classNames(
          "px-2 text-left -mx-2 text-paragraph text-yellow py-3 -my-3 hover:tablet:opacity-80 hover:cursor-pointer desktop:p-0 desktop:m-0 italic",
          buttonClasses
        )}
        aria-label="Show phone number"
      >
        {showSpinnerPhone ? <div className="spinner-yellow"></div> : showPhone}
      </button>
    );
  } else {
    return (
      <Link
        href={`tel:${showPhone}`}
        className={classNames(
          "py-3 text-left px-2 -my-3 -mx-2 text-paragraph text-yellow tablet:hover:opacity-80 desktop:p-0 desktop:m-0",
          linkClasses
        )}
      >
        {showPhone}
      </Link>
    );
  }
};

export default ShowPhoneNumber;
