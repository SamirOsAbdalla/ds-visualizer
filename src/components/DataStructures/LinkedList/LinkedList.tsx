"use client"
import React from 'react'
import Toolbar from '@/components/Toolbar/Toolbar'
import { LinkedListClass } from '@/Classes/LinkedListClass'
import { useEffect, useState, Fragment } from 'react'
import "./LinkedList.css"
import { INode } from '@/Classes/LinkedListClass'
import { counter } from '@/Classes/NodeClass'
import DsWrapper from '@/components/DsWrapper/DsWrapper'
import { motion } from "framer-motion"

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
const iterationSpeed = 550
const animations = {
    inital: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 }
}
const LinkedListDS = () => {


    const [chosenOperation, setChosenOperation] = useState<string>(operationsArray[0])
    const [nodeArray, setNodeArray] = useState<INode[]>([])
    const [nodeColor, setNodeColor] = useState<string>("#eb7389")
    const [nodeValue, setNodeValue] = useState<string>("0")
    const [insertModalStatus, setInsertModalStatus] = useState<"Open" | "Closed">("Closed")
    const [modalId, setModalId] = useState<string>("-1")
    const [checkedBefore, setCheckedBefore] = useState<boolean>(false)
    const [checkedAfter, setCheckedAfter] = useState<boolean>(false)
    const [animationPlaying, setAnimationPlaying] = useState<boolean>(false)
    const reverseList = () => {
        let tmpNodeArr = [...nodeArray]
        setNodeArray(tmpNodeArr.reverse())
    }

    //UTIL FUNCTIONS=========================================

    const getLinkedListNodes = () => {
        if (linkedList) {
            setNodeArray(linkedList.getNodeArray())
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

    //=========================================================

    useEffect(() => {
        resetClass()
    }, [])


    function createCustomTimeout(i: number, time: number, style: any, length: any) {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let left = 110 * i
                style.style.left = `${left}px`
                resolve(left)
            }, iterationSpeed);
        });
    }

    function createCustomDNETimeout(i: number, curPtr: any, prevPtr: any, prevPtrSpan: any) {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let left = 110 * i
                curPtr.style.left = `${left}px`
                prevPtr.style.left = `${left}px`

                if (i == 1) {
                    prevPtrSpan.innerHTML = "PrevP"
                }
                resolve(left)
            }, iterationSpeed);
        });
    }

    const disableButtons = () => {
        let insertButton = document.querySelectorAll(".operation__button") as NodeListOf<HTMLButtonElement>
        insertButton.forEach((button: HTMLButtonElement) => {
            button.disabled = true
        })
    }

    const enableButtons = () => {
        let insertButton = document.querySelectorAll(".operation__button") as NodeListOf<HTMLButtonElement>
        insertButton.forEach((button: HTMLButtonElement) => {
            button.disabled = false
        })
    }
    //Changes Node Array based on current operation
    const handleOperationClick = async () => {
        switch (chosenOperation) {
            case ("Insert Node Beginning"): {
                const returnedNode = linkedList?.insertNodeBeginning(nodeValue, nodeColor)
                if (returnedNode == null) {
                    return;
                }
                setAnimationPlaying(true)
                disableButtons()

                const headPtr = document.querySelector(".linkedlist__head") as HTMLElement
                headPtr.style.left = "110px"

                setNodeArray([returnedNode, ...nodeArray])
                setTimeout(() => {
                    setAnimationPlaying(false)
                    headPtr.style.left = "0px"
                    enableButtons()
                }, 1000)
                break;
            }

            case ("Delete Node Beginning"): {
                if (nodeArray?.length == 0) {
                    return;
                }
                const [, ...rest] = nodeArray

                setAnimationPlaying(true)
                disableButtons()
                setNodeArray(rest)
                const pPtr = document.querySelector(".linkedlist__p") as HTMLElement
                pPtr.style.left = "0px"
                setTimeout(() => {
                    setAnimationPlaying(false)
                    pPtr.style.left = "110px"
                    enableButtons()
                }, 1000)


                break;
            }

            case ("Insert Node End"): {
                const returnedNode = linkedList?.insertNodeEnd(nodeValue, nodeColor)
                if (!returnedNode) {
                    return;
                }
                setAnimationPlaying(true)
                disableButtons()

                let style = document.querySelector(".linkedlist__ine__curp") as HTMLElement
                let length = nodeArray.length - 1
                for (let i = 0; i < length; i++) {
                    await createCustomTimeout(i + 1, 1000, style, length)
                }

                //insert new element and allow user to click on buttons again
                setTimeout(() => {
                    setNodeArray([...nodeArray, returnedNode])
                }, iterationSpeed)

                //reset arrow back to original position
                setTimeout(() => {
                    style.style.left = "0px"
                    setAnimationPlaying(false)
                    enableButtons()
                }, 1200)
                break;
            }


            case ("Delete Node End"): {
                if (nodeArray.length == 0) {
                    return;
                }

                linkedList?.deleteNodeEnd()
                setAnimationPlaying(true)
                disableButtons()

                let ptr = document.querySelector(".linkedlist__dne") as HTMLElement
                let prevPtr = document.querySelector(".linkedlist__dne__prevp") as HTMLElement
                let curPtr = document.querySelector(".linkedlist__dne__curp") as HTMLElement
                let prevPtrSpan = document.querySelector(".linkedlist__dne__span__prevp") as HTMLElement
                let curPtrSpan = document.querySelector(".linkedlist__dne__span__curp") as HTMLElement

                let length = nodeArray.length - 1
                for (let i = 0; i <= length; i++) {
                    await createCustomDNETimeout(i, prevPtr, curPtr, prevPtrSpan)
                }

                setTimeout(() => {

                    let tmp = [...nodeArray]
                    tmp.pop()

                    setNodeArray(tmp)
                    curPtrSpan.innerHTML = "NULL"
                }, iterationSpeed)

                //reset arrow back to original position
                setTimeout(() => {

                    setAnimationPlaying(false)
                    prevPtr.style.left = "0px"
                    prevPtrSpan.innerHTML = "NULL"
                    curPtr.style.left = "0px"
                    curPtrSpan.innerHTML = "CurP"
                    enableButtons()
                }, 1500)
                break;
            }
        }
    }

    //RETURN FUNCTIONS
    const returnLinkedListText = () => {
        switch (chosenOperation) {
            case ("Insert Node Beginning"): {
                return `To insert a node at the beginning, first create a new node. Then,
                set the new node's "next" pointer to where the current head is pointing to and
                finally set the head to point to the new node.`

            }
            case ("Delete Node Beginning"): {
                return `To delete a node at the beginning, you would first create a temporary pointer
                "P" that points to the node AFTER where head is currently pointing to. Then you would delete head and set
                head to point to where "P" is pointing to. Finally, set "P" to be equal to the current node's next pointer.`
            }
            case ("Insert Node End"): {
                return `To insert a node at the end, iterate through the list until you encounter 
                a node whose "next" pointer is null. Then, create a new node and set the next pointer
                of the node that "CurP" is currently pointing at to the new node.`

            }
            case ("Delete Node End"): {
                return `To delete a node at the end, iterate through the list with two pointers.
                Once the current pointer i.e. "CurP" points to a node whose next pointer is null,
                set the next pointer of the node that the previous pointer, "PrevP", is pointing
                at to null and delete "CurP". `

            }
        }
    }

    const returnOperationButton = () => {
        switch (chosenOperation) {
            case ("Insert Node Beginning"): {
                return (
                    <button onClick={handleOperationClick} className={`${animationPlaying ? "disabled" : ""} operation__button`}>
                        Insert
                    </button>
                )
            }
            case ("Delete Node Beginning"): {
                return (
                    <button onClick={handleOperationClick} className={`${animationPlaying ? "disabled" : ""} operation__button`}>
                        Delete
                    </button>
                )
            }
            case ("Insert Node End"): {
                return (
                    <button onClick={handleOperationClick} className={`${animationPlaying ? "disabled" : ""} operation__button`}>
                        Insert
                    </button>
                )
            }
            case ("Delete Node End"): {
                return (
                    <button onClick={handleOperationClick} className={`${animationPlaying ? "disabled" : ""} operation__button`}>
                        Delete
                    </button>
                )
            }
        }
    }

    const returnPointers = () => {
        switch (chosenOperation) {
            case ("Delete Node Beginning"): {
                {
                    if (nodeArray && nodeArray.length > 0) {
                        return (
                            <div className="linkedlist__p">
                                <div className="node__arrow__up">

                                </div>
                                <span>{nodeArray.length !== 1 ? "P" : "NULL"}</span>
                            </div>
                        )
                    }
                }
                break;
            }

            case ("Insert Node End"): {
                if (nodeArray && nodeArray.length > 0) {
                    return (
                        <div style={{ left: "0px" }} className="linkedlist__ine__curp">
                            <div className="node__arrow__up">

                            </div>
                            <span>CurP</span>
                        </div>
                    )
                }
            }

            case ("Delete Node End"): {
                if (nodeArray && nodeArray.length > 0) {
                    return (
                        <div style={{ left: "-110px" }} className="linkedlist__dne">
                            <div style={{ left: "0px" }} className="linkedlist__dne__prevp">
                                <div className="node__arrow__up">

                                </div>
                                <span className="linkedlist__dne__span__prevp">NULL</span>
                            </div>
                            <div style={{ left: "0px" }} className="linkedlist__dne__curp">
                                <div className="node__arrow__up">

                                </div>
                                <span className="linkedlist__dne__span__curp">CurP</span>
                            </div>
                        </div>

                    )
                }
            }
        }

    }
    //====================================================================


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
                animationPlaying={animationPlaying}
            />



            <div className="operation__buttons">
                {returnOperationButton()}
                <button onClick={resetClass} className={`${animationPlaying ? "disabled" : ""} operation__button`}>
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
                            <motion.div className='motion__div'{...animations} layout id={currentNodeId} key={currentNodeId}>
                                <div className="linkedlist__node">
                                    <div style={{ borderColor: node.nodeColor }} className="node__circle">
                                        {node.nodeValue}
                                    </div>
                                    <div className="node__arrow">

                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
                {returnPointers()}

            </div>
            <p className="linkedlist__text">
                {returnLinkedListText()}
            </p>
        </DsWrapper>
    )
}


export default LinkedListDS
