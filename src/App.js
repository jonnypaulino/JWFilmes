
import './App.css';

import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';





function App() {

const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
      const load = async () => {
        let list = await Tmdb();
        setMovieList(list);
      } 
      load()
  }, [] );

  return (
    <div className="App">
      
    <table className="titleBar">
      <tbody>
        <tr>
        <td>
          <img alt="app gif" src="JWfilmes-logo.gif" 
          style={{
            width: '180px'
            
          }}/>
        </td>  
        </tr>
      </tbody>

    </table>

    <section className="lists">
      {movieList.map((item, key)=> (
        <MovieRow key={key} title={item.title} items={item.items} />
      ))}
    </section>
    <table className="titleBar">
      <tbody>
        <tr>
        <td>
          <img alt="app gif" src="JWfilmes-logo.gif" 
          style={{
            width: '180px'
            
          }}/>
        </td>  
        </tr>
      </tbody>

    </table>
    </div>
  );
}

export default App;
