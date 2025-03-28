
import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title="Privacy Policy - Online Nepal 2024">
      <div className="row contactus mt-2">
        <div className="col-md-6">
          <img
            src="images/policy.jpg"
            alt="cantactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Privacy Policy</h1>
          <p className="text-justify mt-2">
            <b>
              <i>"Safeguarding Your Privacy, Enhancing Your Experience"</i>
            </b>
          </p>
          <ul className="mt-3">
            <li>
              <b>Data Collection:</b> We collect essential details to process
              orders & enhance your experience.
            </li>
            <li>
              <b>Sharing:</b> We don't share data to any third parties for
              payments, delivery & compliance.
            </li>
            <li>
              <b>Children's Privacy:</b> We do not collect data from minors
              without parental consent.
            </li>
            <li>
              <b>Policy Updates:</b> Changes will be notified to users.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
