import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState('')
  const [referenceId, setSeferenceId] = useState(null)
  const creditCard = '4000000000001091'
  const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkMDNkNTlkNC1iYWFkLTQ5NDctYTMyYi00YmNiZjcxZTc4MjMiLCJpYXQiOjE2MTgyODU5OTYsImlzcyI6IjYwMWU4M2QxM2UyYmM0MTdiODYzY2FiMSIsIk9yZ1VuaXRJZCI6IjYwMWU4M2QxZTFiNWRiMzY4ZTg5NDVlMiJ9.c5H1MEda-en4RhtYv8jXNVEkpsaH7rN7qajxnNoD8Z0'

  useEffect(() => {
    console.log('do post request')
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const params = new URLSearchParams()
    params.append('Bin', creditCard)
    params.append('JWT', jwt)
    
    axios.post('https://centinelapistag.cardinalcommerce.com/V1/Cruise/Collect', params, config)
    .then((response) => {
      console.log('response', response);
      setData(response.data)

    }, (error) => {
      console.log(error);
    });

  }, []);

  return (
    <div className="App">
      <iframe>
        <form id="collectionForm" method="POST" action="https://centinelapistag.cardinalcommerce.com/V1/Cruise/Collect" >
          <input type="text" name="Bin" value={creditCard} />
          <input type="text" name="JWT" value={jwt} />
          <button type="submit">Submit</button>
        </form>
      </iframe>
      <h1>Response data</h1>
      <div dangerouslySetInnerHTML={{__html: data}} />
    </div>
  );
}

export default App;
