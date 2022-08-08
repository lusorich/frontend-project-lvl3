// @ts-check
import i18next from "i18next";
import resources from "./locales";
import { formOnChange } from "./form/helpers.js";
import formInit from "./form/form.js";
import { setLocale } from "yup";

export default () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init(
    {
      lng: "ru",
      debug: true,
      resources: {
        ru: resources.ru,
      },
    },
    (err, t) => {
      if (err) return console.log("something went wrong loading", err);
      t("key");
    }
  );

  setLocale({
    string: {
      url: i18nextInstance.t("errorValidationMsg"),
    },
    mixed: {
      notOneOf: i18nextInstance.t("errorDuplicateMsg"),
    },
  });

  formInit({ formOnChange });
};
