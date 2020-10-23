const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//vira a carta
function flipCard() {

    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    secondCard = this;

    hasFlippedCard = false;

    checkforMatch();
}

function checkforMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();

        return;
    }

    unflipCards();
}
//Desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}
//Desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);    
}
// Reset tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
//Embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    });
})();
//Adiciona o evento click na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})