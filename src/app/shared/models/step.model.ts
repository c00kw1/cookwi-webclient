export class Step {
    
    constructor(stepNumber: number, content: string) {
        this.stepNumber = stepNumber;
        this.content = content;
    }

    public stepNumber: number;
    public content: string;
}