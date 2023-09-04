"use strict";
// בנו תכנית שמדמה את המשחק אבן נייר ומספריים
// התכנית תגדיר מי המנצח לפי חוקיות המשחק
// אבן מנצח מספריים שמנצחות נייר שמנצח אבן
var ChoiceEnum;
(function (ChoiceEnum) {
    ChoiceEnum[ChoiceEnum["rock"] = 0] = "rock";
    ChoiceEnum[ChoiceEnum["paper"] = 1] = "paper";
    ChoiceEnum[ChoiceEnum["scissors"] = 2] = "scissors";
})(ChoiceEnum || (ChoiceEnum = {}));
const options = {
    rockrock: 'tie',
    rockpaper: 'player2',
    rockscissors: 'player1',
    paperrock: 'player1',
    paperpaper: 'tie',
    paperscissors: 'player2',
    scissorsrock: 'player2',
    scissorspaper: 'player1',
    scissorsscissors: 'tie',
};
function playGame(player1, player2) {
    if (typeof player1 === 'undefined' || typeof player2 === 'undefined') {
        throw new Error("choice must be either rock, paper or scissors");
    }
    return options[player1 + player2];
}
const play = playGame('rock', 'scissors');
console.log(play);
//Output: player1 or player2 or tie
