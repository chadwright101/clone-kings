"use server";

import contactData from "@/_data/general-data.json";

const {
  contact: { email, phone },
} = contactData;

export const fetchEmailAddress = async () => {
  return email;
};

export const fetchPhoneNumber = async () => {
  return phone;
};
