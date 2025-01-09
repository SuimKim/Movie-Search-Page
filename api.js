const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWQ1MzIwYzQyNzYzMTYzZDVkZTllNDg4NGY0NTBmOSIsIm5iZiI6MTczNjMxNDEyNy41NTMsInN1YiI6IjY3N2UwZDBmNzczMjIwOWUxN2JiMDNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yHpLx6CfpuhSxKO20yLpV_jpiI8aEQtrbVZnlftFRdI'
    }
};

const cardsList = document.querySelector(".cardslist");

let i = 1;
while (i < 5){
    const url = `https://api.themoviedb.org/3/movie/popular?language=ko-kr&page=${i}`;
    
    fetch(url, options).then((response) => response.json()).then((data) => {
        let rows = data["results"];

        rows.forEach((a) => {
            let img = a["poster_path"];
            let title = a["title"];
            let intro = a["overview"];
            let date = a["release_date"];
            let rating = a["vote_average"];
            let adult = a["adult"];

            let temp_html = 
                    `<div class="moviecard">
                        <div class="imgbox">
                            <img src="https://image.tmdb.org/t/p/w500${img}" alt="">
                        </div>
                        <div class="pbox">
                            <p class="mtitle">${title}</p>
                            <p class="mcon">
                                ⭐️ ${rating} <span class="side">|</span> ${date} 개봉 ${adult}
                            </p>
                        </div>
                    </div>`;

            cardsList.innerHTML += temp_html;
            console.log(temp_html)
        })

    })

    i++;
}
