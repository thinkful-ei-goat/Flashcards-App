import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../overall/navbar";
import { createCard, readCard, readDeck, updateCard } from "../utils/api";



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
        if(mode==='edit'){
            readCard(cardid).then((r)=>formEdit(r))
        }

    },[])
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

    const cancel = e => history.push(`/decks/${id}`)






    if(mode){
    return(
        <>
        <Navbar mode='editCard' name={deck.name} />
        <h1>{deck.name}</h1>
        <form onSubmit={editSubmit}>
            <h5>Name</h5>
            <textarea placeholder={preload.front} id="front" rows="3" type="text" name="front" required={true} onChange={formHandler} value={form.front}/>
            <h5>Description</h5>
            <textarea placeholder={preload.back} id="description" rows="3" type="text" name="back" required={true} onChange={formHandler} value={form.back}/>
            <hr/>
            <button onClick={cancel}>Cancel</button><button type="submit">Save</button>
        </form>
        </>
    )
    }else{
        return(
            <>
        <Navbar mode='addCard' name={deck.name} />
        <h1>{deck.name}</h1>
        <form onSubmit={formSubmit}>
            <h5>Name</h5>
            <textarea placeholder={preload.front} rows="3" id="front" type="text" name="front" required={true} onChange={formHandler} value={form.front}/>
            <h5>Description</h5>
            <textarea placeholder={preload.back} rows="3" id="description" type="text" name="back" required={true} onChange={formHandler} value={form.back}/>
            <hr/>
            <button onClick={cancel}>Cancel</button><button type="submit">Save</button>
        </form>
        </>
        )
    }
}


export default CardCreate