"use client"

import "./page.css"
import Title from "../components/Title/Title"
import DsChooser from '@/components/DsChooser/DsChooser'
import { useState } from 'react'
import LinkedListDs from '@/components/DataStructures/LinkedList/LinkedList'
import MinHeapDs from "@/components/DataStructures/MinHeap/MinHeap"
import HashMapDS from "@/components/DataStructures/HashMap/HashMap"

const dsArray: string[] = ["Linked List", "HashMap", "Min Heap"];

export default function Home() {

  const [chosenDataStructure, setChosenDataStructure] = useState<string>("Linked List")

  return (
    <main className="home__wrapper">
      <Title />
      <DsChooser
        chosenDataStructure={chosenDataStructure}
        setChosenDataStructure={setChosenDataStructure}
        dsArray={dsArray}
      />
      {chosenDataStructure == "Linked List" ?
        <LinkedListDs />
        :
        <></>
      }
      {chosenDataStructure == "Min Heap" ?
        <MinHeapDs />
        :
        <></>
      }
      {chosenDataStructure == "HashMap" ?
        <HashMapDS />
        :
        <></>
      }
    </main>
  )
}
