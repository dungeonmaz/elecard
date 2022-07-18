import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardsView from './components/card/CardsView';
import Header from './components/header/Header';
import Tree from './components/tree/Tree';

const API_URL = 'http://contest.elecard.ru/frontend_data/catalog.json'


function App() {
  const [data, setData] = useState([])
  const [coolData, setCoolData] = useState([])
  const [loading, setLoading] = useState(false)

  const prevData = JSON.parse(localStorage.getItem('previous'))


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await axios.get(API_URL)
      const response_t = response.data.map(el => ({...el, name:el.image.slice(el.image.indexOf('/') + 1, el.image.search(/\d/)-1)}))
      setCoolData(response_t)
      setLoading(false)
    }
    fetchData()
    if(prevData){
      setData(prevData)
    }
    else{
      setData(coolData)
    }
  }, [])

  const handleRestoreClick = () =>{
    setData(coolData)
    localStorage.setItem('previous', JSON.stringify(coolData))
  }

  const matches = useMediaQuery('(min-width:600px)')

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/cards" element={<CardsView matches={matches} data={data} setData={setData} handleRestoreClick={handleRestoreClick}/>} />
          <Route path="/tree" element={<Tree data={coolData} loading={loading} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
