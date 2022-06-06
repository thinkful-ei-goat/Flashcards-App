import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { readDeck } from "../utils/api";
import Navbar from "../overall/navbar"

function Deckcreate({setDecks,decks,mode}) {
    let history = useHistory();
    const {id} = useParams()
    const [preload,load] = useState({name:'Loading...',description:'Loading...'})



    const formInit = {
        name:'',
        description:''
    }
    const [form,formEdit] = useState(formInit)
    useEffect(()=>{
    if(id){
        readDeck(id).then((r)=>{
            let thisDeck = {name:r.name,description:r.description}
            load(thisDeck)
            formEdit(thisDeck)
        })
    }
    
       
      },[])
    
    function deckrement(decks){
        let count=1
        for(let i=0;i<decks.length;i++){
            if(decks[i].id>count){
                count=decks[i].id+1
            }
        }
        return count

    }


    const formSubmit = (e) => {
        e.preventDefault()
        let id=(deckrement(decks))
        fetch(`http://localhost:8080/decks/`, { method: 'POST', headers: {
            "Content-Type": "application/json"
          }, body: JSON.stringify(form) })
            .then(() => {
                setDecks()
                formEdit(formInit)
                history.push(`/decks/${id}`)
            });

        

    }

    const editSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/decks/${id}`, { method: 'PUT', headers: {
            "Content-Type": "application/json"
          }, body: JSON.stringify(form) })
            .then(() => {
                setDecks()
                formEdit(formInit)
                history.push(`/decks/${id}`)
            });

        

    }
    const formHandler = ({target}) => {
        formEdit({...form,[target.name]:target.value})
      }

    const cancel = e =>{
        e.preventDefault()
        history.push('/')
    }
    if(mode!=='edit'){
    return(
    <>
    <Navbar/>
    <h1>Create Deck</h1>
    <form onSubmit={formSubmit}>
    <h5>Name</h5>
    <input placeholder="Deck name" id="name" type="text" name="name" required={true} onChange={formHandler} value={form.name}/>
    <h5>Description</h5>
    <textarea placeholder="Deck description" id="description" type="text" name="description" required={true} onChange={formHandler} value={form.description}/>
    <hr/>
    <button onClick={cancel}>Cancel</button><button type="submit">Create</button>
    </form>
    </>
        )}
    else{
    
    
    
    
  
    return(
    <>
    <Navbar name={preload.name} mode='edit'/>
    <h1>Edit Deck</h1>
    <form onSubmit={editSubmit}>
    <h5>Name</h5>
    <input placeholder={preload.name} id="name" type="text" name="name" required={true} onChange={formHandler} value={form.name}/>
    <h5>Description</h5>
    <textarea placeholder={preload.description} id="description" type="text" name="description" required={true} onChange={formHandler} value={form.description}/>
    <hr/>
    <button onClick={cancel}>Cancel</button><button type="submit">Submit</button>
    </form>
    </>
        )
    }
}












export default Deckcreate