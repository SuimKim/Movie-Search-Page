import { fetchBookMark } from "../api/api.js";
// -------------------------------------------------------------------------
// 북마크함 오픈
async function openBookMark() {
  if (localStorageId === null || bookMarkArr.length === 0) {
    // 로컬스토리지 값 유효성 검사
    alert("북마크함이 비어있습니다.");
    // location.reload();
    return;
  }
  cardsList.style.display = "none";
  cardsList.innerHTML = "";

  for (let i = 0; i < bookMarkArr.length; i++) {
    // 로컬 스토리지에 저장된 id 불러와서 리스트 뿌리기
    const url = `https://api.themoviedb.org/3/movie/${bookMarkArr[i]}?language=ko-KR`;
    await fetchBookMark(url); // 저장 순서대로 불러올 수 있도록
  }
}
// -------------------------------------------------------------------------
// 북마크 추가
async function addBookMark(movieId) {
  const bookMarkAdd = document.querySelector(".btn-add-bookmark");
  const bookMarkRemove = document.querySelector(".btn-remove-bookmark");

  if (localStorageId === null) {
    localStorage.setItem("id", JSON.stringify([movieId]));
    // alert("북마크 추가 완료!");
  } else {
    bookMarkArr.push(movieId);
    localStorage.setItem("id", JSON.stringify(bookMarkArr));
    // alert("북마크 추가 완료!");
  }
  bookMarkAdd.style.display = "none";
  bookMarkRemove.style.display = "block";
}
// -------------------------------------------------------------------------
// 북마크 삭제
async function removeBookMark(movieId) {
  const bookMarkAdd = document.querySelector(".btn-add-bookmark");
  const bookMarkRemove = document.querySelector(".btn-remove-bookmark");

  let deleteArr = bookMarkArr.filter((id) => id != movieId);

  bookMarkArr = deleteArr;
  localStorage.setItem("id", JSON.stringify(bookMarkArr));

  // alert("북마크 삭제 완료!");

  bookMarkRemove.style.display = "none";
  bookMarkAdd.style.display = "block";
}
// -------------------------------------------------------------------------
export { openBookMark, addBookMark, removeBookMark };
