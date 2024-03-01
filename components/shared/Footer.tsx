import React from "react";

const Footer = () => {
  return (
    <div className="border-t-1 border-divider fx-b py-10 pxs mfc">
      <div className="fx-col">
        <p>Lets Talk</p>
        <h6 className="h6">support@mwai@gmail.com</h6>
        <h3 className="h3">© 2023 All rights reserved for mwai.co</h3>
      </div>
      <div className="fx-col gap-3">
        <h6 className="h6">Or follow us on</h6>
        <div className="fx-col">
          {/* facebook,twitter i, intagram */}
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
