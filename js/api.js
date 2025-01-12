const mainUrl = "https://api.themoviedb.org/3/movie/popular?language=ko-kr";

const cardsList = document.querySelector(".cards-list");
const modalContents = document.querySelector(".modal-body");
const modal = document.querySelector('.modal');
const searchInput = document.getElementById("search-bar");
const btnSearch = document.getElementById("btn-search");
const btnReload = document.getElementById("btn-home");
const btnOpenBookMark = document.getElementById("btn-bookmark");

const myBookMarkId = localStorage.getItem('id');
// -------------------------------------------------------------------------
// fetch 함수
function fetchDatas(url) {
    fetch(url, options).then(function (res) {
        return res.json();
    }).then(function (data) {
        displayPosts(data);
    });
}
// -------------------------------------------------------------------------
// fetch 함수
function fetchDetails(url) {
    fetch(url, options).then(function (res) {
        return res.json();
    }).then(function (data) {
        displayDetails(data);
    }).then(function () {
        closeModal();
        addBookMark();
    });
}
// -------------------------------------------------------------------------
// 데이터 넣는 함수
function displayPosts(data) {
    let listFrame = "";
    let movies = data["results"];

    movies.forEach((a) => {
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
                                ⭐️ ${rating}<span class="side">|</span>${date} 개봉                                </p>
                        </div>
                        <div class="id-box" id="${id}"></div>      
                    </div>`;
        cardsList.innerHTML += listFrame;
    });
}
// -------------------------------------------------------------------------
// 데이터 넣는 함수
function displayDetails(data) {
    let listFrame = "";


    listFrame = `<div class="modal-main">
                    <div class="modal-img-box">
                        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="">
                    </div>
                    <div class="modal-contents-box">
                        <h1>${data.title}</h1>
                        <p>${data.overview}</p>
                    </div>
                </div>
                <div class="modal-footer-box">
                    <button class="btn-add-bookmark" id="${data.id}">북마크 추가</button>
                    <button id="btn-close-modal">닫기</button>
                </div>`;
    modalContents.innerHTML += listFrame;
}
// -------------------------------------------------------------------------
// fetch 함수실행
fetchDatas(mainUrl);
// -------------------------------------------------------------------------
// 새로고침
btnReload.addEventListener("click", function () {
    location.reload();
});
// -------------------------------------------------------------------------
// saerch 이벤트리스너 클릭
btnSearch.addEventListener("click", function () {
    cardsList.innerHTML = "";

    const searchKeyWord = searchInput.value;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&language=ko-kr`;

    fetchDatas(searchUrl);
});

// -------------------------------------------------------------------------
// 상세페이지 받아오기
cardsList.addEventListener("click", function (e) {
    const detailUrl = `https://api.themoviedb.org/3/movie/${e.target.id}?language=ko-KR`;

    if (e.target.className === "id-box") {
        modal.style.display = "flex";
        fetchDetails(detailUrl);
    }
})
// -------------------------------------------------------------------------
// 상세페이지 닫기
function closeModal() {
    const close = document.getElementById("btn-close-modal");

    close.addEventListener("click", function () {
        modal.style.display = "none";
        modalContents.innerHTML = ""
    });
}
// -------------------------------------------------------------------------
// 북마크 추가
function addBookMark() {
    const bookMark = document.querySelector(".btn-add-bookmark");
    let arr = [];

    bookMark.addEventListener("click", function (e) {
        if (localStorage.getItem('id') != null) {
            arr = JSON.parse(localStorage.id);
            arr.push(e.target.id);
            localStorage.setItem('id', JSON.stringify(arr));
        } else {
            localStorage.setItem("id", JSON.stringify([e.target.id]));
            arr = JSON.parse(localStorage.id);
        }
    })
}
// -------------------------------------------------------------------------
// 북마크 보기
btnOpenBookMark.addEventListener("click", function () {
    let arr = [];
    arr = JSON.parse(localStorage.id);

    const set = new Set(arr);
    const uniqueArr = [...set];

    cardsList.innerHTML = "";

    for (let i = 0; i < uniqueArr.length; i++) {
        const searchUrl = `https://api.themoviedb.org/3/movie/${uniqueArr[i]}?language=ko-KR`;

        fetch(searchUrl, options).then(function (res) {
            return res.json();
        }).then(function (data) {
            let listFrame = "";


            listFrame = `<div class="movie-card">
                        <div class="list-img-box">
                            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="">
                        </div>
                        <div class="list-p-box">
                            <p class="list-title">${data.title}</p>
                            <p class="list-contents">
                                ⭐️ ${data.rating}<span class="side">|</span>${data.date} 개봉                                </p>
                        </div>
                        <div class="id-box" id="${data.id}"></div>      
                    </div>`;
                    cardsList.innerHTML += listFrame;
        });

    }


});

