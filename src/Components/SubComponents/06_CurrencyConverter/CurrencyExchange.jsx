import { useColor } from "../../../context/ColorContext/ColorContext";
import InputBoxAmount from "./InputBoxAmount";
import InputBoxSelector from "./InputBoxSelector";
import { useState, useEffect } from "react";
import useCurrencyList from "../../../hooks/Currency/useCurrencyList";
import useCurrencyInfo from "../../../hooks/Currency/useCurrencyInfo";
import SwitchCurrencyBtn from "./SwitchCurrencyBtn";
import CurrencyChart from "./CurrencyChart";

function CurrencyExchange() {
  const { palette } = useColor();

  const [from, setFrom] = useState("btc");
  const [to, setTo] = useState("usd");
  const [fromAmt, setFromAmt] = useState("");
  const [toAmt, setToAmt] = useState("");

  const fromAmtRates = useCurrencyInfo(from) || 0;
  const toAmtRates = useCurrencyInfo(to) || 0;

  const currencies = useCurrencyList() || {};

  useEffect(() => {
    const num = parseFloat(fromAmt); // convert only for calculation
    if (!isNaN(num)) {
      setToAmt(num * (fromAmtRates[to] || 0));
    } else {
      setToAmt(0); // if empty or invalid input
    }
  }, [fromAmt, fromAmtRates, to]);

  function handleAmtChange(val) {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setFromAmt("");
      return;
    }
    if (num < 1e15) {
      setFromAmt(num);
    }
  }

  function formatNumber(val) {
    const num = Number(val).toFixed(2);
    if (Math.abs(num) < 0.0001) {
      return val; // very small, keep as string
    }
    return num.toLocaleString(undefined);
  }

  return (
    <div
      className="w-full rounded-2xl flex lg:flex-row flex-col items-center justify-center relative border-2"
      style={{
        backgroundColor: palette.bgshade1,
        borderColor: palette.bordershade,
        color: palette.shade4,
      }}
    >
      <div className="w-full flex flex-col rounded-2xl lg:m-3 justify-center items-center">
        <form
          className="w-full flex flex-col xl:flex-row gap-2 p-3 rounded-2xl mb-0"
          style={{
            backgroundColor: palette.bgshade3,
            borderColor: palette.bordershade,
            color: palette.shade4,
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <InputBoxAmount
            className={"flex-3 md:flex-1"}
            label="Amount"
            amt={fromAmt}
            setAmt={handleAmtChange}
          />
          <InputBoxSelector
            className={"flex-2 md:flex-2"}
            internalValue={from}
            setInternalValue={setFrom}
            options={currencies}
            label="From"
          />
          <SwitchCurrencyBtn
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
          />
          <InputBoxSelector
            className={"flex-2 md:flex-2"}
            internalValue={to}
            setInternalValue={setTo}
            options={currencies}
            label="To"
          />
        </form>
        <div className="flex flex-col xl:flex-row w-full">
          <div className="w-full p-4 overflow-hidden flex flex-col justify-center">
            <p className="text-base">
              {fromAmt === "" ? "0" : fromAmt}{" "}
              {currencies[from] || from.toUpperCase()} =
            </p>
            <p className="text-3xl font-bold mb-4 wrap-anywhere">
              {formatNumber(toAmt)} {currencies[to]}
            </p>

            <div
              className="text-sm space-y-1"
              style={{ color: palette.shade3 }}
            >
              <p>
                1 {currencies[from] || from.toUpperCase()} ={" "}
                {formatNumber(fromAmtRates[to])} {to.toUpperCase()}
              </p>
              <p>
                1 {currencies[to]} = {formatNumber(toAmtRates[from])}{" "}
                {from.toUpperCase()}
              </p>
            </div>
          </div>

          <CurrencyChart
            className="mt-3 w-full self-center"
            width="300"
            height="150"
            from={from}
            to={to}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrencyExchange;
