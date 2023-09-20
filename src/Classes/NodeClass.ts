


let counter = 0;
export class NodeClass {

    public next: NodeClass | null = null
    public value: string = "0"
    public id: number = 0

    constructor(_value: string) {
        this.value = _value;
        this.id = counter++
    }

}