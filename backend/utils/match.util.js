class Match {

    constructor() {
        this.round = 1;
        this.firstRequest = true;
        this.statusCode = 200;
    };

    reset() {
        this.round = 1;
        this.firstRequest = true;
        this.statusCode = 200;
    };

};

const match = new Match();

export { match };