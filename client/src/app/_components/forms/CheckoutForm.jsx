"use client";

import { Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Hàm lấy giỏ hàng từ localStorage
export const getCart = () => {
  try {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const cart = JSON.parse(cartData);

      // Tính toán tổng giá trị giỏ hàng
      const totalPrice = cart.items.reduce((total, item) => {
        return total + formatPrice(item.price) * item.quantity;
      }, 0);

      return { ...cart, totalPrice };
    } else {
      return { items: [], totalPrice: 0 };
    }
  } catch (error) {
    console.error("Error getting cart from localStorage:", error);
    return { items: [], totalPrice: 0 };
  }
};

// Hàm format giá
export const formatPrice = (price) => {
  if (typeof price === "string" && price.includes("K")) {
    return parseFloat(price.replace("K", "")) * 1000;
  }
  return parseFloat(price) || 0;
};

const CheckoutForm = () => {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          address: "",
          tel: "",
          email: "",
          message: "",
          payment_method: 1,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Bắt buộc";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Địa chỉ email không hợp lệ";
          }
          if (!values.name) {
            errors.name = "Bắt buộc";
          }
          if (!values.tel) {
            errors.tel = "Bắt buộc";
          }
          if (!values.address) {
            errors.address = "Bắt buộc";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const cart = getCart();

            const orderData = {
              customerName: values.name,
              customerAddress: values.address,
              customerTel: values.tel,
              customerEmail: values.email,
              orderItems: cart.items,
              totalPrice: cart.totalPrice,
              paymentMethod: values.payment_method,
              note: values.message,
            };

            const response = await fetch(
              "http://localhost:3001/api/vgm/orders",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
              }
            );

            if (response.ok) {
              toast.success("Đặt hàng thành công! Bạn đang được đưa về trang chủ!");

              setSubmitting(false);
              resetForm();
              localStorage.removeItem("cart");
              setTimeout(() => {
                router.push("/"); 
              }, 1500);
            } else {
              const errorData = await response.json();
              toast.error(
                errorData.message || "Có lỗi xảy ra khi đặt hàng"
              );
            }
          } catch (error) {
            console.error("Error creating order:", error);
            toast.error("Có lỗi xảy ra khi đặt hàng");
          }
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
          <form onSubmit={handleSubmit} id="checkoutForm" className="sb-checkout-form">
              <div className="sb-mb-30">
              <h3>Chi tiết thanh toán</h3>
            </div>
            <div className="col-lg-6">
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
                <label>Họ tên</label>
                {errors.name && touched.name && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    {errors.name}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="sb-group-input">
                <input 
                  type="text" 
                  placeholder=" "
                  name="address" 
                  required="required" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address} 
                />
                <span className="sb-bar"></span>
                <label>Địa chỉ</label>
                {errors.address && touched.address && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    {errors.address}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-6">
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
                {errors.tel && touched.tel && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    {errors.tel}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-6">
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
                {errors.email && touched.email && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="sb-mb-30">
              <h3>Thông tin bổ sung</h3>
            </div>
            <div className="sb-group-input">
              <textarea 
                placeholder=" "
                name="message" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message} 
              />
              <span className="sb-bar"></span>
              <label>Ghi chú đơn hàng</label>
            </div>
            {/* <div className="sb-mb-30">
              <h3 className="sb-mb-30">Phương thức thanh toán</h3>
              <ul>
                <li className="sb-radio">
                  <input 
                    type="radio" 
                    id="option-1" 
                    name="payment_method" 
                    defaultChecked 
                    value="1" 
                    onChange={handleChange} 
                  />
                  <label htmlFor="option-1">Chuyển khoản ngân hàng</label>
                  <div className="sb-check"></div>
                </li>
                <li className="sb-radio">
                  <input 
                    type="radio" 
                    id="option-2" 
                    name="payment_method" 
                    value="2" 
                    onChange={handleChange} 
                  />
                  <label htmlFor="option-2">Thanh toán tiền mặt</label>
                  <div className="sb-check"></div>
                </li>
              </ul>
            </div> */}
            {/* button */}
            <button type="submit" className="sb-btn sb-m-0" disabled={isSubmitting}>
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
              <span>Đặt hàng</span>
            </button>
            {/* button end */}

            <div id="checkoutFormStatus" className="form-status"></div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CheckoutForm;