import React from 'react';



export default function login(){
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <openidconnect-signin id="signin_popup"
                            scope="openid profile"
                            clientid="assessment_handler"
                            authority="https://api.learning-layers.eu/o/oauth2"
                            providername="Layers"
                            popupredirecturi="http://localhost:3000/"
                            popuppostlogoutredirecturi="http://localhost:3000/"
                            silentredirecturi="http://localhost:3000/"></openidconnect-signin>
            <Assessments />
          </header>
    
        </div>
     );
}