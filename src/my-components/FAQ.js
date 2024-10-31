// Import dependencies and other components
import React, { useState } from 'react';
import Questions from './faqs.json';
import ManualSlideshow from './ManualSlideshow';
import AutoSlideshow from './AutoSlideshow';
 
//Function Component 
function FAQ() { 
    //Declare a "state": "enteredKeywords" 
    const [enteredKeywords, setEnteredKeywords] = useState(''); 

    let id=0; 
 
    //Component UI: HTML Rendering 
    return(<> 
        <div style={{minHeight: '60vh', padding: '10px', width: '100%'}}> 
            <h1 style={{padding: '2px'}}>Frequently Asked Questions</h1>   

            {/*Add search box on top*/}    
            <div className='row'> 
                <input className='col-11 m-3' 
                        style={{margin: '2px', width: '95%'}} 
                        type='text'  
                        name='search'  
                        onChange={(e) => {setEnteredKeywords(e.target.value)} } placeholder='Keywords' > 
                </input> 
            </div>
  
            {/*Loop through all questions and display them*/}           
            <div>                
                {/*and extract “question” & “answer” */} 
                {Questions.filter( 
                    question => question.question.toLowerCase().includes(enteredKeywords.toLowerCase())  
                    || question.answer.toLowerCase().includes(enteredKeywords.toLowerCase()) 
                ).map( 
                    question => { 
                        return( 
                        <div className='bg-warning p-3 m-2' key={id++}> 
                            <h4>{question.question}</h4> 
                            <p>{question.answer}</p> 
                        </div> 
                        ); 
                    } 
                )} 
            </div> 

            {/* Render the Manual and Auto Slideshows in the Same Row */}
            <div className="row">
                    <div className="col-6">
                        <ManualSlideshow />
                    </div>
                    <div className="col-6">
                        <AutoSlideshow />
                    </div>
                </div>
           
        </div>        
    </>); 
} 
 
//Export this component to the entire app, can be re-used or hooked into other Components 
export default FAQ;