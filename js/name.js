const cardsList = document.querySelector(".card-list-box");
const modalContents = document.querySelector(".modal-body");
const modal = document.querySelector('.modal');
const searchInput = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const btnReload = document.getElementById("btn-home");
const btnOpenBookMark = document.getElementById("btn-bookmark");

const myBookMarkId = localStorage.getItem('id');

const mainUrl = `https://api.themoviedb.org/3/movie/popular?language=ko-kr`
// ----------------------------------------------------------------------------
let localStorageId = localStorage.getItem("id");
let bookMarkArr = []  // 로컬스토리지에 id 값 가져와서 넣을 배열

// 그냥 데이터 넣으면 오류남... 로컬스토리지에 값 있을 때만 데이터 넣기
localStorage.getItem('id')!== null && (bookMarkArr = JSON.parse(localStorage.id));

