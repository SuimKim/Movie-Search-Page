import { fetchDatas, fetchId } from "../api/api.js";
// -------------------------------------------------------------------------
// 메인 & 검색했을 때 데이터 담긴 카드 리스트 생성
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
// 북마크함에 데이터 담긴 카드 리스트 생성
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
// -------------------------------------------------------------------------
// 모달에 넣을 상세 데이터 생성
async function displayDetails(data) {
  let listFrame = "";
  let genresArr = [];

  data.genres.forEach((e) => genresArr.push(e.name)); // 장르는 n개로 되어있어서 배열로 담아서 뿌려줌

  listFrame = `<div class="modal-main">
                    <p class="m-info">영화 상세보기</p>
                    <h1>${data.title}</h1>
                    <img src="/assets/img/cross.png" alt="" id="btn-close-modal">
                    <div class="modal-contents">
                        <div class="modal-img-box">
                            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="">
                        </div>
                        <div class="modal-contents-box">
                            <p class="m-data">${data.release_date} | ${genresArr} | ${data.runtime}m</p>
                            <hr>
                            <p class="overview">${data.overview}</p>
                            <img src="/assets/img/like_.png" class="btn-add-bookmark" id="${data.id}">
                            <img src="/assets/img/bmon.png" class="btn-remove-bookmark" id="${data.id}">

                        </div>
                    </div> 
                </div>`;

  modalContents.innerHTML += listFrame;

  changeBookMarkBtn(data.id);
}
// -------------------------------------------------------------------------
// 데이터 가져와서 메인화면에 카드 리스트 뿌리기
fetchDatas(mainUrl);
// -------------------------------------------------------------------------
// 모달 오픈
function openModal(id) {
  modalContents.innerHTML = "";
  const detailUrl = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;

  modal.style.display = "flex";

  fetchId(detailUrl);
}
// -------------------------------------------------------------------------
// 북마크 추가/삭제 버튼 설정
function changeBookMarkBtn(id) {
  const bookMarkAdd = document.querySelector(".btn-add-bookmark");
  const bookMarkRemove = document.querySelector(".btn-remove-bookmark");

  let chanegeBtn = bookMarkArr.filter((a) => a == id); // 해당 영화 id가 로컬스토리지에 있는지 확인, 없다면 changeBtn은 빈 배열(length가 0)

  chanegeBtn.length !== 0 ? (bookMarkRemove.style.display = "block") : (bookMarkAdd.style.display = "block");
}
// -------------------------------------------------------------------------
// 북마크 로딩 후 출력
async function displayList() {
  const movieCard = document.querySelectorAll(".movie-card");
  movieCard.length === bookMarkArr.length && (cardsList.style.display = "grid");
}
// -------------------------------------------------------------------------
export { displayPosts, displayBookMark, displayDetails, displayList, openModal };
