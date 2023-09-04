"use strict";
// כל אובייקט מחויב בממשק או טיפוס
//1.
// כתוב פונקציה שמקבלת מערך של מספרים ומחזירה את הסכום של כל המספרים הזוגיים במערך.
const sumEvenNumbers = (numbers) => {
    const evens = numbers.filter(n => !(n & 1));
    return evens.reduce((a, b) => a + b, 0);
};
console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(sumEvenNumbers([]));
// 2.
// כתוב פונקציה שמקבלת אובייקט עם שני שדות: רוחב וגובה ומחזירה שטח של מלבן עם מידות אלו.
const area = (width, height) => {
    return width * height;
};
console.log(area(2, 3));
// 3.
// כתוב פונקציה שמקבלת מחרוזת ומחזירה אמת אם המחרוזת היא פלינדרום ושקר אם לא.
// פלינדרום היא מחרוזת שאפשר לקרוא אותה אותו הדבר מהסוף להתחלה.
// דוגמאות: אבא, אמא, שמש, ילד כותב בתוך דלי,1235321
const isPalindrome = (str) => {
    const reversed = str.split('').reverse().join('');
    return str.toLowerCase() === reversed.toLowerCase();
};
console.log(isPalindrome('Nan'));
console.log(isPalindrome('a'));
console.log(isPalindrome('aa'));
console.log(isPalindrome('ab'));
//4.
// כתוב פונקציה שמקבלת מערך של מחרוזות
// הפונקציה מחזירה מערך חדש של מחרוזות שבו האות הראשונה של כל מילה 'גדולה' ושאר האותיות 'קטנות' - לדוגמה
// uppEr -> Upper
const capitalize = (strings) => {
    return strings.map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
};
console.log(capitalize(['lower case', 'UPPER CASE', 'Camel Case']));
// 5.
// כתוב פונקציה שמקבלת מערך של מספרים ומחזירה מערך חדש עם המספרים הייחודיים בלבד (הסרת כפילויות).
const distinct = (numbers) => {
    const uniq = [];
    numbers.forEach((n) => {
        if (!uniq.includes(n))
            uniq.push(n);
    });
    return uniq;
};
console.log(distinct([11, 1, 2, 2, 3, 3]));
console.log(distinct([]));
const getInitials = (fullName0) => {
    return {
        firstName: fullName0.firstName.charAt(0).toUpperCase(),
        lastNAme: fullName0.lastName.charAt(0).toUpperCase()
    };
};
console.log(getInitials({ firstName: 'moshe', lastName: 'doytsh' }));
const getAverageAge = (people) => {
    let sum = people.map(p => p.age).reduce((a, b) => a + b, 0);
    return sum / people.length;
};
const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 28 }
];
const averageAge = getAverageAge(people);
console.log("Average age:", averageAge);
const findMinAndMax = (array) => {
    const min = Math.min(...array);
    const max = Math.max(...array);
    return { min, max };
};
console.log(findMinAndMax([1, 2, 3, 4, 5, 6, 7, 8, 9]));
// 9.
// כתוב פונקציה שמקבלת מערך ומדפיסה אותו בסדר הפוך
const logReversedArray = (array) => {
    const reversed = [...array].reverse();
    reversed.forEach(value => console.log(value));
};
logReversedArray([1, 2, 3, 'a', 'b', 'c', true, false]);
