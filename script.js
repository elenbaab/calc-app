let total = 0;
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
            total = 0;
            break;

        case '=':
            if(prevOperator === null){
                return
            }
            calculate(parseInt(buf));
            prevOperator = null;
            buf = total;
            total = 0;
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
    const intBuf = parseInt(buf);

    if(total === 0){
        total = intBuf;
    }
    else{
        calculate(intBuf);
    }
    prevOperator = symbol;
    buf = '0';
}

function calculate(intBuf){
    if(prevOperator === '+'){
        total += intBuf;
    }
    else if(prevOperator === '−'){
        total -= intBuf;
    }
    else if(prevOperator === '×'){
        total *= intBuf;
    }
    else if(prevOperator === '÷'){
        total /= intBuf;
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