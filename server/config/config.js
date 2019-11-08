// Puerto

process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Data Base

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe-udemy';
} else {
    urlDB = 'mongodb+srv://root:nae8iUisVFPNoYDt@cluster0-ibrfv.mongodb.net/cafe-udemy';
}

process.env.URLDB = urlDB;


