import { useEffect, useState } from "react";

export function Home({startGame} : {startGame: ()=> void}){
   const [isMobile, setIsMobile] = useState(window.innerWidth<=660);

    useEffect(()=>{
        const handleResize = ()=> setIsMobile(window.innerWidth<=600);
        window.addEventListener("resize", handleResize);
        return ()=> window.removeEventListener("resize", handleResize)
    }, [])
   return(
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
         <h1 style={{ fontSize: "46px", fontWeight: "bold", color: "#F2E8C6", textAlign: "center"}}>Hangman Game</h1>
         <button style={{ display: "flex", justifyContent: "center", marginLeft: isMobile? "40px" : "100px", fontSize: "18px", fontWeight: "bold", color: "#F2E8C6", backgroundColor: "black", padding: "12px 35px", borderRadius: "0.5rem"}} onClick={startGame}>PLAY</button>
      </div>

   )

}