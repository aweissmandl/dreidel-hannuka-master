const PLAYERS = [];
const GAME_STATE = {
    potBalance: 0,
    currentPlayer: 0
};

const DREIDEL_CHARS = [{
    char : 'n',
    func : () => {}
},{
    char : 'g',
    func : () => {
        PLAYERS[GAME_STATE.currentPlayer].balance += GAME_STATE.potBalance;
        GAME_STATE.potBalance = 0;
    }
},{
    char : 'h',
    func : () => {
        let halfOfBal = Math.ceil(GAME_STATE.potBalance / 2);
        PLAYERS[GAME_STATE.currentPlayer].balance += halfOfBal;
        GAME_STATE.potBalance -= halfOfBal;
    }
},{
    char : 's',
    func : () => {
        PLAYERS[GAME_STATE.currentPlayer].balance--;
        GAME_STATE.potBalance++;
    }
}];

function startGame() {
    for (let i of [0, 1, 2]) {
        let name = document.getElementById(`player-${i}`).value;
        if (!name) return alert(`Missing player name for #${i + 1}`);

        PLAYERS.push({
            name,
            balance: 5
        });
    }

    document.getElementById('start-game-form').style.display = 'none';

    document.getElementById('game-board').style.display = 'flex';

    gatherTokensFromAll();
    populateBoard();

}



function populateBoard() {
    
    displayPotBalance();

    toggBcgColor(GAME_STATE.currentPlayer, true);

    populatePlayers();

}

function populatePlayers(){
    let tbody = document.getElementById('tbody');

    for (let i = 0; i < tbody.children.length; i++) {
        let tr = tbody.children[i];

        tr.children[0].innerHTML = i + 1;
        tr.children[1].innerHTML = PLAYERS[i].name;
        tr.children[2].innerHTML = PLAYERS[i].balance;
        tr.children[3].innerHTML = PLAYERS[i].balance ? 'Active' : 'Out';
    }
}


function displayPotBalance() {
    let el = document.getElementById('pot-bal-span');
    el.innerHTML = GAME_STATE.potBalance;
}

function toggBcgColor(index, add) {
    let currentPlayerTR = document.querySelector(`#tbody > :nth-child(${index + 1})`);
    currentPlayerTR.classList.toggle('bg-teal', add);
}


function gatherTokensFromAll() {
    if(GAME_STATE.potBalance > 0) return;
    for (let player of PLAYERS) {
        if (player.balance == 0) continue;
        player.balance--;
        GAME_STATE.potBalance++;
    }
}

function spinDreidel(){
    //remove the background color from curernt plalyer
    toggBcgColor(GAME_STATE.currentPlayer, false);
    //0-3
    let randomNumber = Math.floor(Math.random() * 4);
    let drawnCharObj = DREIDEL_CHARS[randomNumber];
    document.getElementById('char-img').src = `./images/${drawnCharObj.char}.jpg`;
    drawnCharObj.func();
    gatherTokensFromAll();
    findNextPlayer(GAME_STATE.currentPlayer);
    populateBoard();
}


function findNextPlayer(originalPlayer){
    GAME_STATE.currentPlayer++;
    if(GAME_STATE.currentPlayer == PLAYERS.length) GAME_STATE.currentPlayer = 0;
    if(originalPlayer == GAME_STATE.currentPlayer) return alertWinner();
    if(PLAYERS[GAME_STATE.currentPlayer].balance == 0) findNextPlayer(originalPlayer);
}

function alertWinner(){
    alert(`We have a winner, his name is ${PLAYERS[GAME_STATE.currentPlayer].name}`);
}