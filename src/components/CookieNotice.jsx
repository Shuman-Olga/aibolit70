import React from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";

export default function CookieNotice() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Принимаю"
      cookieName="myWebsiteCookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}>
      Мы используем cookie. Это позволяет нам анализировать взаимодействие
      посетителей с сайтом и делать его лучше. Продолжая пользоваться сайтом, вы
      автоматически соглашаетесь с использованием данных технологий и даете{" "}
      <a
        href="/docs/politika-obrabotki-personalnyh-dannyh-ooo-ajbolit.pdf"
        style={{ color: "#f5e042" }}
        target="_blank"
        rel="noopener noreferrer">
        {" "}
        согласие на обработку персональных данных
      </a>{" "}
    </CookieConsent>
  );
}
