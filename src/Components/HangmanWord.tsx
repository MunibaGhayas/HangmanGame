type HangmanWordProp = {
    word: string
    guessLetters: string[]
}

export function HangmanWord({word, guessLetters}: HangmanWordProp){
    return(
        <div className="hangman-word" style={{display:'flex', gap: "1rem", fontSize: '2rem', fontWeight: 'bold', textTransform: 'uppercase', marginTop: "30px", justifyContent: 'center', alignItems: 'center'}}>
            {word.split("").map((letter, index )=>(
                 <span key={index} style={{borderBottom: '4px solid black'}}>
                    <span style={{ visibility: guessLetters.includes(letter) ? 'visible' : 'hidden', background: "linear-gradient(60deg, #F2E8C6, #D91656, #F2E8C6, #D91656)",
                         WebkitBackgroundClip: "text",
                         WebkitTextFillColor: "transparent",}}> {letter}
                    </span>
                 </span>
            ))}
        </div>
    )
}