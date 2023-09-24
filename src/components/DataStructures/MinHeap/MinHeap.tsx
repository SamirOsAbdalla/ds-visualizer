import React from 'react'
import Toolbar from '@/components/Toolbar/Toolbar'
import { useState, useEffect } from 'react'
import { INode } from '@/Classes/LinkedList'
import "./MinHeap.css"
import DsWrapper from '@/components/DsWrapper/DsWrapper'
import { MinHeap } from '@/Classes/MinHeapClass'
const operationsArray = ["Insert Node"]

let minHeap: MinHeap | null = null



const MinHeapDs = () => {

    let canvas: HTMLCanvasElement | null;
    let ctx: CanvasRenderingContext2D | null;

    const [chosenOperation, setChosenOperation] = useState<string>(operationsArray[0])
    const [heap, setHeap] = useState<INode[]>([])
    const [nodeColor, setNodeColor] = useState<string>("#eb7389")
    const [nodeValue, setNodeValue] = useState<string>("0")
    const resetClass = () => {
        minHeap = null
        minHeap = new MinHeap()
        setNodeValue("0")
        setNodeColor("#eb7389")
        minHeap.insertNode("0", "#eb7389")
        minHeap.insertNode("1", "#eb7389")
        minHeap.insertNode("2", "#eb7389")
        minHeap.insertNode("3", "#eb7389")
        minHeap.insertNode("4", "#eb7389")
        setHeap([...minHeap.getMinheap()])
    }

    const getHeapNodes = () => {
        if (minHeap) {
            setHeap([...minHeap.getMinheap()])
        }
    }
    const handleOperationClick = () => {
        switch (chosenOperation) {
            case ("Insert Node"): {
                minHeap?.insertNode(nodeValue, nodeColor)
                getHeapNodes()
                break;
            }
        }
    }

    const drawMinHeap = () => {
        if (heap.length == 0) {
            return;
        }


        // let numLevels = Math.ceil(Math.log10(heap?.length + 1) / Math.log10(2))
        // for (let level = 0; level < ; level++) {

        //     for (let levelIndex = 0; levelIndex <; levelIndex++) {

        //     }
        // }
    }


    useEffect(() => {
        resetClass()
        canvas = document.querySelector(".minheap__tree") as HTMLCanvasElement
        ctx = canvas?.getContext("2d")

        drawMinHeap()
    }, [])

    return (
        <DsWrapper>
            <Toolbar
                operationsArray={operationsArray}
                chosenOperation={chosenOperation}
                setChosenOperation={setChosenOperation}
                nodeValue={nodeValue}
                setNodeValue={setNodeValue}
                nodeColor={nodeColor}
                setNodeColor={setNodeColor}
            />
            <div className="operation__buttons">
                {chosenOperation == "Insert Node" ?
                    <button onClick={handleOperationClick} className="operation__button">
                        Insert
                    </button>
                    :
                    <></>
                }
                <button onClick={resetClass} className="operation__button">
                    Reset
                </button>
            </div>
            <div className="minheap__visuals">
                <div className="minheap__array">
                    {heap.map((heapNode: INode) => {
                        return (
                            <div style={{ borderColor: heapNode.nodeColor }}
                                key={heapNode.nodeId} className="minheap__node">
                                {heapNode.nodeValue}
                            </div>
                        )
                    })}
                </div>
                <canvas width="1200" height="600" className="minheap__tree">

                </canvas>
            </div>

        </DsWrapper>
    )
}

export default MinHeapDs
