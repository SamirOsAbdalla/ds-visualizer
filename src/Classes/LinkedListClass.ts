import { NodeClass } from "./NodeClass"


export interface INode {
    nodeValue: string,
    nodeId: number,
    nodeColor: string
}

interface ILinkedList {
    insertNodeBeginning(_newValue: string, _newColor: string): NodeClass | null
    insertNodeEnd(_newValue: string, _newColor: string): void
    insertNodeAtPosition(node: INode, beforeOrAfter: "Before" | "After"): void
    deleteNodeBeginning(): void
    deleteNodeEnd(): void
    deleteNodeAtPosition(nodeId: number): void
    updateNode(currentNodeId: number, newColor: string, newValue: string): void
    printValues(): void
}

export class LinkedListClass implements ILinkedList {
    private head: NodeClass | null = null

    public maxSize: number = 11
    public listSize: number = 0

    //INSERT=========================================================================
    public insertNodeBeginning(_newValue: string, _newColor: string): NodeClass | null {


        if (this.listSize > this.maxSize) {
            return null
        }
        this.listSize++;
        const newNode = new NodeClass(_newValue, _newColor)
        let prevHeadNext = this.head?.next

        if (!this.head) {
            this.head = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }
        return newNode

    }

    public insertNodeEnd(_newValue: string, _newColor: string): void {
        if (this.listSize > this.maxSize) {
            return
        }
        this.listSize++;
        const newNode = new NodeClass(_newValue, _newColor)

        if (!this.head) {
            this.head = newNode
        } else {
            let currentNode = this.head;
            while (currentNode.next != null) {
                currentNode = currentNode.next
            }

            currentNode.next = newNode
        }

    }

    public insertNodeAtPosition(node: INode, beforeOrAfter: "Before" | "After"): void {

        this.listSize++
        let newNode = new NodeClass(node.nodeValue, node.nodeColor)
        if (!this.head) {
            this.head = newNode
            return;
        }

        if (beforeOrAfter == "Before") {
            if (this.head.id == node.nodeId) {
                let tmpPtr = this.head
                this.head = newNode
                newNode.next = tmpPtr
                return
            }

            let prevPtr: NodeClass | null = this.head
            let curPtr: NodeClass | null = this.head.next

            while (curPtr && curPtr?.id != node.nodeId) {
                prevPtr = curPtr
                curPtr = curPtr.next
            }

            if (curPtr) {
                prevPtr.next = newNode
                newNode.next = curPtr
            }

            return
        }

        let iter: NodeClass | null = this.head
        while (iter && iter.id != node.nodeId) {
            iter = iter.next
        }
        if (iter) {
            let tmpNext = iter.next
            iter.next = newNode
            newNode.next = tmpNext
        }

    }
    //=================================================================================


    //DELETE===========================================================================
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
    public deleteNodeAtPosition(nodeId: number): void {

        if (this.head) {
            this.listSize--
            let prevPtr: NodeClass | null = null
            let curPtr: NodeClass | null = this.head
            while (curPtr && (curPtr.id != nodeId)) {
                prevPtr = curPtr
                curPtr = curPtr.next
            }


            if (curPtr == this.head) {
                this.head = this.head.next
            } else {
                if (!curPtr) {
                    return;
                }
                if (prevPtr) {
                    prevPtr.next = curPtr.next
                }
            }
        }
    }
    //==================================================================================

    public updateNode(currentNodeId: number, newColor: string, newValue: string): void {
        let curPtr = this.head
        while (curPtr && curPtr.id != currentNodeId) {
            curPtr = curPtr.next
        }

        if (curPtr) {
            curPtr.color = newColor
            curPtr.value = newValue
        }
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

        const arr: INode[] = []

        while (tmpNode !== null) {

            arr.push({ nodeValue: tmpNode.value, nodeId: tmpNode.id, nodeColor: tmpNode.color })
            tmpNode = tmpNode.next
        }
        return arr
    }
}