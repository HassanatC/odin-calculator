function calculator () {
// everything operates and is called in by the calculator function. which includes several other functions
    // the query selectors all refer back to identified divs in the HTML file
    let previousText = document.querySelector('.previous')
    let currentText = document.querySelector('.current')
    const numButtons = Array.from(document.querySelectorAll('.num'))
    const OperationsButton = Array.from(document.querySelectorAll('.operation'))
    const deleteButton = document.querySelector('.delete')
    const clearButton = document.querySelector('.clear')
    const equalBtn = document.querySelector('.equal')

    let currentOperand = ' '
    let previousOperand = ' '
    let operation = undefined;
 

    // handlebuttons sets certain conditions for buttons, for example, no multiple decimal places, preventing division by zero.
    
    function handleButtons() {

        numButtons.map(btn => {
            btn.addEventListener('click', () => {
                currentOperand === "Cannot divide by 0." ? currentOperand = '' : ''
                currentOperand === 0 ? currentOperand = " " : '';
                currentOperand = currentOperand.toString()
                if(btn.textContent === '.' && currentOperand.includes('.')) return
                currentOperand += btn.textContent.toString()
                
                updateDisplay()
            })
        })

        OperationsButton.map(btn => {
            btn.addEventListener('click', () => {
                if(currentOperand ===  "") return
                operation = btn.textContent
                operate()
                updateDisplay()
            })
        })

        deleteButton.addEventListener('click', () => {
        
            let temp
            if(currentOperand ===  "Cannot divide by 0.") {
                currentOperand = 0
                temp = currentOperand
            } else {
                temp = currentOperand.toString().slice(0, -1)
            }
            if(temp === '' || temp === 0 ) {
                temp = 0 
                currentOperand = temp
                updateDisplay()
           } else {
                currentOperand = parseFloat(temp)

                // console.log(typeof currentOperand)

                updateDisplay()
           }
         
        })

        equalBtn.addEventListener('click', () => {
            calculateResults()
            updateDisplay()
        })

        clearButton.addEventListener('click', () => {
            currentOperand = 0
            previousOperand = ' '
            operation = undefined
            updateDisplay()
        })

        //adding a keyboard support

        window.addEventListener('keyup' , (e) => {
            numButtons.map(btn => {
                if(e.key === btn.textContent)  {
                    if(e.key === '.' && currentOperand.includes('.')) return
                    currentOperand += btn.textContent.toString()
                    updateDisplay()
                } 
            })

            OperationsButton.map(btn => {
                if(e.key === btn.textContent)  {
                     operation = btn.textContent
                      operate()
                     updateDisplay()
                } 
            })

            if(e.key === equalBtn.textContent) {
                   calculateResults()
                   updateDisplay()
            }

            
        })
    }

    function operate() {
        if(currentOperand === ' ') return
        if(previousOperand !== ' ') {
            calculateResults()
        }
        previousOperand = `${currentOperand} ${operation}`
        currentOperand = ' '
    }


    // logic to calculate the results

    function  calculateResults() {
        const curr = parseFloat(currentOperand)
        const prev = parseFloat(previousOperand)
        let results;



        if(isNaN(prev)  ||  isNaN(curr)) return 
          operation === '+' ? results = prev  + curr
        : operation === '-' ? results =  prev - curr
        : operation === '*' ? results = prev * curr
        : operation === '÷' && curr === 0 ? results = "Error: cannot divide by 0."
        : operation === '÷' ? results = prev / curr 
        : '';


        //Math.round((results + Number.EPSILON) * 100) / 100;
        currentOperand = results
        operation = undefined
        previousOperand = ''
    }

    function updateDisplay() {
        currentText.textContent = currentOperand
        previousText.textContent = previousOperand
    }

    handleButtons()


}

calculator();

// calls function on start of page 