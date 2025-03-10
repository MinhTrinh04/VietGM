import AppData from "@data/app.json";
import Link from "next/link";

const MiniSidebar = () => {
  return (
    <>
      <div className="sb-infobar-content">
        <div className="sb-ib-title-frame sb-mb-30">
          <h4>Thông tin</h4>
          <i className="fas fa-arrow-down"></i>
        </div>
        <ul className="sb-list sb-mb-30">
          <li>
            <b>Địa chỉ:</b>
            <span>Số 1 Đại Cồ Việt</span>
          </li>
          <li>
            <b>Giờ mở cửa:</b>
            <span>09:00 - 23:00</span>
          </li>
          <li>
            <b>Điện thoại:</b>
            <span>+0999888777</span>
          </li>
          <li>
            <b>Email:</b>
            <span>Vietgourmet@mail.com</span>
          </li>
        </ul>
        {/* <div className="sb-ib-title-frame sb-mb-30">
          <h4>Instagram</h4>
          <i className="fas fa-arrow-down"></i>
        </div>
        <ul className="sb-instagram sb-mb-30">
          {AppData.instagram.map((item, key) => (
            <li key={`mini-sidebar-inst-item-${key}`}>
              <a href={item.link} target="_blank">
                <img src={item.image} alt={item.title} />
              </a>
            </li>
          ))}
        </ul> */}
        <hr />
        {/* Bỏ phần Latest publications */}
      </div>
      <div className="sb-info-bar-footer">
        <ul className="sb-social">
          {AppData.social.map((item, key) => (
            <li key={`mini-sidebar-social-item-${key}`}>
              <a href={item.link} target="_blank" title={item.title}>
                <i className={item.icon}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MiniSidebar;
