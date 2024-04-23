import React, { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

interface PasswordGeneratorProps {
  setPasswordGenerator: React.Dispatch<React.SetStateAction<string>>;
}
const PasswordGenerator: FC<PasswordGeneratorProps> = ({
  setPasswordGenerator,
}) => {
  const { push } = useRouter();

  return (
    <Tabs
      defaultValue="random"
      onValueChange={(value: string) => push(`?type=${value}`)}
      className="w-full "
    >
      <TabsList className="bg-[#F3F9FF] h-[64px] w-full md:w-[573px] p-2">
        <TabsTrigger
          className="h-[42px] w-full text-[12px] sm:text-[16px] xl:text-[18px] text-primary-100 data-[state=active]:text-[#F6FAFF] data-[state=active]:bg-primary-500 cursor-pointer "
          value="random"
        >
          Generate Random password
        </TabsTrigger>
        <TabsTrigger
          className="h-[42px] w-full text-[12px] sm:text-[16px] xl:text-[18px] text-primary-100 data-[state=active]:text-[#F6FAFF] data-[state=active]:bg-primary-500 cursor-pointer"
          value="memorable"
        >
          Generate Memorable password
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default PasswordGenerator;
