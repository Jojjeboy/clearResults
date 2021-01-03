import { Prio } from './prio.enum';

export class Todo {
    title: string;
    description: string;
    prio: Prio;
    uuid: string;
    updated: Date;

    constructor(title: string, description: string, prio: Prio, updated: Date, uuid: string) {
        this.setTitle(title);
        this.setDescription(description);
        this.setPrio(prio);
        this.setUpdated(updated);
        this.setUuid(uuid);
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getPrio(): Prio {
        return this.prio;
    }

    public setPrio(prio: Prio): void {
        this.prio = prio;
    }

    public getUpdated(): Date {
        return this.updated;
    }

    public setUpdated(updated: Date): void {
        this.updated = updated;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    
}
