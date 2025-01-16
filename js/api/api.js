import { options } from "../../key/apiKey.js";
import {
  displayBookMark,
  displayDetails,
  displayList,
  displayPosts,
} from "../ui/ui.js";
// -------------------------------------------------------------------------
// fetch 함수 - 메인화면(인기순 20개)
async function fetchDatas(url) {
  try {
    let res = await fetch(url, options);
    let data = await res.json();
    await displayPosts(data.results); // 메안에 카드 리스트 뿌리기
  } catch (error) {
    alert("연결 오류가 발생했습니다. 재접속 해주세요.");
    console.log(error);
  }
}
// -------------------------------------------------------------------------
// fetch 함수 - ID로 데이터 받아오기
async function fetchId(url) {
  try {
    let res = await fetch(url, options);
    let data = await res.json();
    await displayDetails(data); // 상세 보기(모달에 데이터 넣기)
  } catch (error) {
    alert("연결 오류가 발생했습니다. 재접속 해주세요.");
  }
}
// -------------------------------------------------------------------------
// fetch 함수 - 북마크 리스트
async function fetchBookMark(url) {
  try {
    let res = await fetch(url, options);
    let data = await res.json();
    await displayBookMark(data); // 북마크함에 카드 리스트 뿌리기
    await displayList();
  } catch (error) {
    alert("연결 오류가 발생했습니다. 재접속 해주세요.");
  }
}

export { fetchDatas, fetchId, fetchBookMark };
