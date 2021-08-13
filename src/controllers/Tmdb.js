const API_KEY = '45bf6592c14a965b33549f4cc7e6c664';
const API_BASE = 'https://api.themoviedb.org/3';



/*
    Filmes mais populares
    Ultimos filmes lançados
    Filmes mais bem ranqueados
    Series Populares 
    Series com boas avaliações
    Episodios Lançados Recentementes
*/

const basicFetch = async (endpoint) => {
    return (await fetch(`${API_BASE}${endpoint}`)).json();
}


  const getHome =  async () => {
        return [
            {
                slug: 'filmesPopulares',
                title: 'Filmes Populares',
                items: await basicFetch(`/movie/popular?api_key=${API_KEY}&language=pt-BR`)
            },
            {
                slug: 'filmesLançamentos',
                title: 'Filmes Adicionados Recentemente',
                items: await basicFetch(`/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`)
            },
            {
                slug: 'filmesAlavalicao',
                title: 'Filmes com Boas Avalições',
                items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=1`) 
            },
            {
                slug: 'seriesPopulares',
                title: 'Series Populares',
                items:  await basicFetch(`/tv/popular?api_key=${API_KEY}&language=pt-BR&br&page=1`)  
            },
            {
                slug: 'seriesAvaliacoes',
                title: 'Series com Boas Avalições',
                items:  await basicFetch(`/tv/top_rated?api_key=${API_KEY}&language=pt-BR&br&page=1`)  
            },
            {
                slug: 'seriesLançamentos',
                title: 'Episodios Lançados Recentementes',
                items:  await basicFetch(`/tv/on_the_air?api_key=${API_KEY}&language=pt-BR&brpage=1`)  
            }

        ]
    }


export default getHome;