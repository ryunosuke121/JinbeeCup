import Head from "next/head"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import GameLayout from "@/components/Layout/GameLayout"
import SelectLayout from "@/components/Layout/SelectLayout"
import TalkScreen from "@/components/uiGroups/TalkScreen"
import Confession from "@/components/uiGroups/Confession"
import { useState, useContext } from "react"
import { AnswerContext } from "@/components/providers/AnswerContext"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  //対話画面なのか、幕間画面なのかを判断するstate
  const [isInterMission, setIsInterMission] = useState<boolean>(true)
  //ゲームが終了したのかを判断するstate
  const [isEnd, setIsEnd] = useState<boolean>(false)
  //告白の場面なのか、ゲーム画面なのかを判断するstate
  const [isNotConfessionTime, setIsNotConfessionTime] = useState<boolean>(true)
  //相手の名前に関するstate
  const [name, setName] = useState("ジェシー")
  //幕間画面からゲーム画面に戻すための関数
  const clickChangeScreen = () => {
    setIsInterMission(!isInterMission)
  }
  //ゲームの終了を知らせる関数
  const clickSetEnd = () => {
    setIsEnd(true)
  }
  //告白タイムなのかを判断するための関数
  const clickSetConfession = () => {
    setIsNotConfessionTime(!isNotConfessionTime)
  }
  //女の子の画像を表示するためのstate
  const [imageUrl, setImageUrl] = useState<string>("");

  const { isCompleted, setIsCompleted } = useContext(AnswerContext)
  console.log(isCompleted)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!isCompleted ? (
        <SelectLayout imageUrl = {imageUrl} setImageUrl={setImageUrl}>
          <div></div>
        </SelectLayout>
      ) : isNotConfessionTime ? (
        <GameLayout situation="/ジェシーの部屋2.jpeg">
          <TalkScreen
            text="疲れちゃった。そこのホテルで休憩しない？"
            clickSetConfession={clickSetConfession}
            name={name}
            placeholder="ここに話したいことを記入してください"
            talkButton="話す"
            imageUrl
            setImageUrl
          />
        </GameLayout>
      ) : isEnd ? (
        //告白が終わっているかを判断
        <Confession text="END" />
      ) : isInterMission ? (
        //対話画面なのか、幕間画面なのかを判断
        <Confession clickChangeScreen={clickChangeScreen} text="♡告白タイム♡" />
      ) : (
        <GameLayout situation="/放課後の教室.jpeg" imageUrl = {imageUrl} setImageUrl={setImageUrl}>
          <TalkScreen
            clickSetEnd={clickSetEnd}
            text="ちょっとタバコ吸い行かない？"
            name={name}
            placeholder="さぁ、告白してください!"
            talkButton="告白する"
            imageUrl
            setImageUrl 
          />
        </GameLayout>
      )}
    </>
  )
}
