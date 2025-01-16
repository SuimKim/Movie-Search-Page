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
// 모달 오픈
function openModal(id) {
    modalContents.innerHTML = "";
    const detailUrl = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;

    modal.style.display = "flex";

    fetchId(detailUrl);
}
