import { INode } from "./LinkedList"
import { TreeNodeClass } from "./TreeNodeClass"

interface IMinHeap {
    heapify(): void
    getMinheap(): INode[]
    insertNode(_newValue: string, _newColor: string): INode | null
}


export let minHeapCounter = 0
export class MinHeap implements IMinHeap {

    private minHeap: INode[] = []

    public maxHeapSize: number = 7
    public heapSize: number = 0
    public x: number = 0;
    public y: number = 0;
    public heapify(): void {
        let index = this.heapSize - 1
        while (index > 0) {

            let parentIndex = Math.floor((index - 1) / 2)
            let parentNode = this.minHeap[parentIndex]
            let childNode = this.minHeap[index]
            if (childNode.nodeValue < parentNode.nodeValue) {

                this.minHeap[parentIndex] = childNode
                this.minHeap[index] = parentNode
            }
            index = parentIndex
        }
    }

    public getMinheap(): INode[] {

        return this.minHeap
    }
    //INSERT================================================================

    public insertNode(_newValue: string, _newColor: string): INode | null {

        if (this.heapSize >= this.maxHeapSize) {
            return null;
        }

        let newNode: INode = { nodeColor: _newColor, nodeId: minHeapCounter, nodeValue: _newValue }
        this.minHeap.push(newNode)
        this.heapSize++;

        this.heapify()
        minHeapCounter++;

        return newNode
    }

    //======================================================================

    constructor() {
        minHeapCounter = 0
    }
}