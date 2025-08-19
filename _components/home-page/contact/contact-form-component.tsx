"use client";

import { useEffect, useState } from "react";

import classNames from "classnames";

import Recaptcha from "@/_lib/recaptcha";
import { sendEmail } from "@/_actions/send-email-actions";
import ButtonType from "@/_components/ui/buttons/button-type";

const ContactFormComponent = () => {
  const [submissionStartTime, setSubmissionStartTime] = useState(0);
  const [validateRecaptcha, setValidateRecaptcha] = useState(false);
  const [showEmailSubmitted, setShowEmailSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const startSubmissionTimer = () => {
      setSubmissionStartTime(new Date().getTime());
    };
    startSubmissionTimer();
    if (showEmailSubmitted) {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [showEmailSubmitted]);

  const handleRecaptchaChange = (value: any) => {
    if (value === null) {
      setValidateRecaptcha(false);
      console.log("Recaptcha expired");
    } else {
      const elapsedTime = new Date().getTime() - submissionStartTime;
      if (elapsedTime < 3000) {
        console.error("Form submitted too quickly. Possible bot activity.");
        return;
      } else {
        setValidateRecaptcha(!!value);
      }
    }
  };

  return (
    <div className="bg-yellow px-5 py-10 -mx-5 tablet:mx-0 tablet:py-5">
      {!showEmailSubmitted && (
        <p className="mb-8 text-black italic font-light">
          Fill out the form below and our team will get back to you ASAP...
        </p>
      )}
      {showEmailSubmitted ? (
        <>
          <p className="text-[20px] text-center text-black tablet:text-left pb-5">
            Your email has been sent, we will be in touch soon.
          </p>
        </>
      ) : (
        <form
          className="flex flex-col gap-8"
          action={async (formData) => {
            await sendEmail(formData);
            setShowEmailSubmitted(true);
          }}
        >
          <input type="hidden" name="_honey" className="hidden" />
          <label
            htmlFor="emailAddress"
            className="grid gap-2 text-subheading text-black"
          >
            Email:
            <input
              type="email"
              id="emailAddress"
              name="email"
              className="bg-white px-2 py-3 rounded-md font-light text-black/75 border-none"
              placeholder="Type your email address here..."
              autoComplete="email"
              required
            />
          </label>
          <label
            htmlFor="fullName"
            className="grid gap-2 text-subheading text-black"
          >
            Name:
            <input
              type="text"
              id="fullName"
              name="name"
              className="bg-white px-2 py-3 rounded-md font-light text-black/75 border-none"
              placeholder="Type your full name here..."
              autoComplete="name"
              required
            />
          </label>
          <label
            htmlFor="phoneNumber"
            className="grid gap-2 text-subheading text-black"
          >
            Phone:
            <input
              type="tel"
              id="phoneNumber"
              name="phone"
              className="bg-white px-2 py-3 rounded-md font-light text-black/75 border-none"
              placeholder="Type your phone number here..."
              autoComplete="phone"
            />
          </label>

          {!showMessage ? (
            <ButtonType
              type="button"
              cssClasses="bg-black text-white text-subheading px-4 py-2 rounded-md w-full tablet:self-start"
              onClick={() => setShowMessage(true)}
              colorBlack
            >
              Next
            </ButtonType>
          ) : (
            <>
              <label
                htmlFor="message"
                className="grid gap-2 text-subheading text-black"
              >
                Message:
                <textarea
                  id="message"
                  name="message"
                  className="bg-white px-2 py-3 rounded-md font-light text-black/75 border-none"
                  rows={5}
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </label>
              <ButtonType
                type="submit"
                cssClasses={classNames({
                  "opacity-75 desktop:cursor-not-allowed": !validateRecaptcha,
                  "hover:desktop:opacity-90": validateRecaptcha,
                })}
                colorBlack
                disabled={!validateRecaptcha}
              >
                Submit
              </ButtonType>
              {!validateRecaptcha && (
                <Recaptcha onChange={handleRecaptchaChange} />
              )}
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default ContactFormComponent;
