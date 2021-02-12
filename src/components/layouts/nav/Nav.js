import React from "react";

// EXTERNAL IMPORTS
import { FiSearch } from "react-icons/fi";
import { FaVoteYea } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdViewAgenda } from "react-icons/md";
import { BiUser } from "react-icons/bi";

// COMPONENT IMPORT
import LogoHeader from "./LogoHeader";

export default function Nav() {
  return (
    <div className="flex flex-row w-screen py-4 justify-between">
      <LogoHeader />
      <div className="m-auto">
        {localStorage.getItem("isAdmin") === "1" ? (
          <div className="flex flex-row space-x-28 -ml-28">
            <NavLink
              to="/admin"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <AiOutlineUserAdd
                size="30"
                className="group-hover:text-white text-companyYello"
              />
            </NavLink>
            <NavLink
              to="/init_vote"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <MdViewAgenda
                size="30"
                className="group-hover:text-white text-companyYello"
              />
            </NavLink>
          </div>
        ) : localStorage.getItem("isAdmin") === "2" ? (
          <div className="flex flex-row space-x-28 -ml-20">
            <NavLink
              to="/delegate_home"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <FiSearch
                size="30"
                className="group-hover:text-white text-companyYello"
              />
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-row space-x-28 -ml-28">
            <NavLink
              to="/home"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <FiSearch
                size="30"
                className="group-hover:text-white text-companyYello"
              />
            </NavLink>
            <NavLink
              to="/vote"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <FaVoteYea
                size="30"
                className="group-hover:text-white text-companyYello"
              />
            </NavLink>
            <NavLink
              to="/candidate_form"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <BiUser
                size="30"
                className="group-hover:text-white text-companyYello"
              />
            </NavLink>
          </div>
        )}
      </div>
      <div className="group relative inline-block pr-20">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="px-6 py-2 text-white border border-gray-500 shadow-2xl rounded-md hover:bg-companyYello hover:text-primary"
          role="menuitem"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
