import { useState } from "react";

function ReturnOfInvestmentCalc() {
    const [calcState, setCalcState] = useState({amount: 0, duration: 0, rate: 0.0});

    const sendFormInfoAsJSON = (e) => {
        e.preventDefault();

        // amount целый
        // duration целый
        // rate дробный
        // ВСЕ ПОЛОЖИТЕЛЬНЫЕ

        if (parseInt(calcState.amount) > 0 || parseInt(calcState.duration) > 0 || parseFloat(calcState.rate) > 0) {
            console.log('Error parsing!');
            return -1;
        }

        console.log(JSON.stringify(calcState));
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
                            <input type="text" name="amount" className="calculator__input amount-input" onChange={e => setCalcState({...calcState, amount: e.target.value})}/>
                            <p className="calculator__post-input">₽</p>
                        </div>
                        <div className="calculator__row">
                            <input type="text" name="duration" className="calculator__input duration-input" onChange={e => setCalcState({...calcState, duration: e.target.value})}/>
                            <p className="calculator__post-input">мес.</p>
                        </div>
                        <div className="calculator__row">
                            <input type="text" name="rate" className="calculator__input rate-input" onChange={e => setCalcState({...calcState, rate: e.target.value})}/>
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