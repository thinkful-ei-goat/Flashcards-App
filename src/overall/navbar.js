import React from "react";
import { NavLink, useLocation} from "react-router-dom";


function Navbar({name, mode}) {
    
    let {pathname} = useLocation()
    let hasName=false
    if(name){
      hasName=true
    }
    

    let pathArray = pathname.split('')
    let x=0
    let Breadcrumbs = []
    let summation = ''
    let current = '🏠 Home'
    for(let i=0;i<pathArray.length;i++){
        summation+=pathArray[i]
        if(pathArray[i]!=='/') current+=pathArray[i]
        
        if(pathArray[i]==='/'){
          x++
            if(current==='decks'||current==='deck') current='📇'+current
            if(current==='cards'&& mode==='addCard'){current='';continue}
            
            if(current==='cards'||current==='cards') current='🃏'+current
            if(current==='study')current='🔍'+current
            if(mode&&x===3){current=name}
            Breadcrumbs.push(
                <div key={current}><NavLink key={current} to={summation}>{current}</NavLink> &nbsp;{'>'}&nbsp; </div>
                
            )
            
            current=''
        }
    }
    if(current==='decks'||current==='deck') current='📇'+current
    if(current==='cards'||current==='cards') current='🃏'+current
    if(current==='study')current='🔍'+current
    if(hasName===true&&!mode){current=name}
    if(current==='new'&&mode==='addCard') current = 'Add Card'
    Breadcrumbs.push(
      
        <NavLink key={current} to={summation}>{current}</NavLink>
        
    )

    return(<div className='breadcrumb'>{Breadcrumbs}<hr/></div>)
}

export default Navbar