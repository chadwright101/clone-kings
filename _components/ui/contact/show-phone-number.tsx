"use client";

import Link from "next/link";
import { useState } from "react";

import classNames from "classnames";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { fetchPhoneNumber } from "@/_actions/contact-actions";
import { showContactProps } from "@/_types/general-types";

const ShowPhoneNumber = ({ buttonClasses, linkClasses }: showContactProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showPhone, setShowPhone] = useState("Show phone number");
  const [showSpinnerPhone, setShowSpinnerPhone] = useState(false);

  const handleShowPhoneNumbers = async () => {
    setShowSpinnerPhone(true);
    
    try {
      let recaptchaToken: string | undefined;
      
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("fetch_phone");
      }
      
      const phoneNumber = (await fetchPhoneNumber(recaptchaToken)) || "Phone number not found";
      setShowPhone(phoneNumber);
    } catch (error) {
      console.error("Error fetching phone:", error);
      setShowPhone("Phone not available");
    }
    
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
