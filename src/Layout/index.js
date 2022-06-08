import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Decklist from "../cards/decklist"
import { Route, Switch } from "react-router-dom";
import Deckcreate from "../cards/deckcreate";
import Deckview from "../cards/deckview";
import Study from "../cards/study";
import CardCreate from "../cards/cardcreate";
import { listDecks } from "../utils/api";
//todo deck edit/view/delete/add
//card view/edit/delete/add
//study
function Layout() {
  const [decks,editDecks] = useState([])
  function setDecks() {
    fetch('http://localhost:8080/decks?_embed=cards')
    .then((r)=>r.json())
    .then((data)=>{
      editDecks(data)})
  }
  useEffect(()=>{
    listDecks().then((r)=>editDecks(r))
  },[])

  return (
    <>
      <Header />
      <div className="container">
        
        
        <Switch>
          <Route exact path={['/','/decks']}>
            <Decklist decks={decks} setDecks={setDecks}/>
          </Route>
          <Route path={'/decks/new'}>
            <Deckcreate decks={decks} setDecks={setDecks}/>
          </Route>
          <Route path='/decks/:id/cards/:cardid/edit'>
            <CardCreate mode='editCard' setDecks={setDecks}/>
          </Route>
          <Route path='/decks/:id/cards/new'>
            <CardCreate mode='addCard' setDecks={setDecks}/>
          </Route>
          <Route path='/decks/:id/study'>
            <Study/>
          </Route>
          <Route path='/decks/:id/edit'>
            <Deckcreate mode='edit' setDecks={setDecks}/>
          </Route>
          <Route path='/decks/:id'>
            <Deckview setDecks={setDecks}/>
          </Route>
          
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
