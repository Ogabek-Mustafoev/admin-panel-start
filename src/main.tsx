import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";

import { App } from "@/app";
import { store } from "@/store";
import { Providers } from "@/providers";

import uz from "@/locales/uz.json";
import ru from "@/locales/ru.json";
import en from "@/locales/en.json";

import "@/style/index.css";
import "@/style/global.scss";

void i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: "ru",
  defaultNS: "form",
  appendNamespaceToCIMode: false,
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
  resources: { en, ru, uz },
  lng: localStorage.getItem("lng") ?? "uz",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Providers>
        <App />
      </Providers>
    </Provider>
  </StrictMode>,
);
