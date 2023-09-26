import React from 'react'
import Toolbar from '@/components/Toolbar/Toolbar'
import { useState, useEffect } from 'react'
import { INode } from '@/Classes/LinkedList'
import "./MinHeap.css"
import DsWrapper from '@/components/DsWrapper/DsWrapper'
import { MinHeap } from '@/Classes/MinHeapClass'
import { motion } from "framer-motion"

const operationsArray = ["Insert Node", "Delete Node"]

let minHeap: MinHeap | null = null

const animations = {
    inital: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 }
}

let id = 0;
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
                let result = minHeap?.insertNode(nodeValue, nodeColor)
                if (!result) {
                    return;
                }
                getHeapNodes()
                break;
            }
        }
    }

    const getHeapTreeArray = () => {
        if (heap.length == 0) {
            return;
        }

        let jsxArray: any[] = []


        //using 2^(k+1)-1 formula but inverse in order to solve for k
        let numLevels = Math.ceil(Math.log10(heap?.length + 1) / Math.log10(2))

        //keep track of the node value to render inside the circle
        let currentArrayIndex = 0;
        for (let level = 0; level < numLevels; level++) {

            //the number of nodes to render is determined by the current height of the
            //tree as well as how many nodes are actually left to render
            let maxLevelIndex = 0;
            if (level == 0) {
                maxLevelIndex = 1
            } else if (level == numLevels - 1) {

                maxLevelIndex = heap.length - (Math.pow(2, (level)) - 1)
            } else {
                maxLevelIndex = 2 * (level)
            }

            //since cant append JSX (I think) unfortunately have to loop through 
            //another array to return a whole JSX element
            let curJsxArray: any[] = []


            //I can't figure out a general formula for the style at the moment.
            //But, since I restricted the max number of tree nodes to a small number
            //the switch statement isn't that bad (albeit each of the numbers are a bit contrived)

            for (let levelIndex = 0; levelIndex < maxLevelIndex; levelIndex++) {
                let left;
                let top;
                let rotate;
                let arrowTop;
                let arrowOffset;
                let arrowRotate;
                switch (currentArrayIndex) {
                    case (0): {
                        left = 0;
                        top = 0;
                        arrowTop = 2
                        arrowOffset = 0
                        arrowRotate = 20
                        break;
                    }
                    case (1): {
                        left = -9;
                        top = -1.8;
                        arrowTop = 4;
                        arrowOffset = -2
                        arrowRotate = 70;
                        break;
                    }
                    case (2): {
                        left = 9;
                        top = -1.8;
                        arrowTop = 4;
                        arrowOffset = -2
                        arrowRotate = 70;
                        break;
                    }
                    case (3): {
                        left = -13.5;
                        top = 1;
                        break;
                    }
                    case (4): {
                        left = -4.5;
                        top = 1;
                        break;
                    }
                    case (5): {
                        left = 4.5;
                        top = 1;
                        break;
                    }
                    case (6): {
                        left = 13.5;
                        top = 1;
                        break;
                    }
                }

                curJsxArray.push(
                    <motion.div className='motion__div'{...animations} layout key={id}>
                        <div style={{ top: `${top}em`, left: `${left}em` }} className="heapnodearrow__container" >
                            <div style={{
                                top: `${arrowTop}em`, right: `${arrowOffset}em`, rotate: `-${arrowRotate}deg`,
                                opacity: `${level == numLevels - 1 ? "0" : "1"}`
                            }}
                                className='heapnode__arrow heapnodearrow__left'>

                            </div>
                            <div
                                style={{ borderColor: heap[currentArrayIndex].nodeColor }}
                                className={`${chosenOperation == "Delete Node" ? "node__hover" : ""} heapnode__circle`}
                                id={currentArrayIndex.toString()}
                                onClick={(e) => handleNodeClick(e.currentTarget.id)}
                            >
                                {heap[currentArrayIndex].nodeValue}
                            </div>
                            <div style={{ top: `${arrowTop}em`, left: `${arrowOffset}em`, rotate: `${arrowRotate}deg`, opacity: `${level == numLevels - 1 ? "0" : "1"}` }}
                                className='heapnode__arrow heapnodearrow__right'>

                            </div>
                        </div >
                    </motion.div>
                )
                id++;
                currentArrayIndex++
            }

            jsxArray.push(

                <div key={id} className="heapnode__container">
                    {curJsxArray.map(node => node)}
                </div>

            )
            id++;

        }

        return jsxArray
    }

    const handleNodeClick = (currentArrayIndex: string) => {
        if (chosenOperation !== "Delete Node") {
            return;
        }
        const arrayIndex = parseInt(currentArrayIndex)

        const tmpArray = [...heap]
        tmpArray.splice(arrayIndex, 1)
        setHeap(tmpArray)
    }
    const returnMinHeapText = () => {
        switch (chosenOperation) {
            case ("Insert Node"): {
                return (
                    <>
                        The purpose of a min heap is to keep the minimum node at the top
                        of the tree as well as have each child node be greater (the value it holds is larger)
                        than its parent node.<br /><br />

                        As you may have noticed, a min heap is traditionally represented as an
                        array, where the left and right child nodes of a parent node whose
                        position is at index  "i" are at positions 2*i+1 and 2*i+2 in the array respectively.
                        <br /><br />

                        When a new node is inserted into the heap, that node must be checked against
                        its parent node to ensure that the parent node's value is still in fact smaller
                        than the child node. If not, a swap operation takes place until the array
                        once again satisfies the conditions of a min heap.
                    </>
                )
            }
            case ("Delete Node"): {
                return (
                    <>
                        To delete a node in a min heap, you want to replace it with its right most child then heapify
                        the array to ensure that the array follows the rules of a min heap, which is that each child
                        node has a smaller value than its parent node.
                    </>
                )
            }
        }
    }
    useEffect(() => {
        resetClass()

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
            </div>
            <div className="minheap__tree__container">
                {getHeapTreeArray()?.map(node => node)}
            </div>
            <p className="minheap__text">
                {returnMinHeapText()}
            </p>
        </DsWrapper>
    )
}

export default MinHeapDs
