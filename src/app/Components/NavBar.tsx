import React from "react";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
const ibmPlexSans = IBM_Plex_Sans({
    variable: "--font-ibm-plex-sans",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
    variable: "--font-ibm-plex-mono",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"]
});

export default function NavBar() {
    return (
        <nav className="flex flex-col justify-center align-middle items-center text-center p-5 
            gap-1 w-full h-auto absolute overflow-clip">
            <div className="flex justify-end align-bottom items-end gap-1">
                <h1 className={`${ibmPlexMono.className} text-4xl font-semibold text-[#0a0a0a] font-mono`}>Squares</h1>
                <div className="w-[0.34rem] h-[0.34rem] rotate-[60deg] bg-orange-400 mb-[0.45em]"></div>
            </div>
            <p className={`${ibmPlexSans.className} text-[0.7rem] font-normal`}><i>guessing starts here</i></p>
        </nav >
    )

}