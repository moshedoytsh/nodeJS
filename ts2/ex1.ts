// Step 1: נתון לכם אינאם - אתם רשאים להפוך אותו למשהו אחר
export enum ItemType {
  Book = 'book',
  DVD = 'dvd',
}

// Step 2:  ספר צריך להכיל שדות
interface Book {
  type: ItemType.Book
  title: string
  author: string
}

interface DVD {
  type: ItemType.DVD
  title: string
  duration: number
}

type item = Book | DVD;

type filterItemsCB = (element: item) => boolean;

// Step 3: פונקציה מקבלת מערך של פריטים, ופונקצית פילטור. ומחזירה מערך מפולטר של פריטים
function filterItems(items: item[], filterFn: filterItemsCB): item[] {
  return items.filter(filterFn);
}

// Step 4: הפונקציה מקבלת מערך של פריטים ומדפיסה את כל המידע הרלוונטי לגבי כל פריט
function printItemsData(items: item[]) {
  for (let i of items) {
    console.log('type:', i.type);
    console.log('title:', i.title);
    if ('author' in i) console.log('author:', i.author);
    else console.log('duration:', i.duration);
  }
}

// Test data
const libraryItems: (Book | DVD)[] = [
  { type: ItemType.Book, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { type: ItemType.DVD, title: 'Inception', duration: 148 },
  { type: ItemType.Book, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { type: ItemType.DVD, title: 'Avatar', duration: 162 },
  { type: ItemType.Book, title: 'Go Set a Watchman', author: 'Harper Lee' },
]

// Step 5:  הדפיסו את כל המידע הנתון 
printItemsData(libraryItems);
// Step 6: ממשו את פונקצית הפילטור כך שתחזיר סרטים ארוכים משעתיים והדפיסו את המערך 
const TWO_HOURS: number = 120;
function DVDLongerThan2H (element: item): boolean {
  return (element.type === ItemType.DVD && element.duration > TWO_HOURS);
}

printItemsData(filterItems(libraryItems, DVDLongerThan2H));

// Step 7:  Harper Lee ממשו את פונקצית הפילטור כך שתחזיר רק ספרים של
function bookOfHarperLee (element: item): boolean {
  return (element.type === ItemType.Book && element.author === 'Harper Lee');
}

printItemsData(filterItems(libraryItems, bookOfHarperLee));
