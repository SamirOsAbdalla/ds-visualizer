import React from 'react'
import "./DsWrapper.css"

interface Props {
    children: React.ReactNode
}
export default function DsWrapper({ children }: Props) {
    return (
        <div className="dswrapper">
            {children}
        </div>
    )
}
