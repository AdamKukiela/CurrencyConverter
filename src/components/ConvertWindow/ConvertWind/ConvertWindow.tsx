import CurrencyRow from "../../../CurrencyRow";
import "./ConvertWindow.css";
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { SetStateAction } from "react";
import { Dispatch } from "react";

const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=37e0b025a74a0a79ae25bc1b551cf52e";

type CurrencyState = [string[], Dispatch<SetStateAction<string[]>>];

export type CurrencyEvent = {
  target: { value: SetStateAction<number> };
} & ChangeEvent<HTMLSelectElement> &
  ChangeEvent<HTMLInputElement>;

export function ConvertWindow(): JSX.Element {
  const [chooseCurrency, setChooseCurrency]: CurrencyState = useState<string[]>(
    []
  );
  const [fromCurrency, setFromCurrency]: any = useState();
  const [toCurrency, setToCurrency]: any = useState();
  const [exchangeRate, setExchangeRate]: any = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  function handleFromAmountChange(event: CurrencyEvent) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(event: CurrencyEvent) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  let toAmount = 0,
    fromAmount = 0;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setChooseCurrency([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  return (
    <div className="convert-window">
      Convert
      <div className="currency-row">
        <CurrencyRow
          chooseCurrency={chooseCurrency}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(event: CurrencyEvent) =>
            setFromCurrency(event.target.value)
          }
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        =
        <CurrencyRow
          chooseCurrency={chooseCurrency}
          selectedCurrency={toCurrency}
          onChangeCurrency={(event: CurrencyEvent) =>
            setToCurrency(event.target.value)
          }
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </div>
    </div>
  );
}
