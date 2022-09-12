let myLibrary = [];
const modal = document.getElementsByClassName("input-modal")[0];

function Book({ author, title, pages, read }) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function createCard(bookObj) {
  let { author, title, pages, read } = bookObj;
  if (read) {
    read = "read";
  } else {
    read = "not read";
  }
  const newCard = document.createElement("div");
  newCard.classList.add("book-card");
  const innerHTML = `<div class="b-title">
  <span>${title}</span>
</div>
<div class="b-card-bottom">
  <div class="b-author"><span>by </span><span>${author}</span></div>
  <div class="b-page"><span>${pages}</span><span> pages</span></div>
  <div class="b-btn-div">
    <button class="b-btn"><span>${read}</span></button>
    <button class="b-btn"><span>remove</span></button>
  </div>
</div>`;
  newCard.innerHTML = innerHTML;
  return newCard;
}

let test = {
  author: "Scott Lynch",
  title: "Red Seas Under Red Skies",
  pages: 578,
  read: false,
};

const testBook = createCard(new Book(test));
const testBook2 = createCard(new Book(test));
const testBook3 = createCard(new Book(test));
const testBook4 = createCard(new Book(test));
const testBook5 = createCard(new Book(test));
console.log(testBook);
const books = document.getElementById("books");
books.insertAdjacentElement("beforeend", testBook);
books.insertAdjacentElement("beforeend", testBook2);
books.insertAdjacentElement("beforeend", testBook3);
books.insertAdjacentElement("beforeend", testBook4);
books.insertAdjacentElement("beforeend", testBook5);

function handleSubmit(e) {
  e.preventDefault();
  const inputValues = document.querySelectorAll("input");

  let valid = true;
  for (let ele of inputValues) {
    if (ele.type === "text" || ele.type === "number") {
      if (ele.value === "") {
        valid = false;
      }
    }
  }
  if (valid) {
    let values = [];
    for (let ele of inputValues) {
      if (ele.type === "checkbox") {
        values.push(ele.checked);
        ele.checked = false;
      } else {
        values.push(ele.value);
        ele.value = "";
      }
    }
    [title, author, pages, read] = values;
    myLibrary.push(new Book({ title, author, pages, read }));
    console.log("myLibrary", myLibrary);
    modal.classList.toggle("on-screen");
  }
}

const submitBtn = document.getElementById("submit-new");
submitBtn.addEventListener("click", (e) => {
  handleSubmit(e);
});

const addBtn = document.getElementById("add-book");

addBtn.addEventListener("click", () => {
  modal.classList.toggle("on-screen");
  addBtn.classList.toggle("rotate");
});
