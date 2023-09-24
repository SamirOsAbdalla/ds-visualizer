import { NodeClass } from "./NodeClass"


export interface INode {
    nodeValue: string,
    nodeId: number,
    nodeColor: string
}

interface ILinkedList {
    insertNodeBeginning(_newValue: string, _newColor: string): INode | null
    insertNodeEnd(_newValue: string, _newColor: string): INode | null
    insertNodeAtPosition(node: INode, beforeOrAfter: "Before" | "After"): INode | null
    deleteNodeBeginning(): void
    deleteNodeEnd(): void
    deleteNodeAtPosition(nodeId: number): void
    reverseList(): void
    updateNode(currentNodeId: number, newColor: string, newValue: string): void
    printValues(): void
}

export class LinkedList implements ILinkedList {
    private head: NodeClass | null = null

    public maxSize: number = 8
    public listSize: number = 0

    //INSERT=========================================================================
    public insertNodeBeginning(_newValue: string, _newColor: string): INode | null {


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

        let returnNode: INode = {
            nodeValue: _newValue,
            nodeId: newNode.id,
            nodeColor: _newColor
        }
        return returnNode

    }

    public insertNodeEnd(_newValue: string, _newColor: string): INode | null {
        if (this.listSize > this.maxSize) {
            return null
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

        return {
            nodeValue: _newValue,
            nodeId: newNode.id,
            nodeColor: _newColor
        }

    }

    public insertNodeAtPosition(node: INode, beforeOrAfter: "Before" | "After"): INode | null {

        if (this.listSize > this.maxSize) {
            return null
        }

        this.listSize++
        let newNode = new NodeClass(node.nodeValue, node.nodeColor)

        let returnNode: INode = {
            nodeColor: node.nodeColor,
            nodeValue: node.nodeValue,
            nodeId: newNode.id
        }
        if (!this.head) {
            this.head = newNode
            return returnNode;
        }

        if (beforeOrAfter == "Before") {
            if (this.head.id == node.nodeId) {
                let tmpPtr = this.head
                this.head = newNode
                newNode.next = tmpPtr
                return returnNode
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

            return returnNode
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
        return returnNode
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

    public reverseList(): void {

        if (this.head) {
            let prevPtr: NodeClass | null = null
            let curPtr: NodeClass | null = this.head

            while (curPtr) {
                let tmpNext: NodeClass | null = curPtr.next
                curPtr.next = prevPtr
                prevPtr = curPtr
                curPtr = tmpNext
            }
            this.head = prevPtr

        }
        return;

    }
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