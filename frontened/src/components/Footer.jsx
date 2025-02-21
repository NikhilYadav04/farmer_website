import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="flex flex-row items-center justify-between mx-10 my-5">
          <div className="flex flex-row items-center justify-center">
            <p className="text-lg font-bold">Team</p>
            <p className="mr-4 ml-10 my-5">
              <a href="/">Help</a>
            </p>
            <p className="mx-4 my-5">Privacy</p>
            <p className="mx-4 my-5">Terms</p>
          </div>
          <p>© 2024 Web-Developer. All Right Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
