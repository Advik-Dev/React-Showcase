import { useCallback, useEffect, useState } from "react";
import CheckBox from "./CheckBox";
import PasswdBar from "./PasswdBar";
import RangeSlider from "./RangeSlider";
import CrackTime from "./CrackTime";

function PasswdGenerator() {
  const [passwordLength, setPasswordLength] = useState(6);
  const [password, setPassword] = useState("");

  const [checkedItems, setCheckedItems] = useState({
    Numbers: false,
    Characters: false,
  });

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const generatePassword = useCallback(() => {
    function isSpecialChar(char) {
      return /[^a-zA-Z0-9]/.test(char);
    }

    function isDigit(char) {
      return /^\d$/.test(char);
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let pass = "";
    while (pass.length < passwordLength) {
      let c = String.fromCharCode(getRandomInt(33, 126));
      if (checkedItems) {
        if (!checkedItems.Numbers && isDigit(c)) continue;
        if (!checkedItems.Characters && isSpecialChar(c)) continue;
      }
      pass += c;
    }
    setPassword(pass);
  }, [passwordLength, setPassword, checkedItems]);

  useEffect(generatePassword, [
    passwordLength,
    checkedItems,
    setPassword,
    generatePassword,
  ]);

  return (
    <div className="p-5 bg-gray-900 rounded-2xl flex justify-center items-center flex-col lg:min-w-140 md:min-w-100">
      <div className="flex m-3 w-[100%] justify-center items-center ">
        <PasswdBar password={password} />
      </div>
      <div className="flex gap-3 flex-wrap text-center">
        <RangeSlider
          passwordLength={passwordLength}
          setPasswordLength={setPasswordLength}
        />
        <div className="flex flex-row gap-3">
          <CheckBox
            label="Numbers"
            checked={checkedItems.Numbers}
            onChange={handleCheckBoxChange}
          />
          <CheckBox
            label="Characters"
            checked={checkedItems.Characters}
            onChange={handleCheckBoxChange}
          />
        </div>
        <div className="flex flex-row gap-6">
          <button
            className="w-30 md:w-xs p-2 bg-blue-500 rounded-xl text-white hover:ring-2 hover:ring-blue-400 transition transform ease-in-out active:bg-blue-400 active:scale-95 active:transition-none"
            onClick={generatePassword}
          >
            Generate New
          </button>
          <div className="flex justify-center">
            <p className="text-blue-300 text-xl sm:text-3xl self-center justify-end">
              Length : {passwordLength < 10 ? "0" : ""}
              {passwordLength}
            </p>
          </div>
        </div>
        <CrackTime
          passwordLength={passwordLength}
          checkedItems={checkedItems}
        />
      </div>
    </div>
  );
}

export default PasswdGenerator;
