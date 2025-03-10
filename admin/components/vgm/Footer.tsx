// *********************
// Role of the component: Footer component
// Name of the component: Footer.tsx
// Version: 1.0
// Component call: <Footer />
// Input parameters: no input parameters
// Output: Footer component
// *********************

import { navigation } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';

const Footer = () => {
  return (
    <footer className="bg-red-700 text-slate-100" aria-labelledby="footer-heading">
      <div>
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="footer">
          {/* <div className="xl:grid xl:grid-cols-2 xl:gap-8"> */}
          <div>
            <div className="flex items-center justify-center">
              <CopyrightOutlinedIcon /> VietGourmet. All rights reserved.
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
