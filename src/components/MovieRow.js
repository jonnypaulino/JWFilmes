import React, {  useState} from 'react';
import  './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Card, Image } from 'semantic-ui-react';
    

var titleMovie;
var overviewMovie;
var imageMovie;
var dateMovie;
var voteMovie;
var titleSerie;
var dateSeries;
var sizeImgCard;


function MovieRow( {title, items}) {
    
    const [showMe, setShowMe] = useState(false);
    const [scrolx, setScrolx] = useState(0);

    if(Math.round(window.innerWidth) > 1500){
        sizeImgCard = 400
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
            
           <h2 className="title--listing">
               {/* Titulos das listas de filmes barra series */}
               {title}
           </h2>
           
           <div>
               {
                showMe?
                // Detalhes de cada filme/Serie
                    <div className="card" style={{
                        width: window.innerWidth * 0.7,
                        }}>
                        <Card className="card--total">
                            {/* Imagem do filme/Serie */}
                            <Image src={`https://image.tmdb.org/t/p/w${sizeImgCard}${imageMovie}`} wrapped ui={false} alt={imageMovie} className="card--img" />
                                <Card.Content>
                                    {/* Titulo do filme/Serie */}
                                    <Card.Header className="card--title">{titleMovie}{titleSerie}</Card.Header>
                                        <Card.Meta>
                                            {/* Data de lançamento de cada filme/Serie */}
                                          <span className="card--date">Data de lançamento:  {dateMovie} {dateSeries}</span>
                                        </Card.Meta>
                                            <div className="card--title">
                                                Descrição
                                            </div>
                                            {/* descrição do filme/Serie */}
                                        <Card.Description className="card--overview">
                                            {overviewMovie}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra className="card--vote">
                                        {/* Avalição do filme/Serie */}
                                        Avaliação: {voteMovie}
                                 </Card.Content>
                                    {/* Botão de Fechar os detalhes do filme/serie */}
                            <button onClick={()=> {
                                    setShowMe(false)
                                }} className="card--button">
                                    Fechar
                            </button>
                        </Card>
                                </div>
                              :null
                             }     
               </div>
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