import React, {useEffect, useState} from 'react';

import { IFrame } from './Iframe'
function App() {
  const creditCard = '4000000000001091'
  const jwtInit = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhODkwZjc2ZC0wYTdkLTQxMTgtOThiMi02YzRiZDEwOGEzNjkiLCJpYXQiOjE2MTgzODA4MDAsImlzcyI6IjYwMWU4M2QxM2UyYmM0MTdiODYzY2FiMSIsIk9yZ1VuaXRJZCI6IjYwMWU4M2QxZTFiNWRiMzY4ZTg5NDVlMiJ9.oDfP2Sle4d1S_wWGJ21PDrgZz9qLQGwx8678V9Q1p_E'
  

  const [jwt, setJWT] = useState(jwtInit)
  

  useEffect(() => {
    localStorage.clear()
    const handler = event => {
      if (event.origin === "https://centinelapistag.cardinalcommerce.com") {
					const data = JSON.parse(event.data);
					console.log('Event:', event);
					if (data !== undefined && data.Status) {
						console.log('DDC result:', data);
            //Can not set react state, SecurityError: Blocked a frame with origin
            //setDdcData(data)
            //store in localstorage instead
            localStorage.setItem('ddcData', JSON.stringify(data));
            //setSubmit(true)
					}			
				}
    }
    window.addEventListener("message", handler)

    // clean up
    return () => window.removeEventListener("message", handler)
  }, []) // empty array => run only once

  // useEffect(() => {
  //   const  ddcDataInStorage =  JSON.parse(localStorage.getItem('ddcData')) || {};
  // }, [submit])

  const onJWTChange = (e) => {
    setJWT(e.target.value)
  }
  const  ddcDataInStorage =  JSON.parse(localStorage.getItem('ddcData')) || {};
  console.log('ddcDataInStorage', ddcDataInStorage)
  return (
    <div className="App">
      <h1>3DS2 - iframe JWT validation</h1>
      <IFrame>
        <form id="collectionForm" method="POST" action="https://centinelapistag.cardinalcommerce.com/V1/Cruise/Collect" >
            <input type="text" name="Bin" value={creditCard} />
            <input type="text" name="JWT" value={jwt} onChange={onJWTChange} />
            <button type="submit">Submit</button>
          </form>
      </IFrame>
      {/* {ddcData && <p>SessionId: {ddcData.SessionId}</p>} */}
      <p>Input your JWT and click submit. Open your console to view DDC response</p>
      <p>Refresh the page to retry</p>
    </div>
  );
}

export default App;
