const board = document.getElementById("table");
const victory = document.getElementById("win-alert");
const timer = document.getElementById("timer");
const foxy = document.getElementById("cute-fox");

let sec = 0;
let min = 0;
let interval;
let randomN;

foxy.addEventListener("ended", () => {  
    foxy.style.display = 'none';
});


const startGame = () =>
{
    interval = setInterval(() => {
        sec++;
        randomN = Math.floor(Math.random() * 120)
        if(sec == 60)
        {
            min++;
            sec = 0;
        }
        if(randomN == 0 && foxy.style.display == 'none')
        {
            foxy.style.display = 'block';
            foxy.play();
        }
        timer.innerText = String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
    }, 1000);
}

document.addEventListener("click", () =>{
    startGame();
}, {once: true});

let sudoku = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const randomSudoku = (array) => {
    //horizontal
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j += 3) {
            let randomNumber = Math.floor(Math.random() * 3) + j;
            let randomNumber2 = -1;
            do{
                randomNumber2 = Math.floor(Math.random() * 3) + j;
            } 
            while(randomNumber2 == randomNumber)

            let aux = array[randomNumber];
            array[randomNumber] = array[randomNumber2];
            array[randomNumber2] = aux;           
        }      
    }
    //vertical
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j += 3) { 
            let col1 = Math.floor(Math.random() * 3) + j;
            let col2 = -1;
            do {
                col2 = Math.floor(Math.random() * 3) + j;
            } while (col1 == col2);

            for (let k = 0; k < 9; k++) { 
                let aux = array[k][col1];
                array[k][col1] = array[k][col2];
                array[k][col2] = aux;           
            }      
        }
    }

    return array;
}

sudoku = randomSudoku(sudoku);

//#region 
// for (let i = 0; i < 81; i++) {
//     let input = document.createElement("input");
//     input.type = "text";
//     input.inputMode = "numeric";
//     input.className = "cell";
//     input.addEventListener("input", (e) => {
//         if(isNaN(e.target.value))
//         {
//             e.target.value = "";
//         }
//         else if(e.target.value < 1 || e.target.value > 9)
//         {
//             e.target.value = e.target.value.slice(0, 1);
//             //arrumar
//         }
//     });

//     board.appendChild(input);
// }
//#endregion

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        let input = document.createElement("input");
        input.type = "text";
        input.inputMode = "numeric";
        input.className = "cell";
        if(j ==  2 || j == 5)
        {
            input.classList.add("border-R");
        }
        if(i ==  2 || i == 5)
        {
            input.classList.add("border-B");
        }
        

        if(sudoku[i][j] != 0)
        {
            input.value = sudoku[i][j];
            input.readOnly = true;
            input.classList.add("tip");
        }

        input.addEventListener("input", (e) => {   
            if(e.target.value.length > 1)
            {
                e.target.value = e.target.value.slice(-1);

            }

            if(isNaN(e.target.value) || e.target.value == 0)
            {
                e.target.value = "";
            }
            else if(e.target.value < 1 || e.target.value > 9)
            {
                e.target.value = e.target.value.slice(0, 1);                           
            }

            if(!Validation(sudoku, i, j, +e.target.value))
            {
                input.classList.add("wrong");
            }
            else{
                input.classList.remove("wrong");
            }
            sudoku[i][j] = +e.target.value;
            const erros = document.querySelectorAll(".wrong");
            const allInputs = document.querySelectorAll(".cell");
            if(erros.length == 0 && !sudoku.some((list) => list.includes(0)))
            {
                victory.textContent = "Fim de jogo!";
                //board.classList.add("win");
                document.body.classList.add("win");
                clearInterval(interval);

                allInputs.forEach(e => {
                    e.readOnly = true;
                });
            }   
            
        });
        board.appendChild(input);        
    }
}


const Validation = (array, h, v, num) =>
{
    let startRow = Math.floor(h / 3) * 3;
    let startCol = Math.floor(v / 3) * 3;

    if(num == 0)
    {
        return true;       
    }

    if(array[h].includes(num) )
    {
        return false;       
    }

    for (let i = 0; i < array.length; i++) {
        if(array[i][v] == num)
        {
            return false;       
        }
    }
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
        if(array[startRow + i][startCol + j] == num)
            {
                return false;       
            }
        }
    }

    return true;
}
