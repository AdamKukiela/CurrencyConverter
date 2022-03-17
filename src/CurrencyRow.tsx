import { CurrencyEvent } from "./components/ConvertWindow/ConvertWind/ConvertWindow";

export default function CurrencyRow(props: {
  chooseCurrency: string[];
  selectedCurrency: string[];
  onChangeCurrency: (event: CurrencyEvent) => void;
  onChangeAmount: (event: CurrencyEvent) => void;
  amount: number;
}) {
  const {
    chooseCurrency,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      ></input>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {chooseCurrency.map((currency: string, index: number) => {
          return (
            <option
              key={currency === "EUR" ? currency + index : currency}
              value={currency}
            >
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
}
