const form = document.getElementById("form");

form.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById("sitename").value;
  var siteUrl = document.getElementById("siteUrl").value;
  if (!validateForm(siteName, siteUrl)) {
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteUrl,
  };
  // var bookmarks = [];
  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */
  // Test if bookmarks is null
  if (localStorage.getItem("bookmarks") === null) {
    // Init array
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  fetchBookmark();
}

function deleteBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  let bmResults = document.getElementById("bm-results");
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }

  // bmResults.innerHTML += content;
  // console.log(content);

  fetchBookmark();
}

function fetchBookmark() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  let bmResults = document.getElementById("bm-results");

  bmResults.innerHTML = "";
  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;
    bmResults.innerHTML += `
    <div class="card card-body bg-light mb-4">
        <h3>${name} <a href="${url}" class="btn btn-default" target="_blank">Visit</a> <a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">Delete</a></h3>
    </div>
    `;
    // bmResults.innerHTML += content;
    // console.log(content);
  }
}

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}
