import { useState } from "react";
import CalculatorSelector from "./components/CalculatorSelector";
import ReturnOfInvestmentCalculator from "./components/ReturnOfInvestmentCalculator";
import MonthlyPaymentCalculator from "./components/MonthlyPaymentCalculator";
import CalcError from "./components/CalcError";
import Answer from "./components/Answer";

function App() {
  const [isReturnOfInvestmentCalc, setIsReturnOfInvestmentCalc] = useState(true);

  const [error, setError] = useState('');
  const [answer, setAnswer] = useState({});

  return (
    <div className="App">
      <CalculatorSelector setIsReturnOfInvestmentCalc={setIsReturnOfInvestmentCalc}/>
      {
        isReturnOfInvestmentCalc
          ? <ReturnOfInvestmentCalculator setError={setError} setAnswer={setAnswer}/>
          : <MonthlyPaymentCalculator setError={setError} setAnswer={setAnswer} />
      }
      <CalcError text={error}/>
      <Answer body={answer}/>
    </div>
  );
}

export default App;