// -------------------------------------------------------------------------
// 데이터 가져와서 메인화면에 카드 리스트 뿌리기
fetchDatas(mainUrl);
// -------------------------------------------------------------------------
// 검색 버튼 클릭해서 검색하기
function searchBtn () {
    const searchKeyWord = searchInput.value;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&language=ko-kr`;
    
    searchKeyWord === "" ? alert("검색어를 입력하세요!") : cardsList.innerHTML = "", fetchDatas(searchUrl);
}

searchInput.addEventListener("keydown", function (e) {
    if (e.isComposing || e.keyCode === 229) return; 

    if (e.key === "Enter") {
        cardsList.innerHTML = "";

        const searchKeyWord = searchInput.value;
        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&language=ko-kr`;

        fetchDatas(searchUrl);
    }
    // console.log(e.keyCode)

});

