API_KEY ="e01cd92d257d421e9677e8ae829977c4";
url ='https://newsapi.org/v2/everything?q=';

window.addEventListener('load',()=>News("India"));
async function News(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json()
    bindData(data.articles)
}
function bindData(articles){
    const cardContainer = document.querySelector('.cards-container');
    const newsCradTemplate = document.getElementById('template-news-card');
    cardContainer.innerHTML='';

    articles.forEach((article) => {
        
        if(!article.urlToImage) return ;
        const cardClone = newsCradTemplate.content.cloneNode(true);
        fillDateCard(cardClone,article);
        cardContainer.appendChild(cardClone)

        
       
    });
}
function fillDateCard(cardClone,article){
    const newsImg = cardClone.querySelector('.news-img')
    const newsTitle = cardClone.querySelector('.news-title')
    const newsSource = cardClone.querySelector('.news-source')
    const newsDesc = cardClone.querySelector('.news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML= article.title;
newsDesc.innerHTML=article.description;

const date = new Date(article.publishedAt).toLocaleString('en-US',{
    timeZone:'Asia/Jakarta'
});
newsSource.innerHTML=`${article.source.name}.${date}`

}
function onNavItemClick(id){
    News(id)
}
const seactbtn = document.querySelector('.search-button');
const searchText=document.querySelector('#search')

seactbtn.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
   News(query);
})