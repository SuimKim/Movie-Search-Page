// -------------------------------------------------------------------------
// 메인 & 검색에 데이터 담긴 카드 리스트 하나씩 추가
async function displayPosts(data) {
    let listFrame = "";

    data.forEach((a) => {
        let img = a["poster_path"];
        let title = a["title"];
        let date = a["release_date"];
        let rating = a["vote_average"];
        let id = a["id"];

        listFrame = `<div class="movie-card">
                        <div class="list-img-box">
                            <img src="https://image.tmdb.org/t/p/w500${img}" alt="">
                        </div>
                        <div class="list-p-box">
                            <p class="list-title">${title}</p>
                            <p class="list-contents">
                                ⭐️ ${rating}<span class="side">|</span>${date} 개봉</p>
                        </div>
                        <div class="id-box" id="${id}"></div>      
                    </div>`;
        cardsList.innerHTML += listFrame;
    }); 
}
// -------------------------------------------------------------------------
// 북마크함에 데이터 담긴 카드 리스트 하나씩 추가
async function displayBookMark(data) {
    let listFrame = `<div class="movie-card">
                        <div class="list-img-box">
                            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="">
                        </div>
                        <div class="list-p-box">
                            <p class="list-title">${data.title}</p>
                            <p class="list-contents">
                                ⭐️ ${data.vote_average}<span class="side">|</span>${data.release_date} 개봉</p>
                        </div>
                        <div class="id-box" id="${data.id}"></div>      
                    </div>`;
    cardsList.innerHTML += listFrame;
}