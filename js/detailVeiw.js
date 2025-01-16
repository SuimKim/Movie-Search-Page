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
// cardsList.addEventListener("click", function (e) {
//     modalContents.innerHTML = "";
//     const detailUrl = `https://api.themoviedb.org/3/movie/${e.target.id}?language=ko-KR`;
    
//    if (e.target.className === "id-box") modal.style.display = "flex", fetchId(detailUrl);
// })
// -------------------------------------------------------------------------
// 모달 닫기 버튼으로 모달 닫기
// async function closeModal() {
//     const close = document.getElementById("btn-close-modal");

//     close.addEventListener("click", () => modal.style.display = "none");
// }




main.addEventListener("click", async function (e) {

    console.log(e.target.className);

    if (e.target.className === "id-box"){
        modalContents.innerHTML = "";
        const detailUrl = `https://api.themoviedb.org/3/movie/${e.target.id}?language=ko-KR`;
    
        modal.style.display = "flex";

        fetchId(detailUrl);
    }

    if (e.target.id === "btn-close-modal") {
        modal.style.display = "none";
    }

    if (e.target.className === "btn-add-bookmark"){
        const bookMarkAdd = document.querySelector(".btn-add-bookmark");
        const bookMarkRemove = document.querySelector(".btn-remove-bookmark");

        if (localStorageId === null) {
            localStorage.setItem("id", JSON.stringify([e.target.id]));
            bookMarkArr = JSON.parse(localStorage.id);

            alert("북마크 추가 완료!");

        } else if(bookMarkArr.some((a) => {return a == e.target.id;}) === false){
            bookMarkArr = JSON.parse(localStorage.id);
            bookMarkArr.push(e.target.id);
            localStorage.setItem("id", JSON.stringify(bookMarkArr));

            alert("북마크 추가 완료!");

        } else {
            alert("이미 저장된 영화입니다.");
            return;
        }

        
        bookMarkAdd.style.display = "none";
        bookMarkRemove.style.display = "block";
    }

    if (e.target.className === "btn-remove-bookmark"){
        const bookMarkAdd = document.querySelector(".btn-add-bookmark");
        const bookMarkRemove = document.querySelector(".btn-remove-bookmark");

        let deleteArr = bookMarkArr.filter((id) => id != e.target.id);

        bookMarkArr = deleteArr;
        localStorage.setItem("id", JSON.stringify(bookMarkArr));

        alert("북마크 삭제 완료!");

        bookMarkRemove.style.display = "none";
        bookMarkAdd.style.display = "block";

    }

    if (e.target.id === "btn-bookmark"){
        if(localStorageId === null || bookMarkArr.length === 0){  // 로컬스토리지 값 유효성 검사
            alert("북마크함이 비어있습니다.");
            // location.reload();
            return;
        }
        cardsList.style.display = "none";
        cardsList.innerHTML = "";
    
        for(let i = 0; i < bookMarkArr.length; i++){     // 로컬 스토리지에 저장된 id 불러와서 리스트 뿌리기
            const url = `https://api.themoviedb.org/3/movie/${bookMarkArr[i]}?language=ko-KR`;
            await fetchBookMark(url)
        }
    }

})