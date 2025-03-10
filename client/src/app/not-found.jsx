import Link from "next/link";
import Header from "@layouts/headers/Index";
import Footer from "@layouts/footers/Index";

const NotFound = () => {
  return (
    <>
      <Header layout={"default"} />

      {/* dynamic content */}
      <div id="sb-dynamic-content" className="sb-transition-fade">
        {/* banner */}
        <section className="sb-banner">
          <div className="sb-bg-1">
            <div></div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                {/* main title */}
                <div className="sb-main-title-frame">
                  <div className="sb-main-title">
                    <span className="sb-404">404</span>
                    <h1 className="sb-mb-30">Trang không tồn tại</h1>
                    <p className="sb-text sb-text-lg sb-mb-30">Chúng tôi rất tiếc vì lỗi kỹ thuật.</p>
                    {/* button */}
                    <Link href="/" className="sb-btn sb-btn-2">
                      <span className="sb-icon">
                        <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                      </span>
                      <span>Về trang chủ</span>
                    </Link>
                    {/* button end */}
                  </div>
                </div>
                {/* main title end */}
              </div>
            </div>
          </div>
        </section>
        {/* banner end */}

        <Footer layout={"default"} />
      </div>
      {/* dynamic content end */}
    </>
  );
};
export default NotFound;
