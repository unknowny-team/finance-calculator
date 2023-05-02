import { useState } from "react";

function ReturnOfInvestmentCalc() {
    const [calcState, setCalcState] = useState({amount: 0, duration: 0, rate: 0.0});

    const sendFormInfoAsJSON = (e) => {
        e.preventDefault();

        // TO-DISCUSS
        // Нет таких типов данных (int)
        // Выходные из спецификации не совпадают с реальностью

        if (isNaN(calcState.amount) || isNaN(calcState.duration) || isNaN(calcState.rate)) {
            console.log('Error parsing calculator state (NaN)!');
            return -1;
        }
        else if (calcState.amount < 0 || calcState.duration < 0 || calcState.rate < 0) {
            console.log('Error parsing calculator state (Less than zero)!');
            return -1;
        }
        else {
            console.log(JSON.stringify(calcState));
            fetch('http://127.0.0.1:5000/api/deposit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify(calcState)
            })
            .then(res => res.json())
            .then(ans => console.log(`<Deposit>\nFull amount: ${ans.fullAmount} \nPercentages: ${ans.percentages}`))
            .catch(err => console.log(err));
        }
    }

    return (
        <form className="calculator">
            <h3 className="calculator__header">Калькулятор доходности вклада</h3>
            <hr className="calculator__separator" />
            <div className="calculator__body">
                    <div className="calculator__left">
                        <div className="calculator__row">
                            <label htmlFor="amount" className="calculator__label">Сумма вклада: </label>
                        </div>
                        <div className="calculator__row">
                            <label htmlFor="duration" className="calculator__label">Срок размещения: </label>
                        </div>
                        <div className="calculator__row">
                            <label htmlFor="rate" className="calculator__label">Процентная ставка: </label>
                        </div>
                    </div>
                    <div className="calculator__right">
                        <div className="calculator__row">
                            <input type="text" name="amount" className="calculator__input amount-input" onChange={e => setCalcState({...calcState, amount: parseInt(e.target.value)})} autoComplete="off"/>
                            <p className="calculator__post-input">₽</p>
                        </div>
                        <div className="calculator__row">
                            <input type="text" name="duration" className="calculator__input duration-input" onChange={e => setCalcState({...calcState, duration: parseInt(e.target.value)})} autoComplete="off"/>
                            <p className="calculator__post-input">мес.</p>
                        </div>
                        <div className="calculator__row">
                            <input type="text" name="rate" className="calculator__input rate-input" onChange={e => setCalcState({...calcState, rate: parseFloat(e.target.value)})} autoComplete="off"/>
                            <p className="calculator__post-input">%</p>
                        </div>
                    </div>
            </div>
            <hr className="calculator__separator" />
            <input type="submit" value="Рассчитать" className="calculator__submit-button" onClick={sendFormInfoAsJSON}/>
        </form>
    );
}

export default ReturnOfInvestmentCalc;