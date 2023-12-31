import { useEffect, useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs"
import "./OptionPicker.css"

interface Props {
    chosenOption: string,
    setChosenOption: Dispatch<SetStateAction<string>>,
    optionArray: string[],
    optionClass: string,
    animationPlaying?: boolean
}

export default function OptionPicker({
    chosenOption,
    setChosenOption,
    optionArray,
    optionClass, animationPlaying }: Props) {

    const [caretOrientation, setCaretOrientation] = useState<"Up" | "Down">("Down")

    const orientCaret = () => {

        if (caretOrientation == "Up") {
            setCaretOrientation("Down")
        } else {
            setCaretOrientation("Up")
        }
    }

    const handleCaretClick = () => {
        const dsOptions = document.querySelector(`.${optionClass}`)
        if (animationPlaying == true) {
            return;
        }

        orientCaret()
        dsOptions?.classList.toggle("show__options")
    }

    const handleOptionClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (caretOrientation == "Down") {
            return;
        }
        setChosenOption(e.currentTarget.id)
        orientCaret()
        const dsOptions = document.querySelector(`.${optionClass}`)
        dsOptions?.classList.toggle("show__options")

    }

    useEffect(() => {
        const dsOptions = document.querySelector(`.${optionClass}`)
        dsOptions?.classList.remove("show__options")

        setCaretOrientation("Down")
    }, [animationPlaying])

    return (
        <div>
            <div className={`optionpicker__chosends`}>
                <span>{chosenOption}</span>


                {caretOrientation == "Down" ?
                    <BsFillCaretDownFill className="optionpicker__caret" onClick={handleCaretClick} />
                    :
                    <BsFillCaretUpFill className="optionpicker__caret" onClick={handleCaretClick} />
                }
            </div>

            <div className={`${optionClass} optionpicker__options`}>
                {optionArray.map((ds: string) =>
                    <div className="optionpicker__option" onClick={handleOptionClick} id={ds} key={ds}>
                        {ds}
                    </div>
                )}
            </div>
        </div>
    )
}
