"use client"
import React from 'react'
import "./DsChooser.css"
import { useState } from 'react';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs"

const dsArray: string[] = ["Linked List", "Heap"];



export default function DsChooser() {

    const [chosenDataStructure, setChosenDataStructure] = useState<string>("Linked List")
    const [caretOrientation, setCaretOrientation] = useState<"Up" | "Down">("Up")

    const handleCaretClick = () => {
        console.log('hi')
        const dsOptions = document.querySelector(".dschooser__options")
        if (caretOrientation == "Up") {
            setCaretOrientation("Down")
        } else {
            setCaretOrientation("Up")
        }
        dsOptions?.classList.toggle("show__options")
    }

    const handleOptionClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setChosenDataStructure(e.currentTarget.id)
        const dsOptions = document.querySelector(".dschooser__options")
        dsOptions?.classList.toggle("show__options")

    }
    return (
        <div className="dschooser__wrapper">
            <div className="dschooser__title">
                Choose Data Structure:
            </div>
            <div className="dschooser__menu">
                <div className="dschooser__chosends">
                    {chosenDataStructure}

                    {caretOrientation == "Up" ?
                        <BsFillCaretDownFill className="dschooser__caret" onClick={handleCaretClick} />
                        :
                        <BsFillCaretUpFill className="dschooser__caret" onClick={handleCaretClick} />
                    }
                </div>
                <div className="dschooser__options">
                    {dsArray.map((ds: string) =>
                        <div className="dschooser__option" onClick={handleOptionClick} id={ds} key={ds}>
                            {ds}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
