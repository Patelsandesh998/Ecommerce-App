import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us-Online Nepal 2024"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="images/about.jpeg"
            alt="cantactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT</h1>
          <p className="text-justify mt-2">
            <b>Online Nepal 2024 E-commerce App</b> is a modern platform
            designed to transform online shopping in Nepal. It connects local
            vendors with customers, offering a wide range of products, from
            electronics to household goods. With a user-friendly interface for
            easy navigation and secure payment options, including digital
            wallets and bank transfers, the app ensures safe and seamless
            transactions. Customers can track their orders in real time, and the
            focus on local businesses promotes Nepali products to a wider
            audience. Overall, the app aims to provide a secure, convenient, and
            accessible shopping experience for all users.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
