


export let counter = 0;
export class NodeClass {

    public next: NodeClass | null = null
    public value: string = "0"
    public id: number = 0
    public color: string = ""

    constructor(_value: string, _color: string) {
        this.value = _value;
        this.color = _color
        this.id = counter++
    }

}