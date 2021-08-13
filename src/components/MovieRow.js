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

function decimalAdjust(type, value, exp) {
    // Se exp é indefinido ou zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Se o valor não é um número ou o exp não é inteiro...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Transformando para string
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Transformando de volta
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

function MovieRow( {title, items}) {
    
    const [showMe, setShowMe] = useState(false);
    const [scrolx, setScrolx] = useState(0);
    if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
    
    const handleLeftArrow = () => {
        let x = scrolx + Math.round(window.innerWidth / 5);
            if(x>0){
                x =0;
            }
            console.log(x);
            setScrolx(x);
    }

    const handleRightArrow = () => {
        let x = scrolx - Math.round(window.innerWidth / 5);
        let fullSize = items.results.length * 150;
        console.log(fullSize)
        console.log(`1x=${x}`)
        if(x < window.innerWidth - fullSize){
            if(window.innerWidth >= 1500){
                if(x - 150 < -fullSize){
                    x = (Math.round(window.innerWidth) / 5 - fullSize) + 20;
              }
            }

            if(window.innerWidth < 1500) {
                x = (window.innerWidth - fullSize) - 60;
            }
        }
        console.log(window.innerWidth)
        console.log(`x=${x}`)
        setScrolx(x);
    }
    return (
        <div className="movieRow">
           <h2>
               {title}
           </h2>
           
           <div>
               {
                showMe?
                    <div className="card" style={{
                        width: window.innerWidth * 0.7,
                         }}>
                        <Card className="card--total">
                            <Image src={`https://image.tmdb.org/t/p/w300${imageMovie}`} wrapped ui={false} alt={imageMovie} className="card--img" />
                                <Card.Content>
                                    <Card.Header className="card--title">{titleMovie}{titleSerie}</Card.Header>
                                        <Card.Meta>
                                          <span className="card--date">Data de lançamento:  {dateMovie} {dateSeries}</span>
                                        </Card.Meta>
                                            <div className="card--title">
                                                Descrição
                                            </div>
                                        <Card.Description className="card--overview">
                                        {overviewMovie}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra className="card--vote">
                                        Avaliação: {voteMovie}
                                 </Card.Content>
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
           <div className="movieRow--listtotal" style={{
                marginLeft: scrolx,
                width: items.results.length * 500,

           }
           }>
               <div className="movieRow--left" onClick={handleLeftArrow}>
            
                    <NavigateBeforeIcon style={{fontSize: '50px'}} />
                                 
               </div>
               <div className="movieRow--right" onClick={handleRightArrow}> 
                    <NavigateNextIcon style={{fontSize: '50px'}} />

               </div>
               
               <div className="movieRow--list">
               
                   
                  {items.results.length > 0 && items.results.map((item, key)=>(
                    <div key={key} className="movieRow--item">
                        
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