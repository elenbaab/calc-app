let runningTotal = 0;
let buf = "0";
let prevOperator;

const screen = document.querySelector('.screen');

function buttonClick(val){
    if (isNaN(val)){
        handleSymbol(val);
    }
    else{
        handleNumber(val);
    }
    screen.innerText = buf;
}

//← , − , × , ÷ , +

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buf = '0';
            runningTotal = 0;
            break;

        case '=':
            if(prevOperator === null){
                return
            }
            calculate(parseInt(buf));
            prevOperator = null;
            buf = runningTotal;
            runningTotal = 0;
            break;

        case '←':
            if(buf.length === 1){
                buf = '0';
            }
            else{
                buf = buf.substring(0,buf.length-1);
            }
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buf === '0'){
        return;
    }
    const intBuffer = parseInt(buf);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        calculate(intBuffer);
    }
    prevOperator = symbol;
    buf = '0';
}

function calculate(intBuffer){
    if(prevOperator === '+'){
        runningTotal += intBuffer;
    }
    else if(prevOperator === '−'){
        runningTotal -= intBuffer;
    }
    else if(prevOperator === '×'){
        runningTotal *= intBuffer;
    }
    else if(prevOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buf === '0'){
        buf = numberString;
    }
    else{
        buf += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){buttonClick(event.target.innerText);})
}

init();