import errorIMG from '../img/error.png';

function CalcError({text}) {
    return (
        <div className="error" style={text.length !== 0 ? {} : {display: 'none'}}>
            <img src={errorIMG} alt="Error Icon" className="error__image" />
            <p className="error__text">{text}</p>
        </div>
    );
}

export default CalcError;