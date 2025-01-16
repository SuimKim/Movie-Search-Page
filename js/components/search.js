import { fetchDatas } from "../api/api.js";
// -------------------------------------------------------------------------
// 검색 버튼 클릭해서 검색하기
export function searchBtn() {
  const searchKeyWord = searchInput.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&language=ko-kr`;

  searchKeyWord === ""
    ? alert("검색어를 입력하세요!")
    : (cardsList.innerHTML = ""),
    fetchDatas(searchUrl);
}
// -------------------------------------------------------------------------
// 엔터 해서 검색하기
searchInput.addEventListener("keydown", function (e) {
  if (e.isComposing || e.keyCode === 229) return;

  if (e.key === "Enter") {
    cardsList.innerHTML = "";

    const searchKeyWord = searchInput.value;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&language=ko-kr`;

    fetchDatas(searchUrl);
  }
});
