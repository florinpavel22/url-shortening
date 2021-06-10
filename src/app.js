const form = document.querySelector(".url-shortening form");
const inputField = document.querySelector(".url-shortening .input");
const shortenBtn = document.querySelector(".shorten");
const errorMsg = document.querySelector(".error");
const urlResults = document.querySelector(".results");

const mobileMenu = document.querySelector(".mobile-menu");
const hamburgerIcon = document.querySelector(".hamburger-menu");

// Form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputField.value === "") {
    errorMsg.classList.add("show");
    inputField.classList.add("warning");
  } else {
    shortenBtn.innerHTML = `<i class="fa fa-circle-o-notch fa-spin"></i> Loading`;
    const url = `https://api.shrtco.de/v2/shorten?url=${inputField.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => createNewResult(data));
    form.reset();
  }
});

// Remove the input warning on focus
inputField.addEventListener("focus", (e) => {
  if (inputField.classList.contains("warning")) {
    errorMsg.classList.remove("show");
    inputField.classList.remove("warning");
  }
});

// CREATE NEW URL RESULT FUNCTION
const createNewResult = (data) => {
  // Create result container
  const result = document.createElement("div");
  result.classList.add("result");

  // ADD CONTENT
  // The main URL
  const mainUrl = document.createElement("a");
  mainUrl.setAttribute("href", `${data.result.original_link}`);
  mainUrl.classList.add("main-url");
  mainUrl.textContent = `${data.result.original_link}`;

  // The shortened URL
  const shortUrlContainer = document.createElement("div");
  shortUrlContainer.classList.add("short-url");

  // Inject content in short URL container
  const shortUrl = document.createElement("a");
  shortUrl.setAttribute("href", `${data.result.full_short_link}`);
  shortUrl.textContent = `${data.result.full_short_link}`;

  // The button
  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("copy-btn");
  button.textContent = "Copy";

  // Append short URL and button to their parent container
  shortUrlContainer.append(shortUrl);
  shortUrlContainer.append(button);

  // Append main URL and short URL container to result container
  result.append(mainUrl);
  result.append(shortUrlContainer);

  // Append result container to main results container
  urlResults.append(result);

  shortenBtn.innerHTML = "Shorten it!";
};

// COPY THE SHORTENED LINK
urlResults.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy-btn")) {
    const btnParent = e.target.parentElement;

    // Create textarea
    const textarea = document.createElement("textarea");
    textarea.value = e.target.previousElementSibling.textContent;

    // Append it to its parent
    btnParent.append(textarea);

    // Copy the text
    textarea.select();
    document.execCommand("copy");

    // Remove text area
    textarea.remove();

    // Change button text
    e.target.textContent = "Copied";
    e.target.classList.add("copied");

    // Return to initial button text
    setTimeout(function () {
      e.target.textContent = "Copy";
      e.target.classList.remove("copied");
    }, 1500);
  }
});

// MOBILE MENU TOGGLER
hamburgerIcon.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
