const gameTitle = document.querySelector("#level-title")
const allButtons = document.getElementsByClassName("btn")

const green = document.querySelector('#green')
const red = document.querySelector('#red')
const blue = document.querySelector('#blue')
const yellow = document.querySelector('#yellow')

const buttons = [red, green, blue, yellow]
const colors = ['red', 'green', 'yellow', 'blue']
let computerPattern = []
let userPattern = []
let gameStarted = false
let level = 0

//generating computer patterns and storing output
function computerSequence() {
    userPattern=[] //solution
    ++level
    gameTitle.textContent = `Level: ${level}`
    const randomNum = Math.floor(Math.random() * 4)
    computerPattern.push(colors[randomNum])
    playSequence(colors[randomNum])
}

//for flashing the buttons and creating sounds
function playSequence(colorName) {
    let audio = new Audio(`/sounds/${colorName}.mp3`)
    audio.play()
    for (const color of buttons) {
        if (color.id == colorName) {
            color.style.visibility = 'hidden'
            setTimeout(() => {
                color.style.visibility = 'visible'
            }, 100);
        }
    }
}

function tallySequence(level) {
        if (userPattern[level] === computerPattern[level]) {
            if (userPattern.length === computerPattern.length) {
                setTimeout(() => {
                    computerSequence()
                }, 1000);
            }
        }
        else {
            document.body.style.backgroundColor = 'red'
            gameTitle.textContent = 'Press Any Key To Restart'
            gameStarted = false
            let wrong = new Audio('/sounds/wrong.mp3')
            setTimeout(()=>{
               wrong.play() 
            },300)
        }
}


//tracking and storing user pattern
for (const button of allButtons) {
    button.addEventListener('click', (e) => {
        userPattern.push(e.target.id)
        playSequence(e.target.id)
        tallySequence(userPattern.length-1)
    })
}


//add event listeners to during first game start
if (gameStarted == false) {
    document.addEventListener('keypress', function startGame() {
        document.removeEventListener('keypress', startGame)
        gameStarted = true
        computerSequence()
    })
}