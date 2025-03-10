
import AppData from "@data/app.json";

import Link from "next/link";

import ReservationForm from "@components/forms/ReservationForm";
import ContactInfoSection from "@components/sections/ContactInfo";
import ContactMapSection from "@components/sections/ContactMap";

export const metadata = {
  title: {
		default: "Reservation",
	},
  description: AppData.settings.siteDescription,
}

const Reservation = () => {
  return (
    <>
      {/* banner */}
      <section className="sb-banner sb-banner-color">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              {/* main title */}
              <div className="sb-main-title-frame">
                <div className="sb-main-title">
                  
                  <h1 className="sb-mb-30">Bữa ăn của bạn <br/>sẽ rất tuyệt!</h1>
                  <p className="sb-text sb-text-lg sb-mb-30">Hãy đặt bàn tại chỗ chúng tôi</p>

                  <ul className="sb-breadcrumbs">
                    <li><Link href="/">Trang chủ</Link></li>
                    <li><Link href="/reservation">Đặt bàn</Link></li>
                  </ul>
                </div>
              </div>
              {/* main title end */}
            </div>
            <div className="col-lg-5">
              <div className="sb-contact-form-frame">
                <div className="sb-illustration-9">
                  <img src="/img/illustrations/reservation.png" alt="envelope" className="sb-envelope-1 fix" />

                  <div className="sb-cirkle-1"></div>
                  <div className="sb-cirkle-2"></div>
                  <div className="sb-cirkle-3"></div>
                </div>
                <div className="sb-form-content">
                  <div className="sb-main-content">
                    <h3 className="sb-mb-30">Chi tiết đặt bàn</h3>
                    
                    <ReservationForm />
                  </div>
                  <div className="sb-success-result" id="reservationFormStatus">
                    <img src="/img/ui/success.jpg" alt="success" className="sb-mb-15" />
                    <div className="sb-success-title sb-mb-15">Thành công!</div>
                    <p className="sb-text sb-mb-15">Thông tin của bạn đã được gửi đi <br/>thành công!</p>
                    
                    {/* button */}
                    <Link href="/" className="sb-btn sb-btn-2">
                      <span className="sb-icon">
                        <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                      </span>
                      <span>Quay lại trang chủ</span>
                    </Link>
                    {/* button end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* banner end */}

      <ContactInfoSection />

      <ContactMapSection />
    </>
  );
};
export default Reservation;