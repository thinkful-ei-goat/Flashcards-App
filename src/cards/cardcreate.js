import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../overall/navbar";

import { createCard, readCard, readDeck, updateCard } from "../utils/api";
import CardTemplate from "./cardtemplate";



function CardCreate({mode,setDecks}) {
    const history = useHistory()
    let formInit = {
        front:'front of the card',
        back:'back of the card'

    }
    let [deck,deckEdit] = useState({name:'Loading Deck'})
    let [preload,cardEdit] = useState(formInit)
    let [form,formEdit] = useState(formInit)
    const {id,cardid} = useParams()
    const formHandler = ({target}) => {
        formEdit({...form,[target.name]:target.value})
      }
    useEffect(()=>{
        
        readDeck(id).then((r)=>deckEdit(r))
        if(mode==='editCard'){
            readCard(cardid).then((r)=>formEdit(r))
        }

    },[id,cardid,mode])
    const formSubmit = (e) => {
        e.preventDefault()
        createCard(id,form)
            .then(() => {
                setDecks()
                formEdit(formInit)
                history.push(`/decks/${id}`)
            });

        

    }

    const editSubmit = (e) => {
        e.preventDefault()
        updateCard(form)
            .then(() => {
                setDecks()
                formEdit(formInit)
                history.push(`/decks/${id}`)
            });

        

    }

    



    
    

    
    return(
        <>
        <Navbar mode={mode} name={deck.name} />
        <CardTemplate
        deck={deck} mode={mode} editSubmit={editSubmit} formSubmit={formSubmit}
        formHandler={formHandler} form={form} id={id} preload={preload}
        />
        </>
    )
}


export default CardCreate