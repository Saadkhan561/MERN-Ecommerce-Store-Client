import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React from "react";
import { useRouter } from "next/router";
import PaymentOption from "@/components/paymentOption";

const Layout = ({ children }) => {
  const router = useRouter();
  const paymentOptionDiv = () => {
    if (router.query.payment) {
      return <PaymentOption />;
    }
  };
  return (
    <div>
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        <Navbar />
        <div className={router.query.payment? "flex-1 opacity-50 duration-200":"flex-1"}>{children}</div>
        <div className="absolute top-0">{paymentOptionDiv()}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
