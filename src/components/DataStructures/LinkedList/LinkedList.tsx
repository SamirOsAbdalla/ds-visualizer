"use client"
import React from 'react'
import LLToolbar from '@/components/Toolbars/LinkedListToolbar/LLToolbar'
import { LinkedListClass } from '@/Classes/LinkedListClass'
import { useEffect, useState, Fragment } from 'react'
import "./LinkedList.css"
import { INodeValueId } from '@/Classes/LinkedListClass'

const operationsArray: string[] = [
    "Insert Node Beginning",
    "Delete Node Beginning",
    "Insert Node End",
    "Delete Node End",
    "Insert At Position",
    "Reverse List"
]
let linkedList: LinkedListClass | null = new LinkedListClass()

const LinkedListDS = () => {

    const [chosenOperation, setChosenOperation] = useState<string>(operationsArray[0])
    const [nodeArray, setNodeArray] = useState<INodeValueId[]>([])
    const [nodeColor, setNodeColor] = useState<string>("#eb7389")
    const [nodeValue, setNodeValue] = useState<string>("0")


    const reverseList = () => {
        let tmpNodeArr = [...nodeArray]
        setNodeArray(tmpNodeArr.reverse())
    }

    const handleOperationClick = () => {
        switch (chosenOperation) {
            case ("Insert Node Beginning"): {
                linkedList?.insertNodeBeginning(nodeValue)
                break;
            }
            case ("Delete Node Beginning"): {
                linkedList?.deleteNodeBeginning()
                break;
            }
            case ("Insert Node End"): {
                linkedList?.insertNodeEnd(nodeValue)
                break;
            }
            case ("Delete Node End"): {
                linkedList?.deleteNodeEnd()
                let tmpArr = [...nodeArray]
                tmpArr.pop()
                setNodeArray(tmpArr)
                return;

            }
            case ("Reverse List"): {
                let tmpNodeArr = [...nodeArray]
                setNodeArray(tmpNodeArr.reverse())
                return;
            }
        }

        getLinkedListNodes()
    }

    const resetClass = () => {
        linkedList = null
        linkedList = new LinkedListClass()
        linkedList.insertNodeBeginning("2")
        linkedList.insertNodeBeginning("1")
        linkedList.insertNodeBeginning("0")

        getLinkedListNodes()
    }

    const getLinkedListNodes = () => {
        if (linkedList) {
            setNodeArray(linkedList.getNodeArray())
        }

    }


    useEffect(() => {
        resetClass()
    }, [])

    return (
        <div className="linkedlist__wrapper">
            <LLToolbar
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
                {chosenOperation == "Insert Node End" ?
                    <button onClick={handleOperationClick} className="operation__button">
                        Insert
                    </button>
                    :
                    <></>
                }
                {chosenOperation == "Delete Node Beginning" ?
                    <button onClick={handleOperationClick} className="operation__button">
                        Delete
                    </button>
                    :
                    <></>
                }
                {chosenOperation == "Delete Node End" ?
                    <button onClick={handleOperationClick} className="operation__button">
                        Delete
                    </button>
                    :
                    <></>
                }
                {chosenOperation == "Reverse List" ?
                    <button onClick={handleOperationClick} className="operation__button">
                        Reverse
                    </button>
                    :
                    <></>
                }
                <button onClick={resetClass} className="operation__button">
                    Reset
                </button>
            </div>
            {chosenOperation == "Insert At Position" ?
                <span className="linkedlist__select">Select a Node</span>
                :
                <></>
            }
            <div className="linkedlist">
                <div className="linkedlist__head">
                    {nodeArray && nodeArray.length > 0 &&
                        <>
                            <span>Head</span>
                            <div className="node__arrow__down">

                            </div>
                        </>}
                </div>
                <div className="linkedlist__node__container">
                    {nodeArray?.map((node, index) => {
                        return (
                            <React.Fragment key={node.nodeId}>
                                <div
                                    id={node.nodeId.toString()}
                                    style={{ borderColor: nodeColor }}
                                    className={`${chosenOperation == "Insert At Position" ? "insertnode" : ""} linkedlist__node`}>
                                    {node.nodeValue}
                                </div>
                                {index == nodeArray.length - 1 || nodeArray.length == 1 ?
                                    <></>
                                    :
                                    <div className="node__arrow">

                                    </div>
                                }
                            </React.Fragment>
                        )



                    })}
                </div>
            </div>
        </div>
    )
}
export default LinkedListDS
