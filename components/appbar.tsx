import Link from "next/link";
// import {Link} from "react-scroll"
import { Transition } from "@headlessui/react";
import { useState } from "react";

const links: { name: string; url: string }[] = [
  {
    name: "home",
    url: "/",
  },
  {
    name: "staffs",
    url: "/staffs",
  },
];

const AppBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="sticky top-0 bg-slate-200 shadow-sm w-full z-10">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            {/* for first block. Title */}
            <div className="flex items items-center mx-20 justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0">
                <div className="font-bold text-xl cursor-pointer">
                  Coach-<span className="text-blue-500">Diary</span>
                </div>
              </div>
              {/* for small screen */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {links.map((link) => (
                    <Link key={link.url} href={link.url} passHref>
                      <a className="capitalize px-3 py-2 hover:bg-blue-500 text-black hover:text-white rounded-md text-sm font-medium">
                        {link.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* for mobile responsive */}
            <div className="mr-10 flex md:hidden">
              <button
                type="button"
                className="bg-blue-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open Main Menu</span>
                {!open ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <Transition
          show={open}
          enter="trasition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          
            <div className="md:hidden" id="mobile-menu-container">
              <div
                
                className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
              >
                {links.map((link) => (
                  <Link key={link.url} href={link.url} passHref>
                    <a className="capitalize px-3 py-2 hover:bg-blue-500 text-black hover:text-white block rounded-md text-base font-medium">
                      {link.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          
        </Transition>
      </nav>
    </>
  );
};

export default AppBar;
