import * as Yup from "yup";

const phoneRegex = new RegExp(/^(\+7|8)\d{10}$/);

export const validationSchema = Yup.object().shape({
  user_name: Yup.string()
    .trim()
    .min(2, "Минимум 2 символа")
    .required("Укажите ваше имя"),
  user_phone: Yup.string()
    .transform((value) => value.replace(/\s+/g, ""))
    .matches(phoneRegex, "Некорректный номер телефона")
    .required("Укажите ваш номер телефона"),
  address: Yup.string()
    .trim()
    .max(255, "Слишком длинный адрес")
    .nullable()
    .notRequired(),
  doctor: Yup.string().nullable().notRequired(),
  message: Yup.string()
    .trim()
    .max(500, "Сообщение слишком длинное")
    .nullable()
    .notRequired(),
  accept: Yup.bool().oneOf([true], "Необходимо ваше согласие перед отправкой"),
});
