"use client"
import "./LLToolbar.css"
import { useState, Dispatch, SetStateAction } from "react"
import OptionPicker from "@/components/OptionPicker/OptionPicker"

interface Props {
    chosenOperation: string,
    setChosenOperation: Dispatch<SetStateAction<string>>,
    nodeColor: string,
    setNodeColor: Dispatch<SetStateAction<string>>,
    nodeValue: string,
    setNodeValue: Dispatch<SetStateAction<string>>,
    operationsArray: string[],
}

const LLToolbar = ({
    chosenOperation, setChosenOperation,
    operationsArray, nodeColor,
    setNodeColor, nodeValue,
    setNodeValue }: Props) => {

    return (
        <div className="lltoolbar__wrapper">
            <section className="lltoolbar__cell">
                <div className="lltoolbar__title lltoolbar__operation__title">
                    Choose Operation:
                </div>
                <div className="lltoolbar__operation__menu">
                    <OptionPicker
                        chosenOption={chosenOperation}
                        setChosenOption={setChosenOperation}
                        optionArray={operationsArray}
                        optionClass="lltoolbar"
                    />
                </div>
            </section>
            <section className="lltoolbar__cell">
                <div className="lltoolbar__title lltoolbar__color__title">
                    Node Value:
                </div>
                <div className="lltoolbar__color__menu">
                    <input
                        value={nodeValue}
                        onChange={(e) => setNodeValue(e.target.value)}

                        type="number"
                        className="nodevalue__input"
                    />
                </div>
            </section>
            <section className="lltoolbar__cell">
                <div className="lltoolbar__title lltoolbar__color__title">
                    Node Color:
                </div>
                <div className="lltoolbar__color__menu">
                    <input
                        value={nodeColor}
                        onChange={(e) => setNodeColor(e.target.value)}
                        type="color"
                        className="nodecolor__input"
                    />

                </div>
            </section>

        </div>
    )
}

export default LLToolbar
