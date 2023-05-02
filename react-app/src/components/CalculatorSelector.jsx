function CalculatorSelector({setIsReturnOfInvestmentCalc}) {
    return (
        <div className="calculator-selectors">
            <label className="calculator-type">
                <input type="radio" name="calculator-type" className="calculator-selector__calc-type" onClick={e => setIsReturnOfInvestmentCalc(e.target.checked)}/>
                Калькулятор доходности вклада
            </label>
            <label className="calculator-type">
                <input type="radio" name="calculator-type" className="calculator-selector__calc-type" onClick={e => setIsReturnOfInvestmentCalc(!e.target.checked)}/>
                Калькулятор ежемесячных платежей по кредиту
            </label>
        </div>
    );
}

export default CalculatorSelector;