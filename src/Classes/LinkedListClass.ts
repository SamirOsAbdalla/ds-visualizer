import { NodeClass } from "./NodeClass"

interface ILinkedList {
    insertNodeBeginning(_newValue: string): NodeClass
    insertNodeEnd(_newValue: string): NodeClass
    deleteNodeBeginning(): void
    deleteNodeEnd(): void
    printValues(): void
}
export interface INodeValueId {
    nodeValue: string,
    nodeId: number
}

export class LinkedListClass implements ILinkedList {
    private head: NodeClass | null = null
    private listSize: number = 0

    public insertNodeBeginning(_newValue: string): NodeClass {
        this.listSize++;
        const newNode = new NodeClass(_newValue)
        let prevHeadNext = this.head?.next

        if (!this.head) {
            this.head = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }

        return newNode
    }
    public deleteNodeBeginning(): void {
        if (!this.head) {
            return;
        }

        this.listSize--;
        this.head = this.head.next;
    }
    public deleteNodeEnd(): void {
        if (!this.head) {
            return;
        } else {
            this.listSize--;
            if (!this.head.next) {
                this.head = null
            }

            let curPtr = this.head?.next
            let prevPtr = this.head
            while (curPtr?.next != null) {
                prevPtr = curPtr
                curPtr = curPtr.next
            }

            if (prevPtr) {
                prevPtr.next = null
            }
        }


    }
    public insertNodeEnd(_newValue: string): NodeClass {
        this.listSize++;
        const newNode = new NodeClass(_newValue)

        if (!this.head) {
            this.head = newNode
        } else {
            let currentNode = this.head;
            while (currentNode.next != null) {
                currentNode = currentNode.next
            }

            currentNode.next = new NodeClass(_newValue);
        }

        return newNode
    }
    public printValues() {

        let tmpNode: NodeClass | null = this.head
        while (tmpNode !== null) {
            console.log(tmpNode.value)
            tmpNode = tmpNode.next
        }

    }
    public getNodeArray(): any[] {
        let tmpNode: NodeClass | null = this.head

        const arr: INodeValueId[] = []

        while (tmpNode !== null) {

            arr.push({ nodeValue: tmpNode.value, nodeId: tmpNode.id })
            tmpNode = tmpNode.next
        }
        return arr
    }
}