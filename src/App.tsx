import "./App.css";
import { ConvertWindow } from "./components/ConvertWindow/ConvertWind/ConvertWindow";
// import { ExchangeRates } from "./components/ConvertWindow/ExchangeRates/ExchangeRates";




function App(): JSX.Element {
  return (
    <div className="App">
      <div className="title">
        <h3>Cosmic Currency Converter 3C</h3>
      </div>
      <div>
      <video
        className="background-app"
        src={"background to currency converter.mp4"}
        autoPlay
        loop
        muted
      ></video>
      </div>
      

      <ConvertWindow />
      {/* <ExchangeRates /> */}
    </div>
  );
}

export default App;
