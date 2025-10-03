// components.js
function includeHTML(selector, url) {
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      return res.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;
    })
    .catch(err => console.error(err));
}
