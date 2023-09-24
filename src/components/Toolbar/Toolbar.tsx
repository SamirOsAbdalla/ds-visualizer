"use client"
import "./Toolbar.css"
import { useState, Dispatch, SetStateAction } from "react"
import OptionPicker from "@/components/OptionPicker/OptionPicker"

interface Props {
    chosenOperation: string,
    setChosenOperation: Dispatch<SetStateAction<string>>,
    nodeColor: string,
    setNodeColor: Dispatch<SetStateAction<string>>,
    nodeValue: string,
    setNodeValue: Dispatch<SetStateAction<string>>,
    nodeKey?: string,
    setNodeKey?: Dispatch<SetStateAction<string>>,
    operationsArray: string[],
    animationPlaying?: boolean
    dsName?: string
}

const Toolbar = ({
    chosenOperation, setChosenOperation,
    operationsArray, nodeColor,
    setNodeColor, nodeValue,
    setNodeValue, animationPlaying,
    dsName, nodeKey, setNodeKey }: Props) => {

    return (
        <div className="toolbar__wrapper">
            <section className="toolbar__cell">
                <div className="toolbar__title toolbar__operation__title">
                    Choose Operation:
                </div>
                <div className="toolbar__operation__menu">
                    <OptionPicker
                        chosenOption={chosenOperation}
                        setChosenOption={setChosenOperation}
                        optionArray={operationsArray}
                        optionClass="toolbar"
                        animationPlaying={animationPlaying}
                    />
                </div>
            </section>
            <section className="toolbar__cell">
                {dsName !== "HashMap" &&
                    <>
                        <div className="toolbar__title toolbar__color__title">
                            Node Value:
                        </div>
                        <div className="toolbar__color__menu">
                            <input
                                value={nodeValue}
                                onChange={(e) => setNodeValue(e.target.value)}

                                type="number"
                                className="nodevalue__input"
                            />
                        </div>
                    </>
                }
                {dsName == "HashMap" &&
                    <div className="keyvalue__inputs">
                        <div className="keyvalue__input__container">
                            <div className="toolbar__title toolbar__color__title">
                                Node Key:
                            </div>
                            <div>
                                <input
                                    value={nodeKey}
                                    onChange={(e) => setNodeKey!(e.target.value)}
                                    maxLength={8}
                                    className="nodekeyvalue__input"
                                />
                            </div>
                        </div>

                        <div className="keyvalue__input__container">
                            <div className="toolbar__title toolbar__color__title">
                                Node Value:
                            </div>
                            <div >
                                <input
                                    value={nodeValue}
                                    onChange={(e) => setNodeValue(e.target.value)}
                                    maxLength={8}
                                    className="nodekeyvalue__input"
                                />
                            </div>
                        </div>
                    </div>
                }
            </section>
            {dsName !== "HashMap" &&
                <section className="toolbar__cell">
                    <div className="toolbar__title toolbar__color__title">
                        Node Color:
                    </div>
                    <div className="toolbar__color__menu">
                        <input

                            value={nodeColor}
                            onChange={(e) => setNodeColor(e.target.value)}
                            type="color"
                            className="nodecolor__input"
                        />

                    </div>
                </section>}

        </div>
    )
}

export default Toolbar
