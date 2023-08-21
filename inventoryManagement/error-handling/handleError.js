// צור פונקציה שמקבלת את אובייקט התגובה, שגיאה וסטאטוס עם ערך דיפולטיבי של 400
// הפונקציה תדפיס בקונסול בצבע אדום את הודעת השגיאה
// הפונקציה תחזיר סטאטוס לפי הסטאטוס שנשלח או 400 ואת הודעת השגיאה
// ליצא את הפונקציה מהמודול
const handleError = (res, err, statusCode=400, message='Something went wrong') => {
    console.error(err);
    res.status(statusCode).send(message);
}

module.exports = handleError;