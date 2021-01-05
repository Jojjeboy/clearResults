import { History } from './History';

export class Tally {
    name: string;
    increseBy: number;
    decreseBy: number;
    resetEveryDay: boolean;
    uuid: string;
    value: number;
    lastTouched: Date;
    history: Array<History>;
    goal: number;
    topScore: number;
    active: boolean;

    constructor(obj: any) {

        this.name = obj.name;
        this.increseBy = obj.increseBy;
        this.decreseBy = obj.decreseBy;
        this.resetEveryDay = obj.resetEveryDay;
        this.uuid = obj.uuid;
        this.value = obj.value;
        this.lastTouched = obj.lastTouched;
        this.history = obj.history;
        this.goal = obj.goal;
        this.topScore = obj.topScore;
        this.active = obj.active;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getIncreseBy(): number {
        return this.increseBy;
    }

    public setIncreseBy(increseBy: number): void {
        this.increseBy = increseBy;
    }

    public getDecreseBy(): number {
        return this.decreseBy;
    }

    public setDecreseBy(decreseBy: number): void {
        this.decreseBy = decreseBy;
    }

    public getResetEveryday(): boolean {
        return this.resetEveryDay;
    }

    public setResetEveryday(resetEveryDay: boolean): void {
        this.resetEveryDay = resetEveryDay;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }

    public getLastTouched(): Date {
        return this.lastTouched;
    }

    public setLastTouched(lastTouched: Date): void {
        this.lastTouched = new Date(lastTouched);
    }

    public getHistory(): Array<History> {
        return this.history;
    }

    public setHistory(history: Array<History>): void {
        this.history = history;
    }

    public touch(): void {
        this.lastTouched = new Date();
    }

    public getGoal(): number {
        return this.goal;
    }

    public setGoal(goal: number): void {
        this.goal = goal;
    }

    public getTopScore(): number {
        return this.topScore;
    }

    public setTopScore(topScore: number): void {
        this.topScore = topScore;
    }

    public getAverage(): number {
        if(this.getHistory() === undefined || this.getHistory().length < 1){
            return 0;
        }
        const tallyHistory: Array<History> = this.getHistory();
        let totalValue = 0;
        let average = 0;

        if (tallyHistory.length > 0) {
            tallyHistory.forEach( element => {
                totalValue += element.value;
            });
        }

        average = Math.abs(Math.floor(totalValue / tallyHistory.length));
        return average;
    }

    public getActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

}
