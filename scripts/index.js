// setup materialize components
document.addEventListener('DOMContentLoaded', function () { // Wait for DOM content's all loaded.

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals); // Materialize library.

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});


// setup guides
const guideList = document.querySelector('.guides');
const setupGuides = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white"><span>${guide.content}</span></div>
        </li>
        `;
            html += li;
        });

        guideList.innerHTML = html;
    } else {
        guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
    }
}

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}