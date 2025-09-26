import { useCallback, useEffect, useState } from "react";
import CheckBox from "./CheckBox";
import PasswdBar from "./PasswdBar";
import RangeSlider from "./RangeSlider";
import CrackTime from "./CrackTime";
import { useColor } from "../../../context/ColorContext/ColorContext";

function PasswdGenerator() {
  const { palette } = useColor();
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
    <div
      className="p-5 rounded-2xl flex justify-center items-center flex-col border-2"
      style={{
        backgroundColor: palette.bgshade1,
        borderColor: palette.bordershade,
        color: palette.shade4,
      }}
    >
      <div className="flex m-3 w-full justify-center items-center ">
        <PasswdBar password={password} />
      </div>
      <div className="flex gap-3 flex-wrap text-center">
        <RangeSlider
          passwordLength={passwordLength}
          setPasswordLength={setPasswordLength}
        />
        <div className="flex flex-row gap-3 select-none">
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
        <div className="flex flex-row gap-6 w-full">
          <button
            className="flex-2 p-2 transition transform ease-in-out rounded-2xl active:scale-97 active:transition-none focus:outline-none"
            onClick={generatePassword}
            style={{
              backgroundColor: palette.shade2,
              color: palette.shade0,
              "--tw-ring-color": palette.shade0,
            }}
          >
            Generate New
          </button>
          <div className="flex justify-center">
            <p className="text-xl sm:text-3xl self-center justify-end">
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
