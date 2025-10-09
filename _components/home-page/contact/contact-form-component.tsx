"use client";

import { useEffect, useState } from "react";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { sendEmail } from "@/_actions/send-email-actions";
import ButtonType from "@/_components/ui/buttons/button-type";

const ContactFormComponent = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submissionStartTime, setSubmissionStartTime] = useState(0);
  const [showEmailSubmitted, setShowEmailSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div className="bg-yellow rounded-md px-5 py-10 -mx-5 tablet:mx-0 tablet:py-5">
      {!showEmailSubmitted && (
        <p className="mb-8 text-black italic font-light">
          Fill out the form below and our team will get back to you ASAP...
        </p>
      )}
      {showEmailSubmitted ? (
        <div className="size-full flex justify-center items-center desktop:h-[450px]">
          <p className="text-[20px] font-bold text-black pb-5">
            Your email has been sent, we will be in touch soon.
          </p>
        </div>
      ) : (
        <form
          className="flex flex-col gap-8"
          action={async (formData) => {
            try {
              setError(null);
              setIsSubmitting(true);

              if (!executeRecaptcha) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                if (!executeRecaptcha) {
                  setError(
                    "Security verification unavailable. Please refresh the page and try again."
                  );
                  return;
                }
              }

              const recaptchaToken = await executeRecaptcha("contact_form");
              formData.append("recaptchaToken", recaptchaToken);

              const result = await sendEmail(formData);

              if (result.success) {
                setShowEmailSubmitted(true);
              } else {
                setError(
                  result.error || "Failed to send message. Please try again."
                );
              }
            } catch (err) {
              setError("An unexpected error occurred. Please try again.");
              console.error("Contact form error:", err);
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <input
            type="text"
            name="_honey"
            className="visually-hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <label
            htmlFor="emailAddress"
            className="grid gap-2 text-paragraph font-medium text-black"
          >
            Email:
            <input
              type="email"
              id="emailAddress"
              name="email"
              className="bg-white px-4 py-3 rounded-md font-light text-black border-none"
              autoComplete="email"
              required
            />
          </label>
          <label
            htmlFor="fullName"
            className="grid gap-2 text-paragraph font-medium text-black"
          >
            Name:
            <input
              type="text"
              id="fullName"
              name="name"
              className="bg-white px-4 py-3 rounded-md font-light text-black border-none"
              autoComplete="name"
              required
            />
          </label>
          <label
            htmlFor="phoneNumber"
            className="grid gap-2 text-paragraph font-medium text-black"
          >
            Phone:
            <input
              type="tel"
              id="phoneNumber"
              name="phone"
              className="bg-white px-4 py-3 rounded-md font-light text-black border-none"
              autoComplete="phone"
            />
          </label>

          {!showMessage ? (
            <ButtonType
              type="button"
              cssClasses="bg-black text-white text-paragraph font-medium px-4 py-2 rounded-md w-full tablet:self-start"
              onClick={() => setShowMessage(true)}
              colorBlack
            >
              Next
            </ButtonType>
          ) : (
            <>
              <label
                htmlFor="message"
                className="grid gap-2 text-paragraph font-medium text-black"
              >
                Message:
                <textarea
                  id="message"
                  name="message"
                  className="bg-white px-4 py-3 rounded-md font-light text-black border-none"
                  rows={5}
                  required
                ></textarea>
              </label>
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3">
                  <p className="text-[14px] text-red-600">{error}</p>
                </div>
              )}
              <ButtonType type="submit" colorBlack disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </ButtonType>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default ContactFormComponent;
