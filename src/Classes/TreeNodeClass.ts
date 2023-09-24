


export let treeCounter = 0;
export class TreeNodeClass {

    public left: TreeNodeClass | null = null
    public right: TreeNodeClass | null = null

    public value: string = "0"
    public id: number = 0
    public color: string = ""

    constructor(_value: string, _color: string) {
        this.value = _value;
        this.color = _color
        this.id = treeCounter++
    }

}