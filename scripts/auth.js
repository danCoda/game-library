// Signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the signup form from going away (default action).

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // Sign up user
    auth.createUserWithEmailAndPassword(email, password)
        .then(credential => {
            // Close modal
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();

            // Clear out form fields.
            signupForm.reset();
        })
        .catch(e => {
            console.error(e.message);
        });
});


// Create new guide
const createForm = document.getElementById("create-form");
createForm.addEventListener('submit', e => {
    e.preventDefault();

    db.collection('guides').add({
            title: createForm['title'].value,
            content: createForm['content'].value
        })
        .then(() => {
            // Close modal
            const modal = document.querySelector('#modal-create');
            M.Modal.getInstance(modal).close();
            createForm.reset();
        })
})

// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
        .then(() => {
            console.log('User signed out!');
        });
})

// Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent page from reloading.

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            console.log('Logged in! ', cred.user);
            // Close modal
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();

            // Clear out form fields.
            loginForm.reset();
        });
})

// Listen for auth status changes.
auth.onAuthStateChanged(user => {
    console.log("User changes", user);

    if (user) {
        console.log("User has logged in : ", user);
        // Get data
        //db.collection('guides').get().then(snapshot => {
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        }).catch(err => {
            console.log(err.message);
        });
    } else {
        console.log("User has logged out.");
        setupGuides([]);
        setupUI();
    }
})