import { useState, useEffect } from "react"
import Toolbar from "@/components/Toolbar/Toolbar"
import "./HashMap.css"
import DsWrapper from "@/components/DsWrapper/DsWrapper"
import { IKeyValueNode } from "@/Classes/HashMap"
import { disableButtons, enableButtons } from "../LinkedList/LinkedList"


const operationsArray = ["Insert", "Erase"]
let hashMapSize = 10
let hashMap = new Map<string, number>()
let kvID = 0;

const HashMapDS = () => {
    const [chosenOperation, setChosenOperation] = useState<string>(operationsArray[0])
    const [animationPlaying, setAnimationPlaying] = useState<boolean>(false)
    const [nodeColor, setNodeColor] = useState<string>("#eb7389")
    const [nodeValue, setNodeValue] = useState<string>("0")
    const [nodeKey, setNodeKey] = useState<string>("0")
    const [hashMapArray, setHashMapArray] = useState<IKeyValueNode[]>([])
    const [deletedKey, setDeletedKey] = useState<string>("")

    const resetHashMap = () => {

        let tmpArray: IKeyValueNode[] = [];
        for (let i = 0; i < hashMapSize; i++) {
            tmpArray.push({ nodeKey: "", nodeValue: "", kvID: -1 - i })
        }
        setHashMapArray(tmpArray)
        setNodeValue("0")
        setNodeKey("0")
        setDeletedKey("")
    }

    const handleOperationClick = () => {
        switch (chosenOperation) {
            case ("Insert"): {


                setAnimationPlaying(true)
                disableButtons()

                //get random number between 0 and hashMapSize
                const randomHashMapIndex = Math.floor(Math.random() * hashMapSize)

                let mapId = hashMap.get(nodeKey)
                let hashMapIndex: number;
                if (mapId) {
                    hashMapIndex = mapId;
                } else {
                    hashMapIndex = randomHashMapIndex
                }

                let collisionExists: boolean = false;
                if (hashMapArray[hashMapIndex].nodeKey && hashMapArray[hashMapIndex].nodeKey !== nodeKey) {
                    collisionExists = true;
                }


                let tempArray = [...hashMapArray]

                let hashMapNodes = document.querySelector(".hashmap__nodes") as HTMLElement
                let hashMapNode = hashMapNodes.children[hashMapIndex] as HTMLElement
                let hashAnimationText = document.querySelector(".hashing__animation__text__container") as HTMLElement
                let hashFunctionSpan = document.querySelector(".hash__function__text__span") as HTMLElement
                let collisionText = document.querySelector(".hashing__animation__collision")

                setTimeout(() => {
                    hashAnimationText.classList.toggle("show__text")

                    if (collisionExists) {
                        collisionText?.classList.toggle("show__collision")
                    }
                    hashFunctionSpan.innerHTML = "Index: " + hashMapIndex.toString()
                }, 700)

                setTimeout(() => {
                    hashMapNode.style.borderWidth = "4px"
                    hashMapNode.style.borderColor = "white"
                    hashMapNode.style.transform = "scale(1.08)"
                }, 2000)

                setTimeout(() => {
                    hashMapNode.style.borderWidth = "2px"
                    hashMapNode.style.borderColor = "#eb7389"
                    hashMapNode.style.transform = "scale(1.00)"

                    hashAnimationText.classList.toggle("show__text")
                    tempArray[hashMapIndex].nodeKey = nodeKey
                    tempArray[hashMapIndex].nodeValue = nodeValue
                    if (collisionExists) {
                        collisionText?.classList.toggle("show__collision")
                    }

                    setHashMapArray(tempArray)
                    hashMap.set(nodeKey, hashMapIndex)
                    setAnimationPlaying(false)
                    enableButtons()
                }, 3000)
                return;
            }
            case ("Erase"): {

                const hashMapArrayIndex = hashMapArray.findIndex((hashNode) => hashNode.nodeKey == deletedKey)
                if (deletedKey == "" || hashMapArrayIndex == -1) {
                    return;
                }

                setAnimationPlaying(true)
                disableButtons()


                let hashMapNodes = document.querySelector(".hashmap__nodes") as HTMLElement
                let hashMapNode = hashMapNodes.children[hashMapArrayIndex] as HTMLElement
                let hashAnimationText = document.querySelector(".hashing__animation__text__container") as HTMLElement
                let hashFunctionSpan = document.querySelector(".hash__function__text__span") as HTMLElement

                setTimeout(() => {
                    hashAnimationText.classList.toggle("show__text")

                    hashFunctionSpan.innerHTML = "Index: " + hashMapArrayIndex.toString()
                }, 700)

                setTimeout(() => {
                    hashMapNode.style.borderWidth = "4px"
                    hashMapNode.style.borderColor = "white"
                    hashMapNode.style.transform = "scale(1.08)"
                }, 1400)

                setTimeout(() => {
                    hashMapNode.style.borderWidth = "2px"
                    hashMapNode.style.borderColor = "#eb7389"
                    hashMapNode.style.transform = "scale(1.00)"
                    hashAnimationText.classList.toggle("show__text")

                    let tmpArray = [...hashMapArray]
                    tmpArray[hashMapArrayIndex].nodeKey = ""
                    tmpArray[hashMapArrayIndex].nodeValue = ""
                    setHashMapArray(tmpArray)
                    setAnimationPlaying(false)
                    enableButtons()
                    setDeletedKey("")

                    hashMap.delete(deletedKey)
                }, 2100)

                return;
            }
        }
    }

    //RETURN FUNCTIONS ================================================================================
    const returnOperationButton = () => {
        switch (chosenOperation) {
            case ("Insert"): {
                return (
                    <div onClick={handleOperationClick} className={`${animationPlaying ? "disabled" : ""} operation__button`}>
                        Insert
                    </div>
                )
            }
            case ("Erase"): {
                return (
                    <div onClick={handleOperationClick} className={`${animationPlaying ? "disabled" : ""} operation__button`}>
                        Erase
                    </div>
                )
            }
        }
    }

    const returnHashingFunctionText = () => {
        switch (chosenOperation) {
            case ("Insert"): {
                return (
                    <div className={`show__text hashing__animation__text__container`}>
                        <div className="show__collision hashing__animation__collision">
                            COLLISION!
                        </div>
                        <div className={`hash__function__text__container`}>
                            <div className={`hash__function__text`}>
                                HASH( Key: {nodeKey} )
                            </div>
                            <div className="node__arrow">

                            </div>
                            <span className="hash__function__text__span">
                                Index : 0
                            </span>
                        </div>
                    </div>
                )
            }
            case ("Erase"): {
                return (
                    <div className={`show__text hashing__animation__text__container`}>
                        <div className={`hash__function__text__container`}>
                            <div className={`hash__function__text`}>
                                HASH( Key: {nodeKey} )
                            </div>
                            <div className="node__arrow">

                            </div>
                            <span className="hash__function__text__span">
                                Index : 0
                            </span>
                        </div>
                    </div>
                )
            }
        }

    }

    const returnHashText = () => {
        switch (chosenOperation) {
            case ("Insert"): {
                return (
                    <>
                        A hash map, at its core, is an array that takes a key and uses what is called a <span className="underline">hash function</span> to
                        produce an index into that array. Hash functions are quite complicated and there are plenty of tricks
                        to make sure that the index that is produced from two different keys is unique. If they are not unique,
                        then what is formally known as a <span className="underline">collision</span> occurs. This program handles
                        collisions by simply overwriting the previous key with the new key (and value), however, the way collisions are handled
                        in a hash map is implementation defined i.e. the designer of the hash map in use can choose how
                        to handle them.<br /><br />

                        The key in this example is restricted to a string for simplicity&apos;s sake,
                        but the the key can be anything the current language supports  which could range from
                        integers to trees to even other hash maps (that&apos;s a lot of space).
                    </>
                )
            }
            case ("Erase"): {
                return (
                    <>
                        Erasing a key from a hash map consitutes removing the mapping from a given key to its corresponding
                        value. This means that if you try to access the value of a key again after the key was deleted, you
                        most likely will not get the same value. Of course this not always the case if, for instance,
                        the original value was a primitive with some default value and returning default constructed values is how the hash map
                        handles accessing keys that are not in the map.
                    </>
                )

            }
        }

    }
    //=====================================================================================================
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
            {chosenOperation == "Erase" &&
                <div className="hashmap__erase">
                    <span>
                        Input the key to erase
                    </span>
                    <input
                        value={deletedKey}
                        onChange={(e) => setDeletedKey(e.target.value)}
                        maxLength={8}
                    />
                </div>
            }
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
            {returnHashingFunctionText()}
            <p className="hash__text">
                {returnHashText()}
            </p>
        </DsWrapper>
    )
}


export default HashMapDS
