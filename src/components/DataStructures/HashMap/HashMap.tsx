import { useState, useEffect } from "react"
import Toolbar from "@/components/Toolbar/Toolbar"
import "./HashMap.css"
import DsWrapper from "@/components/DsWrapper/DsWrapper"
import { IKeyValueNode } from "@/Classes/HashMap"
import { disableButtons, enableButtons } from "../LinkedList/LinkedList"


interface MapValue {
    isInMap: boolean,
    hashMapArrayIndex: number
}
const operationsArray = ["Insert"]
let hashMapSize = 10
let allowedHashIndices = Array.from(Array(hashMapSize).keys())
let hashMap = new Map<string, MapValue>()
let kvID = 0;


const HashMapDS = () => {
    const [chosenOperation, setChosenOperation] = useState<string>(operationsArray[0])
    const [animationPlaying, setAnimationPlaying] = useState<boolean>(false)
    const [nodeColor, setNodeColor] = useState<string>("#eb7389")
    const [nodeValue, setNodeValue] = useState<string>("0")
    const [nodeKey, setNodeKey] = useState<string>("0")
    const [hashMapArray, setHashMapArray] = useState<IKeyValueNode[]>([])

    const resetHashMap = () => {

        let tmpArray: IKeyValueNode[] = [];
        for (let i = 0; i < hashMapSize; i++) {
            tmpArray.push({ nodeKey: "", nodeValue: "", kvID: -1 - i })
        }
        setHashMapArray(tmpArray)
        setNodeValue("0")
        setNodeKey("0")
        allowedHashIndices = Array.from(Array(hashMapSize).keys())
    }

    const handleOperationClick = () => {
        switch (chosenOperation) {
            case ("Insert"): {

                //get random number between 0 and allowedHashIndices length
                const randomAllowedHashIndex = Math.floor(Math.random() * allowedHashIndices.length)

                //index to be changed in hash map array
                const randomHashMapArrayIndex = allowedHashIndices[randomAllowedHashIndex]

                let tempArray = [...hashMapArray]
                //check to see if key already exists
                let mapValue = hashMap.get(nodeKey)

                //handle collision if needed
                if (mapValue && mapValue.isInMap == true) {
                    tempArray[mapValue.hashMapArrayIndex].nodeValue = nodeValue
                    setHashMapArray(tempArray)
                    return;
                }

                if (allowedHashIndices.length == 0) {
                    return;
                }

                hashMap.set(nodeKey, { isInMap: true, hashMapArrayIndex: randomHashMapArrayIndex })
                tempArray[randomHashMapArrayIndex] = { nodeKey, nodeValue, kvID }
                kvID++;

                setHashMapArray(tempArray)
                allowedHashIndices.splice(randomAllowedHashIndex, 1)
            }
        }
    }

    const returnOperationButton = () => {
        switch (chosenOperation) {
            case ("Insert"): {
                return (
                    <div onClick={handleOperationClick} className="operation__button">
                        Insert
                    </div>
                )
            }
        }
    }

    useEffect(() => {
        resetHashMap()
    }, [])
    return (
        <DsWrapper>
            <Toolbar
                chosenOperation={chosenOperation}
                setChosenOperation={setChosenOperation}
                animationPlaying={animationPlaying}
                nodeColor={nodeColor}
                setNodeColor={setNodeValue}
                nodeValue={nodeValue}
                setNodeValue={setNodeValue}
                nodeKey={nodeKey}
                setNodeKey={setNodeKey}
                operationsArray={operationsArray}
                dsName="HashMap"
            />
            <div className="operation__buttons">
                {returnOperationButton()}
                <button onClick={resetHashMap} className={`${animationPlaying ? "disabled" : ""} operation__button`}>
                    Reset
                </button>
            </div>
            <div className="hashmap__nodes">
                {hashMapArray.map((node: IKeyValueNode) =>
                    <div key={node.kvID} className="hashmap__node">
                        <div className="hashmap__node__key">
                            <span className="hashmap__node__span hashmap__key__span">
                                Key:
                            </span>
                            <span className="hashmap__node__span hashmap__key__span">
                                {node.nodeKey}
                            </span>
                        </div>
                        <div className="hashmap__node__value">
                            <span className="hashmap__node__span">
                                Value:
                            </span>
                            <span className="hashmap__node__span hashmap__value__span">
                                {node.nodeValue}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <div className={`hash__function__text`}>
                HASH()
            </div>
            <div className="hash__text">

            </div>
        </DsWrapper>
    )
}


export default HashMapDS
