import React, {  useState} from 'react';
import  './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { GrClose, GrWindows } from 'react-icons/gr';

var titleMovie;
var overviewMovie;
var imageMovie;
var dateMovie;
var voteMovie;
var titleSerie;
var dateSeries;
var sizeImgCard;
var imagePri;
var datefinal


function MovieRow( {title, items}) {

    dateMovie = new Date(dateMovie);
    dateSeries = new Date(dateSeries);

    console.log(overviewMovie)

    if(isNaN(dateSeries)){
        datefinal = dateMovie;
    }
    if(isNaN(dateMovie)){
        datefinal = dateSeries;
    }

    if(overviewMovie == undefined){
        overviewMovie = 'Sem Sinopse'
    }

    console.log(overviewMovie)
    
    const [showMe, setShowMe] = useState(false);
    const [scrolx, setScrolx] = useState(0);
    console.log(window.innerWidth);
    if(Math.round(window.innerWidth) > 1200){
        sizeImgCard = '500'
    }else{
        sizeImgCard = 300
    }
  
    // Controles de movimentação
    const handleLeftArrow = () => {
        let x = scrolx + Math.round(window.innerWidth / 2);
            if(x>0){
                x =0;
            }
            console.log(x);
            setScrolx(x);
    }

    const handleRightArrow = () => {
        let x = scrolx - Math.round(window.innerWidth / 2);
        let fullSize = items.results.length * 150;
        if(x < window.innerWidth - fullSize){
                x = (window.innerWidth - fullSize) - 60;
        }
        setScrolx(x);
    }

    return (
        <div className="movieRow">
           <div className="details">
               {
                showMe?
                // Detalhes de cada filme/Serie
                            <section className="details--movie" style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${imageMovie})`
                            }}>
                                <div className="details--movie--vertical">
                                    <table>
                                        <tbody>
                                            <tr >
                                                <td>
                                                <img 
                                                src={`https://image.tmdb.org/t/p/w300${imagePri}`} 
                                                alt={titleMovie}
                                                 className="details--img"/>
                                                </td>
                                                <div className="details--title"> 
                                                     {titleMovie}{titleSerie}{` (${datefinal.getFullYear()})` }
                                                    
                                                 </div>
                                                 <div className="details--date">
                                                     {datefinal.toLocaleDateString('pt-BR')}
                                                 </div>
                                                 <div className="details--avalicao">
                                                     Nota de Avaliaçõa: {voteMovie}
                                                 </div>
                                                 <div className="details--title--sinopse">
                                                     Sinopse
                                                 </div>
                                                 <div className="details--sinopse">
                                                     {overviewMovie}
                                                 </div>
                                                 <div className="details--button">
                                                 <button onClick={()=> {
                                                  setShowMe(false)
                                                     }} className="card--button">
                                                     Fechar
                                                 </button>
                                                 </div>
                                            </tr>
                                        </tbody>
                                    </table>
                                        
                                </div>
                            </section>
                              :null
                             }     
               </div>
               <h2 className="title--listing">
               {/* Titulos das listas de filmes barra series */}
               {title}
           </h2>
               {/* Lista de filmes*/}
           <div className="movieRow--listtotal" style={{
                marginLeft: scrolx,
                width: items.results.length * 152,
              }
           }>
               {/* botões de nevagação  */}
               <div className="movieRow--left" onClick={handleLeftArrow}>
                    <NavigateBeforeIcon style={{fontSize: '50px'}} />
               </div>
               <div className="movieRow--right" onClick={handleRightArrow}> 
                    <NavigateNextIcon style={{fontSize: '50px'}} />
               </div>
               <div className="movieRow--list">
                  {items.results.length > 0 && items.results.map((item, key)=>(
                    <div key={key} className="movieRow--item">
                        {/* imagens dos filmes onde podemos cliqcar para obter detalhes */}
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} onClick={()=> {
                            setShowMe(false)
                            console.log(sizeImgCard);
                            titleMovie = item.title;
                            titleSerie = item.name;
                            overviewMovie = item.overview;
                            imagePri = item.poster_path;
                            imageMovie = item.backdrop_path;
                            dateMovie = item.release_date;
                            voteMovie = item.vote_average;
                            dateSeries = item.first_air_date;
                            setShowMe(true)
                        }}/>
                    </div>
                  ))}          
               </div>
           </div>
        </div>
    )
}

export default MovieRow;