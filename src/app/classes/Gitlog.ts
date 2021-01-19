export class Gitlog {
    commithash: number;
    date: Date;
    message: string;

    constructor(obj: any) {

        this.commithash = obj.commithash;
        this.date = new Date(obj.date);
        this.message = obj.message;
    }
}
