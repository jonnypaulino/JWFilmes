
import './App.css';

import React, { useEffect, useState } from 'react';
import Tmdb from '../controllers/Tmdb';
import MovieRow from '../components/MovieRow';


function App() {

const [movieList, setMovieList] = useState([]);

    // carregando os filmes

    useEffect(()=>{
      const load = async () => {
        let list = await Tmdb();
        setMovieList(list);
      } 
      load()
  }, [] );

  return (
    <div className="App">
      {/* header com logo*/}
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
          {/* Lista com cada filmes */}
    <section className="lists">
      {movieList.map((item, key)=> (
        // Manipulação em controllers/MovieRow
        <MovieRow key={key} title={item.title} items={item.items} />
      ))}
    </section>
    {/* Logo no final da pagina */}
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
