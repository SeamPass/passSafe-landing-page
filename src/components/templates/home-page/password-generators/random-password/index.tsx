"use client";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { RefreshIcon } from "hugeicons-react";
import { useEffect, useState } from "react";
import copyToClipboard from "@/utils/copy-to-clipboard";
import { usePasswordStrengthMeter } from "@/hooks/usePasswordMeter";
import PasswordStrengthCriteria from "@/components/ui/shared/components/password-strength-criteria";
import Text from "@/components/ui/shared/components/typography/Text";
import Customization from "./customization";

// Define types for your options
type OptionType = {
  [key: string]: boolean;
};

const numbers: string = "0123456789";
const letters: string = "abcdefghijklmnopqrstuvwxyz";
const specialCharacters: string = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

const RandomPassword = () => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState<number[]>([52]);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [strengthColor, setStrengthColor] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [options, setOptions] = useState<OptionType>({
    "Use number": true,
    "Use letter": false,
    "Use characters": false,
    "Use capitals": false,
  });

  // This function maps the slider's value (0 to 100) to a range of 1 to 15
  const convertToPasswordLength = (progress: number) => {
    return Math.round((progress / 100) * 29) + 1;
  };

  const [passwordLength, setPasswordLength] = useState<number>(
    convertToPasswordLength(progress[0])
  );

  // Update both progress and passwordLength when the slider changes
  const handleSliderChange = (value: number[]) => {
    setProgress(value);
    setPasswordLength(convertToPasswordLength(value[0]));
  };

  // Function to generate a secure random password
  const generatePassword = (): void => {
    const newPasswordComponents: string[] = [];
    const availableOptions = [];

    //function to get a secure random number within a range
    const secureRandom = (max: number) => {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0] % max;
    };

    if (options["Use letter"]) {
      availableOptions.push("letter");
    }
    if (options["Use number"]) {
      availableOptions.push("number");
    }
    if (options["Use characters"]) {
      availableOptions.push("special");
    }

    if (availableOptions.length === 0) {
      return;
    }

    while (newPasswordComponents.length < passwordLength) {
      const optionIndex = secureRandom(availableOptions.length);
      const selectedOption = availableOptions[optionIndex];

      switch (selectedOption) {
        case "letter": {
          let character = letters.charAt(secureRandom(letters.length));
          if (options["Use capitals"]) {
            character =
              Math.random() < 0.5 ? character.toUpperCase() : character;
          }
          newPasswordComponents.push(character);
          break;
        }
        case "number":
          newPasswordComponents.push(
            numbers.charAt(secureRandom(numbers.length))
          );
          break;
        case "special":
          newPasswordComponents.push(
            specialCharacters.charAt(secureRandom(specialCharacters.length))
          );
          break;
      }
    }

    setPassword(newPasswordComponents.join(""));
  };

  const handleRefresh = () => {
    generatePassword();
  };

  // When the user toggles the switch options, update the options state
  const handleOptionChange = (optionName: string) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: !prevOptions[optionName],
    }));
  };

  // Generate a new password when options or password length change
  useEffect(() => {
    generatePassword();
  }, [options, passwordLength]);

  // show strength of passwords
  const { handleShowPasswordStrength } = usePasswordStrengthMeter();

  useEffect(() => {
    const result = handleShowPasswordStrength(password);
    setPasswordStrength(result.strengthMessage);
    setStrengthColor(result.color);
  }, [password]);

  return (
    <div>
      <div className="flex items-center justify-between border border-grey-200  rounded-[16px] h-[75px] overflow-hidden">
        <input
          disabled
          type="text"
          className="flex-1  outline-none px-4 bg-transparent "
          value={password}
        />

        <div className="flex items-center">
          <div className="h-[46px] w-fit border border-grey-200" />
          <div className="focus:rotate-180 transition-all duration-200">
            <RefreshIcon
              onClick={() => handleRefresh()}
              className="mx-5 cursor-pointer "
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-6 justify-between mt-5 border-b border-grey-200 pb-4 pr-[22px]">
        <span style={{ color: strengthColor }} className="">
          {passwordStrength}
        </span>
        <Text
          onClick={() => copyToClipboard(password)}
          size="sm"
          className="text-primary-500 cursor-pointer underline"
        >
          Copy
        </Text>
      </div>

      <PasswordStrengthCriteria />

      <Text variant="primary" className="text-[16px] mt-[10px]">
        Password Length
      </Text>

      <div className=" flex items-center  mt-4 ">
        <Slider
          max={100}
          step={1}
          defaultValue={progress}
          onValueChange={handleSliderChange}
          className={cn("w-[100%] h-[21px]")}
        />
        <Text size="normal" variant="primary" className="pl-4 ">
          {passwordLength}
        </Text>
      </div>

      <div>
        <Customization options={options} onCheckedChange={handleOptionChange} />
      </div>
    </div>
  );
};

export default RandomPassword;