import "./Keyboard.css"
const Keys = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ]
type KeyboardProp = {
    addLetter: (key: string) => void ;
    guessedLetters: string[];
}
export function Keyboard({addLetter, guessedLetters}: KeyboardProp){
    return(
        <div className="keyboard">
            {Keys.map(key=>{
                const isGuessed = guessedLetters.includes(key.toUpperCase())
                return (
                    <button className="btn" key={key} onClick={()=> addLetter(key.toUpperCase())} disabled={isGuessed} 
                    style={{background: isGuessed ? "linear-gradient(60deg, #F2E8C6, #D91656, #F2E8C6, #D91656)" : "rgb(235, 236, 230)", 
                        fontWeight: isGuessed ? "bold" : "normal", color: isGuessed ? "#0A1D56" : "black"}}>{key}</button>
                )
            })}
        </div>
    )
}