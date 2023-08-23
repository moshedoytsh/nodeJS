
// בנו תכנית שמדמה את המשחק אבן נייר ומספריים
// התכנית תגדיר מי המנצח לפי חוקיות המשחק
// אבן מנצח מספריים שמנצחות נייר שמנצח אבן

// דגשים
// שחקן  יכול לבחור בין אבן נייר ומספרים בלבד! אך שחקן יכול שלא תהיה לו בחירה
// התכנית יכולה להחזיר את המחרוזות
// 'tie', 'player1', 'player2' 
// התשובה חייבת להכיל
// ENUM
// type/interface
// union
// במידה ולשחקן אין בחירה הצג זרקו שגיאה
// ממשו את הפונקציה הוסיפו טיפוסים לפרמטרים ולערך החזרה של הפונקציה


type winnerMessage = 'player1' | 'player2' | 'tie';

enum ChoiceEnum {
    rock,
    paper,
    scissors,
}

type choiceType = keyof typeof ChoiceEnum;

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
}

function playGame(player1: choiceType | undefined, player2: choiceType | undefined): winnerMessage {
    if (typeof player1 === 'undefined' || typeof player2 === 'undefined') {
        throw new Error("choice must be either rock, paper or scissors");
    }
    return options[player1 + player2];
}

const play = playGame('rock', 'scissors');
console.log(play);
//Output: player1 or player2 or tie
