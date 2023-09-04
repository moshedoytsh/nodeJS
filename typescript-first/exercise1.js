"use strict";
// 1
const bigger = (a, b) => {
    return a > b ? a : b;
};
console.log(bigger(1, 2));
// 2
const logBigger = (a, b) => {
    console.log(a > b ? a : b);
};
logBigger(1, 2);
// 3
const isEven = (n) => {
    return n & 1 ? 'Odd number' : 'Even number';
};
console.log(isEven(1));
console.log(isEven(2));
// 4
const lengthOfString = (str) => {
    return str.length;
};
console.log(lengthOfString('four'));
// 5
const range = (upper) => {
    const array = [];
    for (let i = 1; i <= upper; i++)
        array.push(i);
    return array;
};
console.log(range(10));
// 6
const max = (array) => {
    return Math.max(...array);
};
console.log(max([1, 2, 3, 4, 5, 6, 7, 8, 9]));
;
// 8
const printPerson = (person) => {
    console.log('Person:');
    console.log('\tname:', person.name);
    console.log('\tage:', person.age);
    console.log('\tis student:', person.isStudent);
};
printPerson({ name: 'John', age: 42, isStudent: true });
// 9
const isMinor = (person) => {
    return person.age < 18 ? true : false;
};
console.log(isMinor({ name: 'John', age: 42, isStudent: true }));
;
;
// 12
const oldestReader = (readers) => {
    let oldest = readers[0];
    for (let i of readers) {
        if (i.age > oldest.age)
            oldest = i;
    }
    ;
    return oldest;
};
// 13
const oldestBook = (books) => {
    let oldest = books[0];
    for (let i of books) {
        if (i.year < oldest.year)
            oldest = i;
    }
    ;
    return oldest;
};
// test 12 and 13
const books = [
    { title: 'Book A', author: 'Author A', year: 2000 },
    { title: 'Book B', author: 'Author B', year: 1995 },
    { title: 'Book C', author: 'Author C', year: 2010 },
    { title: 'Book D', author: 'Author D', year: 1985 },
];
const readers = [
    { name: 'Reader 1', age: 25, isStudent: true, favoriteBook: books[0] },
    { name: 'Reader 2', age: 30, isStudent: false, favoriteBook: books[1] },
    { name: 'Reader 3', age: 22, isStudent: true, favoriteBook: books[2] },
    { name: 'Reader 4', age: 40, isStudent: false, favoriteBook: books[3] },
];
const oldestReaderResult = oldestReader(readers);
console.log('Oldest Reader:', oldestReaderResult);
const oldestBookResult = oldestBook(books);
console.log('Oldest Book:', oldestBookResult);
