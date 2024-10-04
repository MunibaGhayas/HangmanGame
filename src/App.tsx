import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import {HangmanDrawing}  from './Components/HangmanDrawing'
import  {HangmanWord}  from './Components/HangmanWord';
import {Keyboard}  from './Components/Keyboard';
import words from "./wordList.json"
import { Home } from './Components/Home'

function getWord(index: number){
  return{word: words[index].word, hint: words[index].hint}
}
function App() {
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const wordGuess = useMemo(() => getWord(currWordIndex), [currWordIndex]);
  const [guessLetters, setGuessLetters] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLoss, setIsGameLoss] = useState(false);
  const [status, setStatus] = useState("Guess The Word");
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const startGame = () =>{
    setIsOpen(true);
  }

  const addLetter = useCallback((letter: string) => {
    if (!guessLetters.includes(letter)) {
      setGuessLetters((prev) => [...prev, letter.toUpperCase()]);
    }
  }, [guessLetters]);

  const incorrectGuessLetter = guessLetters.filter(letter => !wordGuess.word.includes(letter));

  const resetGuessState = () => {
    setGuessLetters([]);
    setIsGameWon(false);
  };

  const goToNext = useCallback(()=>{
    if(currWordIndex < words.length - 1){
      setCurrWordIndex(prevIndex => prevIndex + 1);
      resetGuessState();
    } else{
      setGameComplete(true)
    }
  }, [currWordIndex]);
  useEffect(() =>{
    const loss = incorrectGuessLetter.length >= 6;
    const won = wordGuess.word.split('').every(letter => guessLetters.includes(letter.toUpperCase()));
    if(!gameComplete){
      if(won && !isGameWon && !isGameLoss){
        setIsGameWon(true)
        setStatus("YOU WON!")
        setCount(prev=> prev + 1)
        setTimeout(()=> {
          setStatus("Guess The Word")
          goToNext()}, 1000)
      } else if(loss && !isGameWon && !isGameLoss){
        setIsGameLoss(true)
        setStatus("YOU LOSE :(")
        setTimeout(()=> {
          setStatus("Guess The Word")
          goToNext()}, 1000)
      }
    }
  },[guessLetters, incorrectGuessLetter, wordGuess.word, goToNext, isGameLoss, isGameWon, gameComplete])

  if(gameComplete){
    return(
      <div>
        <h1 style={{display: "flex", justifyContent: "center", textAlign: "center", fontSize: "40px", fontWeight: "bold", background: "linear-gradient(90deg, #6A9AB0, #291a7be3, #6A9AB0, #291a7be3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",}}
          >Congratulations! You've scored {count} points !
        </h1>
      </div>
    )
  }

  return (
    <>
      {isOpen ? (
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1
             style={{
              background: "linear-gradient(60deg, #F2E8C6, #D91656, #F2E8C6, #D91656)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontSize: "40px"
              }}
            > {status}
            </h1>
            <HangmanDrawing noOfGuesses={incorrectGuessLetter.length} />
            <HangmanWord word={wordGuess.word} guessLetters={guessLetters} />
            <p style={{ textAlign: "center", fontSize: "19px", fontWeight: "bolder", color: "white", marginTop: "30px", marginLeft: "10px" }}>
               Hint: {wordGuess.hint}
            </p>
          </div>
          <div style={{ marginTop: "70px", display: "flex", justifyContent: "center" }}>
            <Keyboard addLetter={addLetter} guessedLetters={guessLetters} />
          </div>
        </div>
      ) : (
       <Home startGame={startGame}/>
      )}
    </>
  )
}

export default App

