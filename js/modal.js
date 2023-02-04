const dreamTeamList = document.querySelector(".dream-team__list");
let dreamTeam = localStorage.getItem("dreamTeam")
  ? JSON.parse(localStorage.getItem("dreamTeam"))
  : [];

function modalHandlerCreate(targetId) {
  let findChar = dreamTeam.find((char) => char === targetId);
  const modalOK = document.querySelector("[data-handler=modalHandlerOk]");
  findChar
    ? (modalOK.innerHTML = `<i class="fa-solid fa-trash modal-icon"></i>`)
    : (modalOK.innerHTML = `<i class="fa-solid fa-plus modal-icon"></i>`);

  modalOK.addEventListener("click", addToDT);
}

function addToDT() {
  const currentModal = document.querySelector("[data-currentchar]");
  const modalOK = document.querySelector("[data-handler=modalHandlerOk]");
  const targetId = currentModal.dataset.currentchar;
  const currentFindChar = dreamTeam.find((char) => {
    return char === targetId;
  });
  if (currentFindChar) {
    dreamTeam = dreamTeam.filter((id) => {
      return id !== targetId;
    });
  } else {
    dreamTeam.push(targetId);
  }
  localStorage.setItem("dreamTeam", JSON.stringify(dreamTeam));
  renderDreamTeam();
  modalOK.innerHTML = currentFindChar
    ? `<i class="fa-solid fa-plus modal-icon"></i>`
    : `<i class="fa-solid fa-trash modal-icon"></i>`;
}

const dreamTeamOpenBtn = document.querySelector(".header__dream-team");
const dreamTeamCloseBtn = document.querySelector(".dream-team__close");
const dreamTeamDrawer = document.querySelector("#dreamTeamDrawer");

dreamTeamCloseBtn.addEventListener("click", () =>
  dreamTeamDrawer.classList.remove("show")
);
dreamTeamOpenBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dreamTeamDrawer.classList.add("show");
});
