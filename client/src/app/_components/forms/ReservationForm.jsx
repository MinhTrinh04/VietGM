"use client";

import { Formik } from 'formik';
import { useState } from 'react';
import Link from "next/link";

const ReservationForm = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  return (
    <>
      <Formik
        initialValues={{ name: '', email: '', tel: '', time: '', person: 1, note: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const requestBody = {
            name: values.name,
            email: values.email,
            tel: values.tel,
            time: values.time,
            person: values.person,
            note: values.note,
            check: false, // Thêm trường "check" với giá trị mặc định là false
          };

          fetch('http://localhost:3001/api/vgm/reservations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          })
            .then(response => {
              if (!response.ok) {
                return response.text().then(text => {
                  throw new Error('API error: ' + text);
                });
              }
              return response.json();
            })
            .then(data => {
              setStatusMessage("Đặt bàn thành công! Cảm ơn bạn đã đặt bàn.");
              setIsSuccessful(true);

              setTimeout(() => {
                window.location.href = '/';
              }, 3000);
            })
            .catch(error => {
              console.error('Error:', error);
              setStatusMessage("Oops! Có lỗi khi gửi form.");
              setIsSuccessful(false);
            });

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} id="reservationForm">
            <div className="row">
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="text"
                    placeholder=" "
                    name="name"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <span className="sb-bar"></span>
                  <label>Họ và tên</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="email"
                    placeholder=" "
                    name="email"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <span className="sb-bar"></span>
                  <label>Email</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="tel"
                    placeholder=" "
                    name="tel"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tel}
                  />
                  <span className="sb-bar"></span>
                  <label>Số điện thoại</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="text"
                    placeholder=" "
                    name="time"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.time}
                  />
                  <span className="sb-bar"></span>
                  <label>Ngày và giờ (DD/MM - HH)</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="number"
                    placeholder=" "
                    name="person"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.person}
                    min={1}
                    max={6}
                  />
                  <span className="sb-bar"></span>
                  <label>Số lượng</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <textarea
                    placeholder=" "
                    name="note"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.note}
                  />
                  <span className="sb-bar"></span>
                  <label>Ghi chú</label>
                </div>
              </div>
            </div>

            <button type="submit" className="sb-btn sb-cf-submit sb-show-success">
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
              <span>Đặt bàn</span>
            </button>
          </form>
        )}
      </Formik>

      <div id="reservationFormStatus" style={{ opacity: isSuccessful ? 1 : 0, pointerEvents: 'auto' }}>
        <h5>{statusMessage}</h5>
      </div>
    </>
  );
};

export default ReservationForm;
