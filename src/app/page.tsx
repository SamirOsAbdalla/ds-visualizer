import Image from 'next/image'
import "./page.css"
import Title from "../components/Title/Title"
import DsChooser from '@/components/DsChooser/DsChooser'
import LinkedListDs from '@/components/DataStructures/LinkedList/LinkedList'

export default function Home() {
  return (
    <main className="home__wrapper">
      <Title />
      <DsChooser />
      <LinkedListDs />
    </main>
  )
}
