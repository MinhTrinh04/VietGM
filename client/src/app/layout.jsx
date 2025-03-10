import { Rubik, Monoton } from "next/font/google";
import localFont from "next/font/local";
// const rubik = Rubik({
//   weight: ['300', '400', '500', '600', '700', '800', '900'],
//   style: ['normal', 'italic'],
//   subsets: ['latin'],
//   variable: '--font-rubik',
//   display: 'swap',
// })

// const monoton = Monoton({
//   weight: ['400'],
//   subsets: ['latin'],
//   variable: '--font-monoton',
//   display: 'swap',
// })
const beVNPro = localFont({
  src: [
    {
      path: "_styles/fonts/BeVnPro/BeVietnamPro-Regular.ttf",
    },
  ],
  variable: "--font-bevnpro",
});
const lodestone = localFont({
  src: [
    {
      path: "_styles/fonts/LodeStone/iCielBC-Lodestone.ttf",
    },
  ],
  variable: "--font-lodestone",
});
const phudu = localFont({
  src: [
    {
      path: "_styles/fonts/PhuDu/Phudu-Regular.ttf",
    },
  ],
  variable: "--font-phudu",
});

import "@styles/css/plugins/bootstrap.min.css";
import "@styles/css/plugins/swiper.min.css";
import "@styles/css/plugins/font-awesome.min.css";

import { register } from "swiper/element/bundle";

register();

import "@styles/scss/style.scss";
import "./globals.css";

import ScrollbarProgress from "@layouts/scrollbar-progress/Index";

import AppData from "@data/app.json";

export const metadata = {
  title: {
    default: AppData.settings.siteName,
    template: "%s | " + AppData.settings.siteName,
  },
  description: AppData.settings.siteDescription,
};

const Layouts = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${beVNPro.variable} ${lodestone.variable} ${phudu.variable}`}
    >
      <body>
        {/* app wrapper */}
        <div className="sb-app">
          {children}

          <ScrollbarProgress />
        </div>
        {/* app wrapper end */}
      </body>
    </html>
  );
};
export default Layouts;
