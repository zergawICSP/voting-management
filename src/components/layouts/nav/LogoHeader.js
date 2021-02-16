import React from 'react'

// IMAGE IMPORT
import CompanyLogo from "../../../assets/images/Zergaw ISP Logo.png";

export default function LogoHeader() {
    return (
      <div>
        <div className="px-10 flex flex-row space-x-5 items-center">
          <img src={CompanyLogo} alt="Zergaw ISP Logo" className="w-16" />
          <div className="flex flex-col space-y-1 text-left leading-none">
            <span className="text-white text-xs">POWERED BY</span>
            <span className="text-companyYello font-bold text-md">Zergaw ISP</span>
          </div>
        </div>
      </div>
    );
}
