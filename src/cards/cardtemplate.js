import React from "react";
import { useHistory } from "react-router-dom";



function CardTemplate({deck, mode, editSubmit, formSubmit, formHandler, form, id, preload}){
    const history=useHistory()

    const cancel = e => history.push(`/decks/${id}`)
    

    return(
    <>
    <h1>{deck.name}</h1>
        <form onSubmit={mode==='editCard'?editSubmit:formSubmit}>
            <h5>Name</h5>
            <textarea placeholder={preload.front} id="front" rows="3" type="text" name="front" required={true} onChange={formHandler} value={form.front}/>
            <h5>Description</h5>
            <textarea placeholder={preload.back} id="description" rows="3" type="text" name="back" required={true} onChange={formHandler} value={form.back}/>
            <hr/>
            <button onClick={cancel}>Cancel</button><button type="submit">Save</button>
        </form>
    </>
    )
}

export default CardTemplate