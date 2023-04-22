import Head from "next/head"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import GameLayout from "@/components/Layout/GameLayout"
import TalkScreen from "@/components/uiGroups/TalkScreen"
import Confession from "@/components/uiGroups/Confession"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [isInterMission, setIsInterMission] = useState<boolean>(true)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [isNotConfessionTime, setIsNotConfessionTime] = useState<boolean>(true)
  const clickChangeScreen = () => {
    setIsInterMission(!isInterMission)
  }
  const clickSetEnd = () => {
    setIsEnd(true)
  }
  const clickSetConfession = () => {
    setIsNotConfessionTime(!isNotConfessionTime)
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isNotConfessionTime ? (
        <GameLayout situation="/ジェシーの部屋2.jpeg">
          <TalkScreen
            text="疲れちゃった。そこのホテルで休憩しない？"
            clickSetConfession={clickSetConfession}
          />
        </GameLayout>
      ) : isEnd ? (
        <Confession text="END" />
      ) : isInterMission ? (
        <Confession clickChangeScreen={clickChangeScreen} text="♡告白タイム♡" />
      ) : (
        <GameLayout situation="/放課後の教室.jpeg">
          <TalkScreen clickSetEnd={clickSetEnd} text="ちょっとタバコ吸い行かない？" />
        </GameLayout>
      )}
    </>
  )
}
