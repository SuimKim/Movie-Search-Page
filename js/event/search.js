import { fetchDatas } from "../api/api.js";
// -------------------------------------------------------------------------
// 검색 버튼 클릭해서 검색하기
export function searchBtn() {
  const searchKeyWord = searchInput.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&language=ko-kr`;

  searchKeyWord === "" ? alert("검색어를 입력하세요!") : (cardsList.innerHTML = ""), fetchDatas(searchUrl);
}
// -------------------------------------------------------------------------
// 엔터 해서 검색하기
searchInput.addEventListener("keydown", function (e) {
  const searchKeyWord = searchInput.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&language=ko-kr`;

  if (e.key === "Enter" && searchKeyWord === "") {
    alert("검색어를 입력해주세요!");
  } else if (e.isComposing || e.keyCode === 229){
    return;
  } else if (e.key === "Enter") {
    cardsList.innerHTML = "";
    fetchDatas(searchUrl);
  }
});
// -------------------------------------------------------------------------
// 실시간 검색하기
let timer;
searchInput.addEventListener('input', function (e) {
  if (!timer) {
    timer =  setTimeout( () =>  {
      timer = null;
      cardsList.innerHTML = "";
      e.target.value === "" && fetchDatas(mainUrl); // 값 다 지우면 초기 화면 띄우기
      const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${e.target.value}&language=ko-kr`;
      fetchDatas(searchUrl);
    }, 500);
  } 
});