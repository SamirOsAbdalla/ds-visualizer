"use client"
import React from 'react'
import "./DsChooser.css"
import { useState } from 'react';
import OptionPicker from '../OptionPicker/OptionPicker';


const dsArray: string[] = ["Linked List", "Heap"];



export default function DsChooser() {

    const [chosenDataStructure, setChosenDataStructure] = useState<string>("Linked List")

    return (
        <div className="dschooser__wrapper">
            <div className="dschooser__title">
                Choose Data Structure:
            </div>
            <div className="dschooser__menu">
                <OptionPicker
                    chosenOption={chosenDataStructure}
                    setChosenOption={setChosenDataStructure}
                    optionArray={dsArray}
                    optionClass='dschooser'
                />
            </div>
        </div>
    )
}
