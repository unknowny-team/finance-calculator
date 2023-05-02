import { useState } from "react";
import CalculatorSelector from "./components/CalculatorSelector";
import ReturnOfInvestmentCalc from "./components/ReturnOfInvestmentCalculator";

import Answer from "./components/Answer";

function App() {
  const [isReturnOfInvestmentCalc, setIsReturnOfInvestmentCalc] = useState(true); // Калькулятор доходности вклада или нет
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="App">
      <CalculatorSelector setIsReturnOfInvestmentCalc={setIsReturnOfInvestmentCalc}/>
      {
        isReturnOfInvestmentCalc
          ? <ReturnOfInvestmentCalc />
          : <p>Калькулятор ежемесячных платежей по кредиту</p>
      }
    </div>
  );
}

export default App;