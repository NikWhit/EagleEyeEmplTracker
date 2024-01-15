const Main = require('./Main.js');

class CLI {
    constructor() {

    }
    run() {
        console.log('Welcome to the terminal system');
        const main = new Main;
        main.show();
    }
}
module.exports = CLI;