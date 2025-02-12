import { searchBtn } from "../event/search.js";
import { openModal } from "../ui/ui.js";
import { addBookMark, removeBookMark, openBookMark } from "../components/bookMark.js";

body.addEventListener("click", async function (e) {
  const targetClass = e.target.className;
  const targetId = e.target.id;

  // console.log(targetClass)

  targetId === "btn-search" && searchBtn();
  targetClass === "id-box" && openModal(targetId);
  targetId === "btn-close-modal" && (modal.style.display = "none");
  targetClass === "modal" && (modal.style.display = "none");
  targetClass === "btn-add-bookmark" && addBookMark(targetId);
  targetClass === "btn-remove-bookmark" && removeBookMark(targetId);
  targetId === "btn-bookmark" && openBookMark();
});
