"use client"
import React from 'react'
import Toolbar from '@/components/Toolbar/Toolbar'
import { LinkedListClass } from '@/Classes/LinkedListClass'
import { useEffect, useState, Fragment } from 'react'
import "./LinkedList.css"
import { INode } from '@/Classes/LinkedListClass'
import { counter } from '@/Classes/NodeClass'
import DsWrapper from '@/components/DsWrapper/DsWrapper'

const operationsArray: string[] = [
    "Insert Node Beginning",
    "Delete Node Beginning",
    "Insert Node End",
    "Delete Node End",
    "Insert At Position",
    "Delete At Position",
    "Update Node",
    "Reverse List",
]


let linkedList: LinkedListClass | null = new LinkedListClass()

const LinkedListDS = () => {


    const [chosenOperation, setChosenOperation] = useState<string>(operationsArray[0])
    const [nodeArray, setNodeArray] = useState<INode[]>([])
    const [nodeColor, setNodeColor] = useState<string>("#eb7389")
    const [nodeValue, setNodeValue] = useState<string>("0")
    const [insertModalStatus, setInsertModalStatus] = useState<"Open" | "Closed">("Closed")
    const [modalId, setModalId] = useState<string>("-1")
    const [checkedBefore, setCheckedBefore] = useState<boolean>(false)
    const [checkedAfter, setCheckedAfter] = useState<boolean>(false)

    const reverseList = () => {
        let tmpNodeArr = [...nodeArray]
        setNodeArray(tmpNodeArr.reverse())
    }
    const getLinkedListNodes = () => {
        if (linkedList) {
            setNodeArray(linkedList.getNodeArray())
        }

    }

    const handleOperationClick = () => {
        switch (chosenOperation) {
            case ("Insert Node Beginning"): {
                const returnedNode = linkedList?.insertNodeBeginning(nodeValue, nodeColor)
                if (returnedNode == null) {
                    return;
                }

                const newNodeId = returnedNode.id.toString()

            }
        }
    }

    const resetClass = () => {
        linkedList = null
        linkedList = new LinkedListClass()
        setNodeColor("#eb7389")
        setNodeValue("0")
        linkedList.insertNodeBeginning("2", "#eb7389")
        linkedList.insertNodeBeginning("1", "#eda0ae")
        linkedList.insertNodeBeginning("0", "#ef3456")
        getLinkedListNodes()
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
                nodeColor={nodeColor}
                setNodeColor={setNodeColor}
                nodeValue={nodeValue}
                setNodeValue={setNodeValue}
            />



            <div className="operation__buttons">
                {chosenOperation == "Insert Node Beginning" ?
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

            <div className="linkedlist">
                <div className="linkedlist__head">
                    {nodeArray && nodeArray.length > 0 &&
                        <>
                            <span>Head</span>
                            <div className="node__arrow__down">

                            </div>
                        </>
                    }
                </div>
                <div className="linkedlist__nodes fade">
                    {nodeArray?.map((node, index) => {

                        const currentNodeId = node.nodeId.toString()
                        return (
                            <div className="linkedlist__node" id={currentNodeId} key={node.nodeId}>
                                <div className="node__circle">
                                    {node.nodeValue}
                                </div>
                                <div className="node__arrow">

                                </div>
                            </div>
                        )



                    })}
                </div>
            </div>
        </DsWrapper>
    )
}
export default LinkedListDS
