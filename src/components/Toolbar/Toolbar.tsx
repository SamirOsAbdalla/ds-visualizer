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
    operationsArray: string[],
}

const Toolbar = ({
    chosenOperation, setChosenOperation,
    operationsArray, nodeColor,
    setNodeColor, nodeValue,
    setNodeValue }: Props) => {

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
                    />
                </div>
            </section>
            <section className="toolbar__cell">
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
            </section>
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
            </section>

        </div>
    )
}

export default Toolbar
