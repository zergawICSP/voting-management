import React, { useEffect, useState } from "react";

// EXTERNAL IMPORTS
import { FiSearch } from "react-icons/fi";
import { FaVoteYea } from "react-icons/fa";
import { AiOutlineUser, AiOutlinePoweroff } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdViewAgenda } from "react-icons/md";
import { toast } from "react-toastify";

import { instance } from "../../../api/config";

export default function Nav() {

  return (
    <div className="flex flex-row w-screen py-4">
      <div className="m-auto">
        {localStorage.getItem("isAdmin") === "1" ? (
          <div className="flex flex-row space-x-28 pl-20">
            <NavLink
              to="/register"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <AiOutlineUserAdd size="30" className="group-hover:text-white" />
            </NavLink>
            <NavLink
              to="/init_vote"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <MdViewAgenda size="30" className="group-hover:text-white" />
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-row space-x-28 pl-20">
            <NavLink
              to="/home"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <FiSearch size="30" className="group-hover:text-white" />
            </NavLink>
            <NavLink
              to="/vote"
              className="p-4 rounded-full hover:bg-third hover:border-third group"
              activeClassName="bg-third text-white"
            >
              <FaVoteYea
                size="30"
                className="group-hover:text-white text-white"
              />
            </NavLink>
          </div>
        )}
      </div>
      <div className="group relative inline-block pr-20">
        <button
          className="inline-flex justify-center items-center p-2 bg-third rounded-full border-none focus:outline-none "
          type="button"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <AiOutlineUser className="text-white" size="25" />
        </button>
        <div className="absolute hidden group-hover:block right-16 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex flex-row justify-around items-center"
              role="menuitem"
            >
              <AiOutlinePoweroff />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
