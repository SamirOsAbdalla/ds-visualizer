"use client"
import React from 'react'
import Toolbar from '@/components/Toolbar/Toolbar'
import { LinkedList } from '@/Classes/LinkedList'
import { useEffect, useState, Fragment } from 'react'
import "./LinkedList.css"
import { INode } from '@/Classes/LinkedList'
import { counter } from '@/Classes/NodeClass'
import DsWrapper from '@/components/DsWrapper/DsWrapper'
import { motion } from "framer-motion"

const operationsArray: string[] = [
    "Insert Node Beginning",
    "Delete Node Beginning",
    "Insert Node End",
    "Delete Node End",
    "Insert After",
    "Delete At Position",
    "Update Node",
    "Reverse List",
]


let linkedList: LinkedList | null = new LinkedList()
const iterationSpeed = 550
const animations = {
    inital: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 }
}
//OPERATION BUTTON FUNCTIONS============================================================================
export const disableButtons = () => {
    let insertButton = document.querySelectorAll(".operation__button") as NodeListOf<HTMLButtonElement>
    insertButton.forEach((button: HTMLButtonElement) => {
        button.disabled = true
    })
}

export const enableButtons = () => {
    let insertButton = document.querySelectorAll(".operation__button") as NodeListOf<HTMLButtonElement>
    insertButton.forEach((button: HTMLButtonElement) => {
        button.disabled = false
    })
}
//=======================================================================================================
const LinkedListDS = () => {

    const [nodeArray, setNodeArray] = useState<INode[]>([])
    const [chosenOperation, setChosenOperation] = useState<string>(operationsArray[0])
    const [animationPlaying, setAnimationPlaying] = useState<boolean>(false)
    const [nodeColor, setNodeColor] = useState<string>("#eb7389")
    const [nodeValue, setNodeValue] = useState<string>("0")

    let searchId: number = -1

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
        linkedList = new LinkedList()
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


    //TIMEOUT FUNCTIONS========================================================================
    function createCustomTimeout(i: number, style: any) {

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


    //==========================================================================================








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
                    await createCustomTimeout(i + 1, style)
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
            case ("Delete At Position"): {
                linkedList?.deleteNodeAtPosition(searchId)
                if (linkedList?.listSize == 0) {
                    setNodeArray([])
                    return;
                }
                setAnimationPlaying(true)
                disableButtons()

                let headPtr = document.querySelector(".linkedlist__head") as HTMLElement

                let ptr = document.querySelector(".linkedlist__dne") as HTMLElement
                let prevPtr = document.querySelector(".linkedlist__dne__prevp") as HTMLElement
                let curPtr = document.querySelector(".linkedlist__dne__curp") as HTMLElement
                let prevPtrSpan = document.querySelector(".linkedlist__dne__span__prevp") as HTMLElement
                let curPtrSpan = document.querySelector(".linkedlist__dne__span__curp") as HTMLElement

                let nodeIndex = nodeArray.findIndex((node: INode) => node.nodeId == searchId)
                if (nodeIndex == 0) {

                    headPtr.style.left = "110px"
                    setTimeout(() => {
                        let [, ...rest] = nodeArray
                        setNodeArray(rest)
                        curPtr.style.left = "-110px"
                        headPtr.style.left = "0px"
                    }, 1000)

                    setTimeout(() => {
                        curPtr.style.left = "0px"
                        enableButtons()
                        setAnimationPlaying(false)
                    }, 2000)
                } else {

                    for (let i = 0; i < nodeIndex; i++) {
                        await createCustomDNETimeout(i + 1, prevPtr, curPtr, prevPtrSpan)
                    }

                    const filter = nodeArray.filter((node: INode) => node.nodeId !== searchId)

                    setTimeout(() => {
                        setNodeArray(filter)
                        curPtrSpan.innerHTML = "NULL"
                    }, 800)

                    setTimeout(() => {
                        enableButtons()
                        setAnimationPlaying(false)
                        curPtrSpan.innerHTML = "CurP"
                        curPtr.style.left = "0px"
                        prevPtr.style.left = "0px"
                        prevPtrSpan.innerHTML = "NULL"
                    }, 1500)
                }


                break;
            }
            case ("Update Node"): {
                linkedList?.updateNode(searchId, nodeColor, nodeValue)
                setAnimationPlaying(true)
                disableButtons()

                let curPtr = document.querySelector(".linkedlist__ine__curp") as HTMLElement

                let nodeIndex = nodeArray.findIndex((node: INode) => node.nodeId == searchId)

                for (let i = 0; i < nodeIndex; i++) {
                    await createCustomTimeout(i + 1, curPtr)
                }

                let tmpArray = [...nodeArray]
                tmpArray[nodeIndex].nodeColor = nodeColor
                tmpArray[nodeIndex].nodeValue = nodeValue
                setTimeout(() => {
                    setNodeArray(tmpArray)
                }, iterationSpeed)

                setTimeout(() => {

                    setAnimationPlaying(false)
                    curPtr.style.left = "0px"
                    enableButtons()
                }, 1200)
            }
            case ("Reverse List"): {
                if (nodeArray.length <= 1) {
                    return;
                }

                linkedList?.reverseList()

                setAnimationPlaying(true)
                disableButtons()
                let linkedListNodes = document.querySelector(".linkedlist__nodes") as HTMLElement
                let headPtr = document.querySelector(".linkedlist__head") as HTMLElement
                let nextPtr = document.querySelector(".linkedlist__next") as HTMLElement
                let prevPtr = document.querySelector(".linkedlist__dne__prevp") as HTMLElement
                let curPtr = document.querySelector(".linkedlist__dne__curp") as HTMLElement
                let prevPtrSpan = document.querySelector(".linkedlist__dne__span__prevp") as HTMLElement
                let curPtrSpan = document.querySelector(".linkedlist__dne__span__curp") as HTMLElement
                let nextPtrSpan = document.querySelector(".linkedlist__next__span") as HTMLElement
                let length = nodeArray.length - 1
                for (let i = 0; i < length; i++) {
                    let nodeArrow = linkedListNodes.children[i].children[0].children[1] as HTMLElement
                    await createCustomReverseTimeout(i + 1, curPtr, curPtrSpan, prevPtr, nextPtr, nextPtrSpan, nodeArrow, prevPtrSpan, headPtr, length)
                }

                setTimeout(() => {
                    setNodeArray([...nodeArray].reverse())

                    curPtr.style.left = "0px"
                    headPtr.style.left = "0px"
                    prevPtr.style.left = "0px"
                    nextPtr.style.left = "0px"
                    prevPtrSpan.innerHTML = "NULL"
                    curPtrSpan.innerHTML = "CurP"
                    nextPtrSpan.innerHTML = "Next"

                    for (let i = 0; i < length; i++) {
                        let nodeArrow = linkedListNodes.children[i].children[0].children[1] as HTMLElement
                        nodeArrow.style.left = "0px"
                        nodeArrow.style.transform = "rotate(0deg)"
                    }
                    setAnimationPlaying(false)
                    enableButtons()
                }, 1200)

                return;
            }
            case ("Insert After"): {
                let returnNode = linkedList?.insertNodeAtPosition({ nodeValue, nodeId: searchId, nodeColor }, "After")

                let returnId = 0;
                if (returnNode) {
                    returnId = returnNode.nodeId
                }
                setAnimationPlaying(true)
                disableButtons()

                let curPtr = document.querySelector(".linkedlist__ine__curp") as HTMLElement


                let nodeIndex = nodeArray.findIndex((node: INode) => node.nodeId == searchId)

                for (let i = 0; i < nodeIndex; i++) {
                    await createCustomTimeout(i + 1, curPtr)
                }
                let tmpArray = [...nodeArray]
                tmpArray.splice(nodeIndex + 1, 0, { nodeValue, nodeId: returnId, nodeColor })

                setTimeout(() => {
                    setNodeArray(tmpArray)
                }, iterationSpeed)

                setTimeout(() => {

                    setAnimationPlaying(false)
                    curPtr.style.left = "0px"
                    enableButtons()
                }, 1200)

            }
        }
    }

    function createCustomReverseTimeout(i: number, curPtr: any, curPtrSpan: any, prevPtr: any, nextPtr: any, nextPtrSpan: any,
        nodeArrow: any, prevPtrSpan: any, headPtr: any, length: number) {

        return new Promise((resolve, reject) => {
            let left = 110 * i

            setTimeout(() => {
                nodeArrow.style.transform = "rotate(180deg)"
                nodeArrow.style.left = "-10px"

                setTimeout(() => {
                    if (i == 1) {
                        prevPtrSpan.innerHTML = "PrevP"
                    }
                    curPtr.style.left = `${left}px`
                    prevPtr.style.left = `${left}px`

                    setTimeout(() => {
                        nextPtr.style.left = `${left}px`


                        if (i == length) {
                            nextPtrSpan.innerHTML = "NULL"

                            setTimeout(() => {
                                curPtr.style.left = `${left + 110}px`
                                prevPtr.style.left = `${left + 110}px`
                                curPtrSpan.innerHTML = "NULL"
                            }, 1000)

                            setTimeout(() => {
                                let left = length * 110
                                headPtr.style.left = `${left}px`
                                resolve(left)
                            }, 2000)

                        } else {
                            resolve(left)
                        }

                    }, 1000)

                }, 1000);
            }, 1000);


        });
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
                'P' that points to the node AFTER where head is currently pointing to. Then you would delete head and set
                head to point to where 'P' is pointing to. Finally, set 'P' to be equal to the current node's next pointer.`
            }
            case ("Insert Node End"): {
                return `To insert a node at the end, iterate through the list until you encounter 
                a node whose "next" pointer is null. Then, create a new node and set the next pointer
                of the node that 'CurP' is currently pointing at to the new node.`

            }
            case ("Delete Node End"): {
                return `To delete a node at the end, iterate through the list with two pointers.
                Once the current pointer i.e. 'CurP' points to a node whose next pointer is null,
                set the next pointer of the node that the previous pointer, 'PrevP', is pointing
                at to null and delete 'CurP'. `
            }
            case ("Delete At Position"): {
                return `Deleting a node at a certain position also utilizes a two pointer solution. Simply
                iterate through the list with both pointers until 'CurP' points to the node that is to be deleted. Subsequently,
                set the next pointer of the node that 'PrevP' is pointing to, to point to the node that is AFTER
                the node 'CurP' points to, and then delete 'CurP'.  `

            }
            case ("Update Node"): {
                return `To update a node, iterate through the list with a single pointer until that pointer 
                points to the node with the desired values. Once you find that node, simply update the value. `

            }
            case ("Insert After"): {
                return `In order to arbitrarily insert a node anywhere in the list, iterate through the list until
                you find the desired node, which we will call 'D'. Then, create a new node, let's call that node 'N', 
                and set N's next pointer to point to the same node that D's next pointer is pointing to. Finally, set D's next pointer 
                to point to 'N'. Make sure to watch the order in which you set the next pointers or else you will get a 
                node that points to itself!`

            }
            case ("Reverse List"): {
                return `One way to reverse a list is to iterate through the list using three pointers. At each node you will create
                a 'Next' pointer that points to the next node of the node that 'CurP' is pointing to. The reason for this will be explained
                shortly. The purpose of 'PrevP' is to become the current node's (the one 'CurP' is pointing to) new next pointer. However, by changing the current node's
                next pointer, in order to continue iterating through the list we would need to keep track of the original next node of
                'CurP', hence the need to have the 'Next' pointer. Once the node is reversed we set 'PrevP' to 'CurP' and 'CurP' to 'Next'. Finally, when 'CurP' is null, we have to remember to set the head pointer to the
                new head of the list, which would be 'PrevP' at the end of the last iteration. `

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
            case ("Reverse List"): {
                return (
                    <button onClick={handleOperationClick} className={`${animationPlaying ? "disabled" : ""} operation__button`}>
                        Reverse
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
                            <span className="linkedlist__ine__span__curp">CurP</span>
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

            case ("Delete At Position"): {
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
            case ("Update Node"): {
                if (nodeArray && nodeArray.length > 0) {
                    return (
                        <div style={{ left: "0px" }} className="linkedlist__ine__curp">
                            <div className="node__arrow__up">

                            </div>
                            <span className="linkedlist__ine__span__curp">CurP</span>
                        </div>
                    )
                }
            }

            case ("Insert After"): {
                if (nodeArray && nodeArray.length > 0) {
                    return (
                        <div style={{ left: "0px" }} className="linkedlist__ine__curp">
                            <div className="node__arrow__up">

                            </div>
                            <span className="linkedlist__ine__span__curp">CurP</span>
                        </div>
                    )
                }
            }
            case ("Insert Before"): {
                if (nodeArray && nodeArray.length > 0) {
                    return (
                        <div style={{ left: "0px" }} className="linkedlist__ine__curp">
                            <div className="node__arrow__up">

                            </div>
                            <span className="linkedlist__ine__span__curp">CurP</span>
                        </div>
                    )
                }
            }

            case ("Reverse List"): {

                if (nodeArray && nodeArray.length > 1) {
                    return (<div style={{ left: "-110px" }} className="linkedlist__dne">
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

    const returnOperationText = () => {
        switch (chosenOperation) {
            case ("Delete At Position"): {
                return <div className="operation__text">Select a node to delete</div>
            }
            case ("Update Node"): {
                return <div className="operation__text">Select a node to update</div>
            }
            case ("Insert After"):
            case ("Insert Before"): {
                return <div className="operation__text">Select a node</div>
            }

            default: {
                return <></>
            }
        }
    }

    const returnOperationIsSelect = () => {
        if (chosenOperation == "Delete At Position" || chosenOperation == "Update Node" || chosenOperation == "Insert Before"
            || chosenOperation == "Insert After") {
            return true;
        }
        return false
    }
    //====================================================================

    const handleNodeClick = (currentSearchId: number) => {

        if (nodeArray.length == 0) {
            return;
        }

        if (chosenOperation == "Update Node" || chosenOperation == "Delete At Position" || chosenOperation == "Insert Before"
            || chosenOperation == "Insert After") {
            searchId = currentSearchId

        } else {
            return;
        }
        handleOperationClick()
    }

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

            {returnOperationText()}
            <div className="linkedlist">
                <div className="linkedlist__top">
                    {nodeArray && nodeArray.length > 0 &&
                        <div className="linkedlist__head">
                            <span>Head</span>
                            <div className="node__arrow__down">

                            </div>
                        </div>
                    }
                    {nodeArray && nodeArray.length > 0 && chosenOperation == "Reverse List" &&
                        <div className="linkedlist__next">
                            <span className="linkedlist__next__span">Next</span>
                            <div className="node__arrow__down">

                            </div>
                        </div>
                    }
                </div>
                <div className="linkedlist__nodes fade">

                    {nodeArray?.map((node, index) => {

                        const currentNodeId = node.nodeId.toString()
                        return (

                            <motion.div className='motion__div'{...animations} layout id={currentNodeId} key={currentNodeId}>

                                <div className={`linkedlist__node`}>

                                    <div
                                        style={{ borderColor: node.nodeColor }}
                                        className={`${returnOperationIsSelect() ? "nodehover" : ""} node__circle`}
                                        onClick={() => handleNodeClick(node.nodeId)}
                                    >
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
        </DsWrapper >
    )
}


export default LinkedListDS

