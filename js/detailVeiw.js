// -------------------------------------------------------------------------
// 모달에 상세 정보 넣기 
async function displayDetails(data) {
    let listFrame = "";
    let genresArr = [];

    data.genres.forEach(e => genresArr.push(e.name));

    listFrame = `<div class="modal-main">
                    <p class="m-info">영화 상세보기</p>
                    <h1>${data.title}</h1>
                    <img src="/img/cross.png" alt="" id="btn-close-modal">
                    <div class="modal-contents">
                        <div class="modal-img-box">
                            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="">
                        </div>
                        <div class="modal-contents-box">
                            <p class="m-data">${data.release_date} | ${genresArr} | ${data.runtime}m</p>
                            <hr>
                            <p class="overview">${data.overview}</p>
                            <img src="/img/like_.png" class="btn-add-bookmark" id="${data.id}">
                            <img src="/img/bmon.png" class="btn-remove-bookmark" id="${data.id}">

                        </div>
                    </div> 
                </div>`;

    modalContents.innerHTML += listFrame;

    changeBookMarkBtn(data.id);
}
// -------------------------------------------------------------------------
// 카드 클릭하면 모달 오픈
cardsList.addEventListener("click", function (e) {
    modalContents.innerHTML = "";
    const detailUrl = `https://api.themoviedb.org/3/movie/${e.target.id}?language=ko-KR`;
    
    (e.target.className === "id-box") && (modal.style.display = "flex"), fetchId(detailUrl);
})
// -------------------------------------------------------------------------
// 모달 닫기 버튼으로 모달 닫기
async function closeModal() {
    const close = document.getElementById("btn-close-modal");

    close.addEventListener("click", () => modal.style.display = "none");
}
