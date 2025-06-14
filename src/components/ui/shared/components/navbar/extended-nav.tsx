"use client";
import React from "react";
import ContainerLayout from "../../layout/container-layout";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { Button } from "../button";
import auth from "@/utils/auth";

const ExtendedNav = () => {
  const { handleLogin, handleCreateAccount } = auth();

  return (
    <ContainerLayout>
      <div className="flex !h-[77px]  justify-between items-center  ">
        <Image src={logo} width={200} height={200} alt="logo" />
        <div></div>
        <div className="w-fit flex items-center gap-[10px] ">
          <Button onClick={handleLogin} variant="tertiary" className="!w-fit px-8">
            Log in
          </Button>
          <Button onClick={handleCreateAccount} variant="primary" className="!w-fit px-4">
            Create account
          </Button>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default ExtendedNav;
