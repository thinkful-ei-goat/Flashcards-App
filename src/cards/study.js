import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../overall/navbar";
import { readDeck } from "../utils/api";
import StudyCard from "./studyCard";


function Study() {
    
    const [thiscard,nextcard] = useState(0)
    const {id} = useParams()
    const [name,setName] = useState(id)
    const [cards,editCards] = useState([(<p>Loading Cards...</p>)])
    useEffect(()=>{
      readDeck(id).then((r)=>{
        let {cards,name} = r
        let cardArray = []
        for(let i=0;i<cards.length;i++){
          let {front,back} = cards[i]
          
          cardArray.push(<StudyCard front={front} back={back} num={i+1} tot={cards.length} next={()=>nextcard((prev)=>{if(prev<cards.length-1){return prev+1}else{return prev}})}/>)
        }
        editCards(cardArray)
        setName(name)
      })
      

    },[])
    
    function cardZero() {
      nextcard(0)
    }


    if(cards.length>2){
    return(
    <>
    <Navbar name={name} mode='study'/>   
    <h1>{name} : Study</h1>
      {cards[thiscard]}
      {thiscard===cards.length-1?(<button onClick={cardZero}>Restart</button>):('')}
    </>
    )}
    else{
      return(
        <>
        <Navbar name={name} mode='study'/>    
        <h1>{name} : Study</h1>
        <p>Not enough cards.</p>
        </>
      )
    }

}


export default Study