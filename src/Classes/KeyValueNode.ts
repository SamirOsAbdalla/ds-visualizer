

export let kvID = 0;
export class KeyValueNode {

    public key: any;
    public value: any;
    public id: number = 0

    constructor(_key: any, _value: any) {
        this.key = _key
        this.value = _value;
        this.id = kvID++
    }

}