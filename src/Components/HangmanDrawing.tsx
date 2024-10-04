import { useEffect, useState } from "react";
import "./HangmanDrawing.css";
import React from "react";

type HangmanDrawingProp ={
    noOfGuesses: number
}

export function HangmanDrawing({noOfGuesses}: HangmanDrawingProp){
    const [isMobile, setIsMobile] = useState(window.innerWidth<=600);

    useEffect(()=>{
        const handleResize = ()=> setIsMobile(window.innerWidth<=600);
        window.addEventListener("resize", handleResize);
        return ()=> window.removeEventListener("resize", handleResize)
    }, [])
    const Head = (
        <div style={{
            width: isMobile ? "32px" : "50px",
            height: isMobile ? "32px" : "50px",
            borderRadius: "50%",
            border: "5px solid white",
            position: "absolute",
            top: isMobile ? "46px" : "62px",
            right: isMobile ? "-18px" : "-26px"
        }} />
    );
    const Body = (
        <div style={{
            width: "6px",
            height: isMobile ? "62px" : "80px",
            backgroundColor: "white",
            position: "absolute",
            top: isMobile ? "87px" : "120px",
            right: "0"
        }} />
    );

    const RightArm = (
        <div style={{
            width: "6px",
            height: isMobile ? "40px" : "50px",
            backgroundColor: "white",
            position: "absolute",
            top: isMobile ? "85px" : "115px",
            right: "0",
            rotate: "60deg",
            transformOrigin: "right bottom"
        }} />
    );

    const LeftArm = (
        <div style={{
            width: "6px",
            height: isMobile ? "40px" : "50px",
            backgroundColor: "white",
            position: "absolute",
            top: isMobile ? "85px" : "115px",
            right: "0",
            rotate: "-60deg",
            transformOrigin: "left bottom"
        }} />
    );

    const RightLeg = (
        <div style={{
            width: "6px",
            height: isMobile ? "42px" : "50px",
            backgroundColor: "white",
            position: "absolute",
            top: isMobile ? "110px" : "150px",
            right: isMobile ? "6px" : "5px",
            rotate: "130deg",
            transformOrigin: "right bottom"
        }} />
    );

    const LeftLeg = (
        <div style={{
            width: "6px",
            height: isMobile ? "42px" : "50px",
            backgroundColor: "white",
            position: "absolute",
            top: isMobile ? "110px" : "150px",
            right: isMobile ? "-6px" : "-5px",
            rotate: "-130deg",
            transformOrigin: "left bottom"
        }} />
    );

    const body_parts = [Head, Body, RightArm, LeftArm, RightLeg, LeftLeg]
  return (
    <div style={{position: "relative", marginTop: "14px", marginLeft: "20px"}}>
        {body_parts.slice(0, noOfGuesses).map((part, index)=>(
            <React.Fragment key={index}>{part}</React.Fragment>
        ))}
        <div className="first" ></div>
        <div className="second"></div>
        <div className="third" ></div>
        <div className="fourth" ></div>   
    </div>
  )
}
