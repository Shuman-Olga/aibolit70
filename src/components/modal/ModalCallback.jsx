import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSchema } from "./formShema";
import Icon from "../common/Icon";

export default function ModalCallback() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const onSubmit = async (data) => {
    // console.log(errors, isSubmitSuccessful);
    await emailjs
      .send("service_3v0hnkn", "template_9mfgw27", data, "PhUOVu-NXcTpMJR7t")
      .then((response) => {
        if (response.status === 200) {
          setMessage("Сообщение отправлено!");
        }
        reset();
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((err) => {
        // console.log("Упс! Ошибочка...", err);
      });
  };

  useEffect(() => {
    setFocus("user_name");
  }, [setFocus]);

  return (
    <div id="modalcallback">
      <div className="callback-bt" onClick={handleShow}>
        <div className="text-call">
          <Icon name="telephone" size={18} />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Оставьте номер телефона, мы перезвоним:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="form-group mb-3">
                <input
                  id="name"
                  placeholder="Имя*"
                  name="user_name"
                  type="text"
                  {...register("user_name")}
                  className={`form-control ${
                    errors.user_name ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.user_name?.message}
                </div>
              </div>
              <div className="form-group mb-3">
                <input
                  id="phone"
                  placeholder="Телефон*"
                  name="user_phone"
                  type="text"
                  {...register("user_phone")}
                  className={`form-control ${
                    errors.user_phone ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.user_phone?.message}
                </div>
              </div>
              <div className="form-group mb-3">
                <textarea
                  s="textarea"
                  placeholder="Сообщение"
                  style={{ height: "100px" }}
                  id="message"
                  {...register("message")}
                  className="form-control "
                />
              </div>
              <div className="form-group form-check mb-3">
                <input
                  name="accept"
                  type="checkbox"
                  defaultChecked={true}
                  {...register("accept")}
                  className={`form-check-input ${
                    errors.accept ? "is-invalid" : ""
                  }`}
                />
                <label htmlFor="accept" className="form-check-label">
                  Вы даете{" "}
                  <a
                    href="/docs/soglasie-na-obrabotku-personalnyh-dannyh-klientov-fizicheskih-lic.pdf"
                    target="_blank"
                    rel="noopener noreferrer">
                    согласие
                  </a>{" "}
                  на обработку{" "}
                  <a
                    href="/docs/politika-obrabotki-personalnyh-dannyh-ooo-ajbolit.pdf"
                    target="_blank"
                    rel="noopener noreferrer">
                    персональных данных
                  </a>{" "}
                  .
                </label>
                <div className="invalid-feedback">{errors.accept?.message}</div>
              </div>
              <button className="btn btn-primary mt-3" type="submit">
                Отправить
              </button>
            </div>
            {isSubmitSuccessful && (
              <div className="form-group mt-2">
                <div
                  className={
                    isSubmitSuccessful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert">
                  {message}
                </div>
              </div>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
