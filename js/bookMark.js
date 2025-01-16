// -------------------------------------------------------------------------
// 북마크함 버튼 클릭해서 오픈
btnOpenBookMark.addEventListener("click", async function () {
    
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
});
// -------------------------------------------------------------------------
// 북마크 추가
async function addBookMark() {
    const bookMarkAdd = document.querySelector(".btn-add-bookmark");
    const bookMarkRemove = document.querySelector(".btn-remove-bookmark");

    bookMarkAdd.addEventListener("click", (e) => {

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
    }) 
}
// -------------------------------------------------------------------------
// 북마크 삭제
async function removeBookMark() {
    const bookMarkRemove = document.querySelector(".btn-remove-bookmark");
    const bookMarkAdd = document.querySelector(".btn-add-bookmark");

    bookMarkRemove.addEventListener("click", function (e) {

        let deleteArr = bookMarkArr.filter((id) => id != e.target.id);

        bookMarkArr = deleteArr;
        localStorage.setItem("id", JSON.stringify(bookMarkArr));

        alert("북마크 삭제 완료!");

        bookMarkRemove.style.display = "none";
        bookMarkAdd.style.display = "block";
    });
}
// -------------------------------------------------------------------------
// 북마크 추가/삭제 버튼 바꾸기
function changeBookMarkBtn (id){
    const bookMarkAdd = document.querySelector(".btn-add-bookmark");
    const bookMarkRemove = document.querySelector(".btn-remove-bookmark");

    let chanegeBtn = bookMarkArr.filter((a) => a == id);

    chanegeBtn.length !== 0 ? bookMarkRemove.style.display = "block" : bookMarkAdd.style.display = "block";
}
// -------------------------------------------------------------------------
// 북마크 로딩 후 출력, 삭제 or 수정 예정
async function displayList (){
    const movieCard = document.querySelectorAll(".movie-card");

    console.log(movieCard.length)

    movieCard.length === bookMarkArr.length && (cardsList.style.display = "grid");
}