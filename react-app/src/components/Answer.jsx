function Answer({body}) {
    return (
                                            // Hide if answer is empty
        <div className="answer app-block" style={Object.keys(body).length !== 0 ? {} : {display: 'none'}}>
            <h3 className="app-block__header">Результат</h3>
            {( 
                body.hasOwnProperty('fullAmount') // Means that the ReturnOfInvestmentCalculator result is in the answer
                ?
                    <div className="answer__body">
                        <p className="answer__text">Начисленный процент: {body.percentages} ₽</p>
                        <p className="answer__text">Сумма к концу срока: {body.fullAmount} ₽</p>
                    </div>
                : 
                    Array.isArray(body.monthlyFee) // Means that we have answer from differentiated type
                    ? 
                        <div className="answer__body">
                            <p className="answer__text">Ежемесячные выплаты:</p>
                            <ol>
                                {body.monthlyFee.map(fee => <li key={fee.toString()}>{fee} ₽</li>)}
                            </ol>
                            <p className="answer__text">Переплаты:</p>
                            <ol>
                                {body.percentages.map(percent => <li key={percent.toString()}>{percent} ₽</li>)}
                            </ol>
                        </div>
                    : 
                        <div className="answer__body">
                            <p className="answer__text">Ежемесячные выплаты: {body.monthlyFee} ₽</p>
                            <p className="answer__text">Переплата: {body.percentages} ₽</p>
                        </div>
            )}
        </div>
    );
}

export default Answer;

// {
//     (
//         if (body.hasOwnProperty('fullAmount')) { // Means that the ReturnOfInvestmentCalculator result is in the answer
//             <div className="answer__body">
//                 <p className="answer__text">Начисленный процент: {body.percentages} ₽</p>
//                 <p className="answer__text">Сумма к концу срока: {body.fullAmount} ₽</p>
//             </div>
//         }
//         else {
//             if (Array.isArray(body.monthlyFee)) {
//                 <div className="answer__body">
//                         <p className="answer__text">Ежемесячные выплаты:</p>
//                         <ol>
//                             for (let i = 0; i < body.monthlyFee.length; i++)
//                                 <li>{body.monthlyFee[i]}</li>
//                         </ol>
//                         {/* <p className="answer__text">Переплата: {body.percentages} ₽</p> */}
//                 </div>
//             }
//             else {
//                 <div className="answer__body">
//                         <p className="answer__text">Ежемесячные выплаты: {body.monthlyFee} ₽</p>
//                         <p className="answer__text">Переплата: {body.percentages} ₽</p>
//                 </div>
//             }
//         }
//     )
// }