import React from "react";
import { wordsList } from "@/app/Components/Data";
import { motion } from "framer-motion";
import { languages } from "@/app/Components/Data"
import { IBM_Plex_Mono } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
    variable: "--font-ibm-plex-mono",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"]
});

export default function Hero() {
    // storing user clicked letters
    const [userClickedLetters, setUserClickedLetters] = React.useState<string[]>([]);
    function letterClicked(letter: string): void {
        setUserClickedLetters(prev =>
            prev.includes(letter) ? prev : [...prev, letter]
        )
    }
    function gameRest(): void {
        setUserClickedLetters([]);
        setRandomWord(getRandomWord());
    }


    function getRandomWord(): string {
        const randomIndex = Math.floor(Math.random() * wordsList.length);
        return wordsList[randomIndex];
    }
    React.useEffect(() => {
        setRandomWord(getRandomWord());
    }, [])


    // rendering random word
    const [randomWord, setRandomWord] = React.useState("final");
    const wordArray = randomWord.split("");
    // number of wrong guesses
    const wrongGuesses = userClickedLetters.filter(letter => !randomWord.includes(letter)).length;
    // change new game button
    const gameWon = wordArray.every(letter =>
        userClickedLetters.includes(letter)
    )
    const gameLost = wrongGuesses >= languages.length - 1;
    const restColor = gameWon || gameLost;

    // Now use the game state in wordMap
    const wordMap = wordArray.map((letter, index) => {
        const normal = userClickedLetters.includes(letter) ? letter.toUpperCase() : ""
        return (
            <div key={index} className={`border-[#00a8e8] border-b-2 w-[3rem] h-[3rem] flex justify-center align-middle items-center
                font-bold text-3xl rounded-sm bg-[#253237] shadow-md text-[#f7f7f7]`}>
                {!gameLost && normal}
                {gameLost && letter.toUpperCase()}
            </div>
        )
    })



    // rendering all programing languages names
    const allLanguages = languages.map((languages, index) => {
        const wrongClick = index < wrongGuesses;
        const first = {
            backgroundImage: `linear-gradient(to bottom, ${languages.backgroundColor}, ${languages.backgroundColorBottom})`,
        }
        const second = {
            backgroundImage: `linear-gradient(to bottom, ${languages.backgroundColorTwo}, ${languages.backgroundColorTwoBottom})`,
        }
        const third = {
            backgroundColor: languages.backgroundColorThree,
            color: languages.color
        }

        return (
            <div key={index}
                style={first}
                className={`w-fit h-fit  p-[0.1em] rounded-[0.5em] shadow-sm flex justify-center 
                items-center align-middle pointer-events-none 
                ${wrongClick && "opacity-0 cursor-not-allowed pointer-events-none"}
                `}>
                <div className="w-full h-full py-[0.1em] rounded-[0.4em]" style={second}>
                    <div style={third} className={`px-3 py-1 rounded-[0.4em] font-semibold ${ibmPlexMono.className}`}>
                        {languages.name}
                    </div>
                </div>
            </div>
        )
    })


    // rendering alphabets
    const alphabets = "abcdefghijklmnopqrstuvwxyz";
    const alphabetArray = alphabets.split("");
    const alphabetMap = alphabetArray.map((letter, index) => {
        const isClicked = userClickedLetters.includes(letter);
        const isCorrect = isClicked && wordArray.includes(letter);
        const isWrong = isClicked && !wordArray.includes(letter);
        const theClickLimit = restColor

        return (
            <button
                onClick={() => letterClicked(letter)}
                key={index}
                disabled={isCorrect || isWrong || theClickLimit}
                className={`shadow-md flex justify-center items-center cursor-pointer 
                align-middle w-[3rem] h-[3rem] rounded-md font-bold text-lg border border-[#ced4da] bg-[#fffafb]
                ${isCorrect && 'bg-green-500 border-green-500 text-white transition-colors duration-200 ease-in-out'}
                ${isWrong && 'bg-red-400 border-red-400 text-[#f7f7f7] transition-colors duration-200 ease-in-out'}
                ${theClickLimit && (gameWon ? 'border-green-500 cursor-not-allowed pointer-events-none' :
                        'border-red-400 pointer-events-none cursor-not-allowed')}
                `}>
                {letter.toUpperCase()}
            </button>
        )
    })




    return (
        <section className="w-full h-screen lg:p-5 overflow-clip">
            <div className="w-full h-full bg-image">

                {/* Win or loose banner */}
                <div className="w-full h-[10vh]">

                </div>
                <div className="w-full h-[20vh] flex justify-center align-middle items-center flex-col p-2">
                    <div className="w-full h-[50%] flex justify-center items-center">
                        <p className="text-center font-bold m-2 text-lg lg:max-w-[40vw] md:max-w-[80vw]
                        bg-gradient-to-r from-[#1a2766] via-[#ae1b1e] to-[#fc9f32] text-transparent bg-clip-text">
                            Guess the word within 8 attempts to keep the programming world safe from dissapearance.
                        </p>
                    </div>
                    <div className={`w-auto px-10 h-[50%] flex justify-center items-center
                        rounded-lg shadow-md border border-[#ced4da] backdrop-blur-sm
                        ${gameWon && 'bg-[#04be23] border-[#04be23]'}
                        ${gameLost && 'bg-[#d00000] border-[#d00000]'}`}>
                        <div className="lg:max-w-[40vw] md:max-w-[80vw] h-auto ">
                            {gameWon && <h1 className={`text-[#f7f7f7] text-center font-bold m-0 text-3xl ${ibmPlexMono.className} leading-relaxed`}>
                                YOU WON THE GAME</h1>}
                            {gameLost && <h1 className={`text-[#f7f7f7] text-center font-bold m-0 text-3xl ${ibmPlexMono.className} leading-relaxed`}>
                                YOU LOST THE GAME</h1>}
                            {!gameWon && !gameLost && <h1 className={`text-[#0a0a0a] text-center font-bold m-0 text-3xl ${ibmPlexMono.className} leading-relaxed`}>
                                LET'S PLAY THE GAME</h1>}
                        </div>
                    </div>
                </div>


                {/* Tablets group */}
                <motion.div className="w-full h-auto overflow-clip flex justify-center flex-col items-center gap-10  p-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}>
                    <div className="w-full h-auto flex flex-col justify-center items-center">
                        <div className="w-full h-fit flex flex-wrap md:max-w-[65vw] lg:max-w-[40vw] max-w-[90vw] gap-2 justify-center items-center
                            align-middle m-0">
                            {allLanguages}
                        </div>
                    </div>


                    <div className="w-full h-fit flex justify-center items-center gap-[0.2em]">
                        {wordMap}
                    </div>

                    <div className="w-auto h-auto flex flex-col justify-center items-center">
                        <div className="w-full h-auto flex justify-center lg:max-w-[43vw] md:max-w-[80vw] 
                        flex-wrap gap-3 items-center align-middle">
                            {alphabetMap}
                        </div>

                        <div className={`w-full h-auto p-5 ${ibmPlexMono.className}`}>
                            <button
                                onClick={gameRest}
                                style={{
                                    backgroundColor: restColor ? '#00a8e8' : '#fffafb',
                                    color: restColor ? '#f7f7f7' : '#0a0a0a',
                                }}
                                className={`px-10 py-2 text-lg font-semibold rounded-lg cursor-pointer 
                                bg-[#fffafb] border-[#ced4da] border shadow-md transition-colors duration-200 ease-in-out`}>
                                Start New Game
                            </button>
                        </div>
                    </div>


                </motion.div>
            </div>
        </section>
    )
}