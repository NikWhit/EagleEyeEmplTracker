const mysql = require('mysql2');

class DB {
    constructor(host, user, database) {
        this.host = host;
        this.user = user;
        this.database = database;
    }

    connect() {
        const db = mysql.createConnection(
            {
                host: this.host,
                user: this.user,
                database: this.database, 
            });
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to db;', err);
            process.exit(1);
        }
        console.log('Connected to db');
    });
    db.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed. Reconnecting...');
            this.connect();
        } else {
            throw err;
        }
    });
            return db;
    }
}
    module.exports = DB;