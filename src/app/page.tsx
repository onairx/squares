'use client'
import React, { useEffect } from "react"
import Main from "./Components/Main"
import Lenis from "lenis"

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  return (
    <section>
      <Main />
    </section>
  )
}