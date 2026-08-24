"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationSchema = void 0;

var Yup = _interopRequireWildcard(require("yup"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var phoneRegex = new RegExp(/^(\+7|8)\d{10}$/);
var validationSchema = Yup.object().shape({
  user_name: Yup.string().trim().min(2, "Минимум 2 символа").required("Укажите ваше имя"),
  user_phone: Yup.string().transform(function (value) {
    return value.replace(/\s+/g, "");
  }).matches(phoneRegex, "Некорректный номер телефона").required("Укажите ваш номер телефона"),
  address: Yup.string().trim().max(255, "Слишком длинный адрес").nullable().notRequired(),
  doctor: Yup.string().nullable().notRequired(),
  message: Yup.string().trim().max(500, "Сообщение слишком длинное").nullable().notRequired(),
  accept: Yup.bool().oneOf([true], "Необходимо ваше согласие перед отправкой")
});
exports.validationSchema = validationSchema;