const introContainer = document.querySelector('.js-intro-container');
const Header = document.querySelector('header');
const aboutGame = document.querySelector('.js-about-game');
const nextBtn = document.querySelector('.js-next-button');
const mainGame = document.querySelector('.js-main-game-page'); 
const argText = document.querySelector('.arg');
const optionBtns = document.querySelectorAll('.option');
const modal = document.querySelector('.js-modal-container');

const nxtArgBtn = document.querySelector('.js-modal-button2');
const tryAgain = document.querySelector('.js-modal-button1');


function showAboutGame(){
        aboutGame.innerHTML = `
            <div class="about-game2 js-about-game2">
                <p class="instruction"><span>Your Mission:</span> Think like Idris.</p>
                <p class="instruction"><span>Your Objective:</span> Choose the most stubborn, overconfident, and dramatic response — the one Idris would definitely say. 😏</p>
                <p class="hype">Can you match his energy? 😎</p>

                <div class="start-btn-div">
                <button class="start-btn js-start-btn">Start Game</button>
                </div>
            </div>    
        `;        
        startGame();
}

function startGame(){
     const startBtn = document.querySelector('.js-start-btn');
     const aboutGame2 = document.querySelector('.js-about-game2');

     startBtn.addEventListener('click', () => {
            console.log('yes')
            introContainer.classList.add('hidden');
            mainGame.classList.remove('hidden');
            Header.classList.add('hidden')
     });
}



function init(){
    nextBtn.addEventListener('click', showAboutGame)
}

init();

async function getArguments() {
    try{
            const response = await fetch('argument.json');
            const data = await response.json();  
            let index = 0;
            let current = data[index];
            argText.innerText = current.argument;
            optionBtns.innerText = current.options[index];
            
           
            
            nxtArgBtn.addEventListener('click', () => {
                index = index + 1;
                if (index < data.length){
                        current = data[index];
                    argText.innerText = current.argument;
                   
                    dispOptions();
                    modal.classList.add('hidden');
                
                } else{
                    modal.classList.add('hidden');
                    return;
                }
             
        });

        tryAgain.addEventListener('click', () => {
             modal.classList.add('hidden');
        })


          
          function dispOptions(){

            const modalTxt = document.querySelector('.js-modal-text');
             optionBtns.forEach((btn, i) => {           
                    btn.innerText = current.options[i];
                    btn.addEventListener('click', () => {
                        if(i === current.correctIndex){
                           modalTxt.innerHTML = `<p class="modal-name">IDRIS:</p> U know me too well, ha!😆`
                        } else{
                            modalTxt.innerHTML = `<p class="modal-name">IDRIS:</p>You can’t be serious… 🤨`
                        }
                        modal.classList.remove('hidden');
                    })
                });
          };
         
          dispOptions();
    } catch (error) {
        console.error('Error loading argument:', error);
        argText.innerText = `Error loading argument`
    }
}

getArguments();


