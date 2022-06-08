import React, { useState,useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import Navbar from "../overall/navbar"
import Deck from "./deck"
import { readDeck } from "../utils/api";
function Deckview({setDecks}){
    const [deck,editDeck] = useState('loading')
    const history = useHistory()

    
    const [cards,editCards] = useState([(<p>Loading...</p>)])
    const {id} = useParams()
    function updateCards(){
        readDeck(id)
        .then((data)=>{
          editDeck(data)
          let {cards} = data
          editCards(()=>{
              let output = []
              for(let i=0;i<cards.length;i++){
                  let card = cards[i]
                  output.push(Card(card.front,card.back,card.id))
              }
              return output
          })        
        
        })
    }
    


    useEffect(()=>{
        updateCards()
      },[])

    const cardDelete = e =>{
        e.preventDefault()
        const id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('cardid')
        if(window.confirm('This will be permanent, are you sure?')){
            fetch(`http://localhost:8080/cards/${id}`, { method: 'DELETE' })
            .then(() => updateCards());
        }
    }

    const editCard = e =>{
        e.preventDefault()
        const cardId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('cardid')
        history.push(`/decks/${id}/cards/${cardId}/edit`)
    }
      

     
    
    function Card(front,back,id){
        return(
        <div cardid={id} key={id} className='card'>
            <table>
                <thead>
                    <tr>
                    <th>Front</th>
                    <th>Back</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{front}</td>
                    <td>{back}</td>
                </tr>
                <tr>
                    <td><button onClick={editCard}>Edit</button></td>
                    <td><button onClick={cardDelete}>🗑️</button></td>
                </tr>
                </tbody>
            </table>
            
            <hr/>
        </div>

        )
    }


    
    

    return (
        <>
        <Navbar name={deck.name}/>
        <Deck setDecks={setDecks} name={deck.name} description={deck.description} id={deck.id} mode={'edit'}/>
        {cards}
        </>
    )
}














export default Deckview