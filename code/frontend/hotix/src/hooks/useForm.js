import { useState, useEffect } from "react";

export const useForm = (initialForm, initialValues) => {
  const [form, setForm] = useState(initialForm || {});
  const [fieldsValid, setfieldsValid] = useState(initialValues || {});
  const [isValid, setIsValid] = useState(true);

  const handleFormChange = (event, newValue, title) => {
    if (!title) {
      title = event.target.name;
      if (event.target.name === "image") newValue = event.target.files[0];
      else newValue = event.target.value;
    } else {
      // section of home screen (Date)
      if (title === "Date") {
        newValue = checkIsDateValid(newValue);
      }
    }

    if (title === "cardNumber") {
      // section of payment screen
      setForm({ ...form, [title]: newValue, cardType: getCardType(newValue) });
    } else {
      setForm({ ...form, [title]: newValue });
    }
    setfieldsValid({ ...fieldsValid, [title]: !!newValue });
  };

  useEffect(() => {
    if (initialForm) {
      setIsValid(
        Object.values(fieldsValid).every((value) => value) ? false : true
      );
    } else {
      setIsValid(
        Object.values(fieldsValid).every((value) => !value) ? true : false
      );
    }
  }, [fieldsValid]);

  return {
    handleFormChange,
    form,
    isValid,
  };
};

///////////////////////////  helper functions for home screen ///////////////////////////

function formatDate(day, month, year) {
  month += 1;
  if (month > 12) {
    month = 1;
  }
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

const checkIsDateValid = (newValue) => {
  newValue = formatDate(newValue.$D, newValue.$M, newValue.$y);
  if (newValue === "NaN-NaN-NaN") return null;
  else return newValue;
};

///////////////////////////  helper functions for payment screen ///////////////////////////

const getCardType = (cardNumber) => {
  if (cardNumber[0] === "4") {
    return "Visa";
  } else if (checkSubstring(4, "6011", cardNumber)) {
    return "Discover";
  } else if (checkSubstring(2, "51", cardNumber)) {
    return "MasterCard";
  } else if (checkSubstring(2, "34", cardNumber)) {
    return "AmericanExpress";
  } else if (checkSubstring(3, "300", cardNumber)) {
    return "DinersClub";
  } else if (checkSubstring(2, "35", cardNumber)) {
    return "JCB";
  } else {
    return "";
  }
};

const checkSubstring = (length, match, cardNumber) => {
  return cardNumber.substring(0, length) === match;
};
