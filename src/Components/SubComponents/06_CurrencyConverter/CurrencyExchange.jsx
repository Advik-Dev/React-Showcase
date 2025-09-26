import { useColor } from "../../../context/ColorContext/ColorContext";
import InputBoxAmount from "./InputBoxAmount";
import InputBoxSelector from "./InputBoxSelector";
import { useState, useEffect } from "react";
import useCurrencyList from "../../../hooks/Currency/useCurrencyList";
import useCurrencyRates from "../../../hooks/Currency/useCurrencyInfo";
import SwitchCurrencyBtn from "./SwitchCurrencyBtn";

function CurrencyExchange() {
  const { palette } = useColor();

  const [from, setFrom] = useState("btc");
  const [to, setTo] = useState("usd");
  const [fromAmt, setFromAmt] = useState("");
  const [toAmt, setToAmt] = useState("");

  const fromAmtRates = useCurrencyRates(from) || 0;
  const toAmtRates = useCurrencyRates(to) || 0;

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
    const num = Number(val);
    if (Math.abs(num) < 0.0001) {
      return val; // very small, keep as string
    }
    return num.toLocaleString(undefined, { maximumSignificantDigits: 8 });
  }

  return (
    <div
      className="min-w-100 md:min-w-120 lg:min-w-160 rounded-2xl flex lg:flex-row flex-col items-center justify-center relative border-2"
      style={{
        backgroundColor: palette.bgshade1,
        borderColor: palette.bordershade,
        color: palette.shade4,
      }}
    >
      <div className="flex flex-col rounded-4xl w-10/11 justify-center items-center">
        <form
          className="flex flex-col md:flex-row gap-2 p-3 my-3 rounded-2xl mb-0"
          style={{
            backgroundColor: palette.bgshade3,
            borderColor: palette.bordershade,
            color: palette.shade4,
          }}
          onClick={(e) => e.preventDefault()}
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
        <div className="w-full p-2 mt-0 overflow-hidden">
          <p className="text-md  " style={{}}>
            {fromAmt == "" ? "0" : fromAmt}{" "}
            {currencies[from] || from.toUpperCase()} =
          </p>
          <p className="text-4xl" style={{}}>
            {formatNumber(toAmt)} {currencies[to]}
          </p>
          <div className="text-sm my-2" style={{ color: palette.shade3 }}>
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
      </div>
    </div>
  );
}

export default CurrencyExchange;
