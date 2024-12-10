/*let number = 10;
let text="ciao sono un testo";
let text2="Ciao sono un testo alternativo";
let boolean = true;
function somma() 
{
    console.log(2 + 5);
}
somma();*/

let history= [Array(9).fill(null)];
let currentMove = 0;
let xIsNext = currentMove % 2 == 0;
let currentSquares = history[currentMove];

console.log('history',history);
function handleClick(button)
{
    console.log('cliccato',button);

    const nextSquares = currentSquares.slice();
    if(xIsNext)
    {
        nextSquares[button -1 ] = 'X';
    }else 
    {
        nextSquares[button -1] = '0';
    }
    console.log('nextSquares',nextSquares);
    const square = document.getElementById(button);
    square.innerText = nextSquares[button -1];
}