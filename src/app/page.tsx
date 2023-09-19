import Image from 'next/image'
import "./page.css"
import Title from "../components/Title/Title"
import DsChooser from '@/components/DsChooser/DsChooser'


export default function Home() {
  return (
    <main className="home__wrapper">
      <Title />
      <DsChooser />
    </main>
  )
}
