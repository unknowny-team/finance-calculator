import { useState, useEffect } from "react";

function MonthlyPaymentCalculator({setError, setAnswer}) {
    const [calcState, setCalcState] = useState({
        amount: 1, 
        duration: 1, 
        rate: 1.0,
        isDifferentiated: false,
        isValidAmount: true,
        isValidDuration: true,
        isValidRate: true
    });

    const checkValidNumber = (num) => {
        if (isNaN(num)) {
            setError('Не используйте в полях ввода посторонние символы');
            return false;
        }
        else if (parseInt(num) <= 0) {
            setError('Данные не могут быть меньше нуля или равны нулю');
            return false;
        }
        else if (num === '') {
            setError('Не оставляйте поля ввода пустыми');
            return false;
        }
        else 
            return true;
    };

    useEffect(() => {
        if (calcState.isValidAmount && calcState.isValidDuration && calcState.isValidRate)
            setError('');
    }, [calcState.isValidAmount, calcState.isValidDuration, calcState.isValidRate])

    const sendCalcInfoAsJSON = (e) => {
        e.preventDefault();
        setError(''); // In case error with server previously was encountered

        fetch('http://127.0.0.1:5000/api/credit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify(calcState)
        })
            .then(res => res.json())
            .then(ans => setAnswer(ans))
            .catch(err => {setError('Ошибка подключения к серверу Unknown Team...'); console.log(err)});
    }

    const invalidInputStyle = {
        border: '2px solid rgb(250, 50, 50)'
    }

    const disabledButtonStyle = {
        border: '2px solid grey',
        color: 'grey',
        backgroundColor: 'black',
        cursor: 'not-allowed'
    }

    return (
        <form className="calculator app-block">
            <h3 className="app-block__header">Калькулятор ежемесячных платежей по кредиту</h3>
            <hr className="calculator__separator" />
            <div className="calculator__body">
                    <div className="calculator__left">
                        <div className="calculator__row">
                            <label htmlFor="amount" className="calculator__label">Сумма кредита: </label>
                        </div>
                        <div className="calculator__row">
                            <label htmlFor="duration" className="calculator__label">Срок кредита: </label>
                        </div>
                        <div className="calculator__row">
                            <label htmlFor="rate" className="calculator__label">Тип платежей: </label>
                        </div>
                    </div>
                    <div className="calculator__right">
                        <div className="calculator__row">
                            <input type="text" name="amount" className="calculator__input amount-input" style={calcState.isValidAmount ? {} : invalidInputStyle} placeholder="1" onChange={e => setCalcState({...calcState, amount: parseInt(e.target.value), isValidAmount: checkValidNumber(e.target.value)})} autoComplete="off"/>
                            <p className="calculator__post-input">₽</p>
                        </div>
                        <div className="calculator__row">
                            <input type="text" name="duration" className="calculator__input duration-input" style={calcState.isValidDuration ? {} : invalidInputStyle} placeholder="1" onChange={e => setCalcState({...calcState, duration: parseInt(e.target.value), isValidDuration: checkValidNumber(e.target.value)})} autoComplete="off"/>
                            <p className="calculator__post-input">мес.</p>
                        </div>
                        <div className="calculator__row">
                            <input type="radio" name="fee-type" className="calculator__input radio-input" onChange={e => setCalcState({...calcState, isDifferentiated: !e.target.checked})} defaultChecked/>
                            <p className="calculator__post-input annuitet-type">Аннуитетные</p>
                            <input type="radio" name="fee-type" className="calculator__input radio-input" onChange={e => setCalcState({...calcState, isDifferentiated: e.target.checked})}/>
                            <p className="calculator__post-input">Дифференцированные</p>
                        </div>
                    </div>
            </div>
            <hr className="calculator__separator" />
            <input type="submit" value="Рассчитать" className="calculator__submit-button" style={(calcState.isValidAmount && calcState.isValidDuration && calcState.isValidRate) ? {} : disabledButtonStyle} onClick={sendCalcInfoAsJSON} disabled={!calcState.isValidAmount || !calcState.isValidDuration || !calcState.isValidRate} />
        </form>
    );
}

export default MonthlyPaymentCalculator;