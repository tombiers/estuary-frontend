import { Locales } from "./locales";

import de from "./de.json";
import en from "./en.json";

export const messages = {
  [Locales.DE]: de,
  [Locales.EN]: en
};

export const defaultLocale = Locales.DE;