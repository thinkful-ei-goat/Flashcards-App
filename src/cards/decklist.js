import React from "react"
import Navbar from "../overall/navbar"
import {
    NavLink, useHistory
  } from "react-router-dom";
import Deck from "./deck";

function Decklist({decks,setDecks}) {
    let theseDecks = []
    let history = useHistory()
    //functions: view, delete, study?, create

    

 



    for(let i=0;i<decks.length;i++){
        theseDecks.push(
            

            
            <Deck setDecks={setDecks} name={decks[i].name} description={decks[i].description} id={decks[i].id} count={decks[i].cards.length+' cards'}/>
            
        )
    }



    return(
    <>
    <Navbar/>
    <NavLink className='createDeck'to={`/decks/new`}>+ Create Deck</NavLink>
    {theseDecks}
    </>)
}


export default Decklist