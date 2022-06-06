import React, { useState } from "react";


function StudyCard({front,back,num,tot,next}){
    let [facing,flip] = useState(0)
    function nextCard() {
        next()
        flip(0)
    }
    let sides = [(<><h5>Front</h5><p>{front}</p></>),(<><h5>Back</h5><p>{back}</p><button onClick={nextCard}>Next</button></>)]

    return(
        <div key={num*2} className="studyCard">
            <h2>Card {num} of {tot}</h2>
            <>{sides[facing]}</>
            <button onClick={()=>{facing===0?flip(1):flip(0)}}>Flip</button>
        </div>
    )


}


export default StudyCard