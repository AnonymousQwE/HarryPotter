let status = "loading";
const cards = document.querySelector(".cards");
const loaded = document.querySelector(".loader");
const serverChars = loadCharacters();
const modal = createModal();

//Create Modal
function createModal() {
  return $modal({
    footerButtons: [
      {
        class: "btn btn__ok",
        text: `<i class="fa-solid fa-plus"></i>`,
        handler: "modalHandlerOk",
      },
    ],
  });
}

//First Load Characters
async function loadCharacters() {
  console.log("Loading Characters...");
  try {
    const char = await axios.get("https://hp-api.onrender.com/api/characters");
    allChars = char.data;
    console.log("Characters Load Complete");
    return char.data;
  } catch (error) {
    console.log(error.message);
  }
}

//Render Dream Team

async function renderDreamTeam() {
  const allChars = await serverChars;
  dreamTeamList.innerHTML = "";
  dreamTeam.forEach((currChar) => {
    const filterChar = allChars.filter((char) => char.id === currChar);
    const currentChar = filterChar[0];
    HTML = `<li data-iddt=${currentChar?.id} class="dream-team__item ${
      currentChar?.house === "Gryffindor"
        ? "bg-red"
        : currentChar?.house === "Slytherin"
        ? "bg-green"
        : currentChar?.house === "Hufflepuff"
        ? "bg-yellow"
        : "bg-blue"
    }" data-characterid=${currentChar?.id}>
    <i class="fa-solid fa-trash dream-team__icon"></i>
    <div class="dream-team__img">
    <img src=${
      currentChar?.image
        ? currentChar?.image
        : currentChar?.gender === "male"
        ? "img/male.png"
        : "img/female.png"
    } alt="" /></div>
    <p>Имя: <span>${currentChar?.name}</span></p>
    </li>`;
    dreamTeamList.innerHTML += HTML;
  });

  const dreamTeamChars = document.querySelectorAll(".dream-team__item");
  dreamTeamChars.forEach((dt) => createModalForAllChar(dt));

  const deleteIcon = document.querySelectorAll(".dream-team__icon");
  deleteIcon.forEach((i) => {
    i.addEventListener("click", (e) => {
      e.stopPropagation();
      const deleteCharId = e.target.parentNode.dataset.characterid;
      const filteredChar = dreamTeam.filter((id) => {
        return id !== deleteCharId;
      });
      dreamTeam = filteredChar;
      localStorage.setItem("dreamTeam", JSON.stringify(dreamTeam));
      renderDreamTeam();
    });
  });
}

//setChar after Filter

async function setCharacters(dataCount, filter) {
  try {
    const allChars = await serverChars;
    const filteredCharact = allChars.filter((char) =>
      filter === "All" ? true : char.house === filter
    );
    renderCharacters(filteredCharact, dataCount);
  } catch (error) {
    console.log(error);
  }
}

//Render Char

async function renderCharacters(filteredChars, dataCount) {
  loaded.classList.add("opacity");
  cards.innerHTML = "";
  await filteredChars.forEach((char, id) => {
    currChar = `<div class="card ${
      char.house === "Gryffindor"
        ? "bg-red"
        : char.house === "Slytherin"
        ? "bg-green"
        : char.house === "Hufflepuff"
        ? "bg-yellow"
        : "bg-blue"
    }"><div class="card__title">${
      char.name
    }</div><div class="card__image"><div class="card__logo"><img src=${
      char.house === "Gryffindor"
        ? "img/gryff.webp"
        : char.house === "Slytherin"
        ? "img/slyt.webp"
        : char.house === "Hufflepuff"
        ? "img/huff.webp"
        : "img/rave.webp"
    } alt="logo" /></div><img src=${
      char?.image
        ? char.image
        : char.gender === "male"
        ? "img/male.png"
        : "img/female.png"
    } alt="" /></div><button data-id=${
      char.id
    } class="card__btn">Подробнее...</button></div>`;
    dataCount === "all"
      ? (cards.innerHTML += currChar)
      : id < dataCount
      ? (cards.innerHTML += currChar)
      : "";
  });
  loaded.classList.remove("opacity");
  const CharBtns = document.querySelectorAll("[data-id]");
  CharBtns.forEach((btn) => createModalForAllChar(btn));
}

//Modal for All Char

function createModalForAllChar(btn) {
  btn.addEventListener("click", async (e) => {
    const findChar = e.target.closest("[data-id]");
    console.log(findChar);
    let currentCharId = findChar?.dataset.id;
    findChar ? "" : (currentCharId = btn.dataset.iddt);
    const filterChar = allChars.filter((char) => char.id === currentCharId);
    console.log(currentCharId);
    const currentChar = filterChar[0];
    await modal.setTitle(`Карточка Героя ${currentChar?.name}`);
    await modal.setContent(`
    <div class="modal__card" data-currentchar=${currentChar?.id}>
    <img class="modal__image" src=${
      currentChar?.image
        ? currentChar?.image
        : currentChar?.gender === "male"
        ? "img/male.png"
        : "/img/female.png"
    } />
      <div class="modal__text">
      <div class="modal__info"><p>Name: <span class="modal__current-info"> ${
        currentChar?.name
      }</span></p></div>
      <div class="modal__info"><p>Actor: <span class="modal__current-info"> ${
        currentChar?.actor
      }</span></p></div>
      <div class="modal__info"><p>Alive: <span class="modal__current-info"> ${
        currentChar?.alive ? "Yes" : "No"
      }</span></p></div>
      <div class="modal__info"><p>Species: <span class="modal__current-info"> ${
        currentChar?.species
      }</span></p></div>
      <div class="modal__info"><p>Gender: <span class="modal__current-info"> ${
        currentChar?.gender
      }</span></p></div>
      <div class="modal__info"><p>House: <span class="modal__current-info"> ${
        currentChar?.house
      }</span></p></div>
      <div class="modal__info"><p>Date of Birth: <span class="modal__current-info"> ${
        currentChar?.dateOfBirth
      }</span></p></div>
      <div class="modal__info"><p>Wizard: <span class="modal__current-info"> ${
        currentChar?.wizard ? "Yes" : "No"
      }</span></p></div>
      <div class="modal__info"><p>Ancestry: <span class="modal__current-info"> ${
        currentChar?.ancestry
      }</span></p></div>
      <div class="modal__info"><p>Eye Colour: <span class="modal__current-info"> ${
        currentChar?.eyeColour
      }</span></p></div>
      <div class="modal__info"><p>Hair Colour: <span class="modal__current-info"> ${
        currentChar?.hairColour
      }</span></p></div>
      <div class="modal__info"><p>Wand: 
      <div class="modal__info-wand">
      <p>
      Wood:<span class="modal__current-info"> ${currentChar?.wand.wood}</span>
      </p>
      <p>
      Core:<span class="modal__current-info"> ${currentChar?.wand.core}</span>
      </p>
      <p>
      Length:<span class="modal__current-info"> ${
        currentChar?.wand.length
      }</span>
      </p>
      </div>
      </p></div>
      <div class="modal__info"><p>Patronus: <span class="modal__current-info"> ${
        currentChar?.patronus
      }</span></p></div>
      <div class="modal__info"><p>Hogwarts Student: <span class="modal__current-info"> ${
        currentChar?.hogwartsStudent ? "Yes" : "No"
      }</span></p></div>
      <div class="modal__info"><p>Hogwarts Student: <span class="modal__current-info"> ${
        currentChar?.hogwartsStaff ? "Yes" : "No"
      }</span></p></div>
    </div>
    </div>
    `);
    await modalHandlerCreate(currentChar?.id);
    modal.show();
  });
}

//Create Filter Button

const createFilterButton = () => {
  const filterBtn = document.querySelectorAll(".filter__btn");

  filterBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const filter = e.target.parentNode.dataset.home;
      setCharacters(100, filter);
      filterBtn.forEach((btn) => btn.classList.remove("filter__active"));
      e.target.parentNode.classList.add("filter__active");
    });
  });
};

//Create Search
const search = document.querySelector(".header__search");
const searchButton = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchButton.addEventListener("click", () => {
  searchInput.classList.toggle("search__block");
  search.classList.toggle("search__active");
  const cards = document.querySelectorAll(".card");
  if (search.classList.contains("search__active")) {
    console.log("search active");
    searchInput.addEventListener("input", (e) => {
      const searchValue = e.target.value.toLowerCase();
      cards.forEach((card) => {
        const cardTitle = card
          .querySelector(".card__title")
          .innerHTML.toLowerCase();

        if (searchValue) {
          if (cardTitle.indexOf(searchValue)) {
            card.classList.add("opacity-none");
            setTimeout(() => card.classList.add("none"), 1000);
          } else {
            card.classList.remove("none");
            setTimeout(() => card.classList.remove("opacity-none"), 1000);
          }
        } else {
          card.classList.remove("none");
          setTimeout(() => card.classList.remove("opacity-none"), 1100);
        }
      });
    });
  } else {
    cards.forEach((card) => {
      searchInput.value = "";
      card.classList.remove("none");
      setTimeout(() => card.classList.remove("opacity-none"), 1100);
    });
  }
});

setCharacters(100, "All");
createFilterButton();
renderDreamTeam(serverChars);
