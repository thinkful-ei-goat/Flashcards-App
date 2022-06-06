import React from "react";
import { useHistory } from "react-router-dom";

function Deck({name,description,id,setDecks,mode,count}){
    //delete
    
    let history = useHistory()
    const deleteDeck = (e) => {
        e.preventDefault()
        const id = e.target.parentNode.getAttribute('thisdeck')
        if(window.confirm('This will be permanent, are you sure?')){
            console.log(true)
            console.log(id)
            fetch(`http://localhost:8080/decks/${id}`, { method: 'DELETE' })
            .then(() => setDecks());
        }
    }
    const viewDeck = (e) => {
        e.preventDefault()
        const id = e.target.parentNode.getAttribute('thisdeck')
        history.push(`/decks/${id}`)

    }
    const study = e => {
        e.preventDefault()
        const id = e.target.parentNode.getAttribute('thisdeck')
        history.push(`/decks/${id}/study`)
    }
    const edit = e => {
        e.preventDefault()
        const id = e.target.parentNode.getAttribute('thisdeck')
        history.push(`/decks/${id}/edit`)
    }
    const addCard = e => {
        e.preventDefault()
        const id = e.target.parentNode.getAttribute('thisdeck')
        history.push(`/decks/${id}/cards/new`)

    }

    if(!mode){
    return(
        <div thisdeck={id} key={id}>
        <div className='cardHeader'>
        <h2>{name}</h2>
        <p>{count}</p>
        </div>
        <p>{description}</p>
        <button onClick={viewDeck}>View</button><button onClick={study}>Study</button><button name='delete' onClick={deleteDeck}>🗑️</button>
        </div>
    )}
    else{
        return(
            <div thisdeck={id} key={id}>
            <h2>{name}</h2>
            <p>{description}</p>
            <button onClick={edit}>Edit</button><button onClick={study}>Study</button><button onClick={addCard}>➕Add Cards</button><button name='delete' onClick={deleteDeck}>🗑️</button>
            </div>
        )
    }
}













export default Deck