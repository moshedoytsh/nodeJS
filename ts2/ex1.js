"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = void 0;
// Step 1: נתון לכם אינאם - אתם רשאים להפוך אותו למשהו אחר
var ItemType;
(function (ItemType) {
    ItemType["Book"] = "book";
    ItemType["DVD"] = "dvd";
})(ItemType || (exports.ItemType = ItemType = {}));
// Step 3: פונקציה מקבלת מערך של פריטים, ופונקצית פילטור. ומחזירה מערך מפולטר של פריטים
function filterItems(items, filterFn) {
    return items.filter(filterFn);
}
// Step 4: הפונקציה מקבלת מערך של פריטים ומדפיסה את כל המידע הרלוונטי לגבי כל פריט
function printItemsData(items) {
    for (let i of items) {
        console.log('type:', i.type);
        console.log('title:', i.title);
        if ('author' in i)
            console.log('author:', i.author);
        else
            console.log('duration:', i.duration);
    }
}
// Test data
const libraryItems = [
    { type: ItemType.Book, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { type: ItemType.DVD, title: 'Inception', duration: 148 },
    { type: ItemType.Book, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { type: ItemType.DVD, title: 'Avatar', duration: 162 },
    { type: ItemType.Book, title: 'Go Set a Watchman', author: 'Harper Lee' },
];
// Step 5:  הדפיסו את כל המידע הנתון 
printItemsData(libraryItems);
// Step 6: ממשו את פונקצית הפילטור כך שתחזיר סרטים ארוכים משעתיים והדפיסו את המערך 
const TWO_HOURS = 120;
function DVDLongerThan2H(element) {
    return (element.type === ItemType.DVD && element.duration > TWO_HOURS);
}
printItemsData(filterItems(libraryItems, DVDLongerThan2H));
// Step 7:  Harper Lee ממשו את פונקצית הפילטור כך שתחזיר רק ספרים של
function bookOfHarperLee(element) {
    return (element.type === ItemType.Book && element.author === 'Harper Lee');
}
printItemsData(filterItems(libraryItems, bookOfHarperLee));
