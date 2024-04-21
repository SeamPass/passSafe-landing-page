"use client";
import React, { useState } from "react";
import ContainerLayout from "../../layout/container-layout";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { Button } from "../button";
import { ArrowLeft01Icon, Menu02Icon } from "hugeicons-react";
import { usePathname, useRouter } from "next/navigation";
import ComponentVisibility from "../componentVisibility";

const MobileNav = () => {
  const { push } = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogin = () => {
    window.open("http://localhost:5173/login", "_blank");
  };

  const handleCreateAccount = () => {
    window.open("http://localhost:5173/create-account", "_blank");
  };
  return (
    <ContainerLayout>
      <>
        <div className="flex !h-[77px]  justify-between items-center   ">
          <Image src={logo} width={150} height={150} alt="logo" />
          <div className="w-fit flex items-center gap-[10px] ">
            <ComponentVisibility appear={!showMenu}>
              <Button
                onClick={() => {
                  setShowMenu(true);
                }}
                className="!size-10 rounded-full bg-[#F6F6F6] flex justify-center items-center"
              >
                <Menu02Icon />
              </Button>
            </ComponentVisibility>
          </div>
        </div>

        <ComponentVisibility appear={showMenu}>
          <div className="h-full left-0 w-full px-4 bg-white fixed">
            <div className="relative w-full">
              <span
                onClick={() => setShowMenu(false)}
                className="flex items-center relative cursor-pointer"
              >
                <ArrowLeft01Icon />
                Go back
              </span>
              <div className=" flex flex-col gap-[16px] mt-4 ">
                <Button
                  onClick={handleLogin}
                  variant="tertiary"
                  className=" px-8"
                >
                  Log in
                </Button>
                <Button
                  onClick={handleCreateAccount}
                  variant="primary"
                  className=" px-4"
                >
                  Create account
                </Button>
              </div>
            </div>
          </div>
        </ComponentVisibility>
      </>
    </ContainerLayout>
  );
};

export default MobileNav;
