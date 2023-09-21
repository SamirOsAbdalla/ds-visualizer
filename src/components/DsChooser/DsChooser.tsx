"use client"
import React from 'react'
import "./DsChooser.css"
import { useState, Dispatch, SetStateAction } from 'react';
import OptionPicker from '../OptionPicker/OptionPicker';



interface Props {
    chosenDataStructure: string,
    setChosenDataStructure: Dispatch<SetStateAction<string>>,
    dsArray: string[]
}

export default function DsChooser({ chosenDataStructure, setChosenDataStructure, dsArray }: Props) {


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
