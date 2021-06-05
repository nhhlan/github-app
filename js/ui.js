/* DOM */
const modalBtn = document.querySelector('#modal');
const modalsvg = document.querySelector('.modal');
const modal = document.querySelector('.header__modal');
const darkModeToggle = document.querySelector('[data-dark-mode]');


/* MODAL */
// Only run when HTML contains modal
if(document.contains(modalBtn)){
    // Show modal when click on filter icon
    modalBtn.addEventListener('click', (e) => {
        if(e.target.closest('#modal') ){
            modal.classList.add('header__modal-active');
        }
    });
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if((!e.target.closest('.header__modal-content')) && (e.target.id !== 'modal')){
            modal.classList.remove('header__modal-active');
        }
    });
}


/* LOCAL STORAGE  */
// Get the value from the local storage
let darkMode = localStorage.getItem('darkmode');
// Check dark mode on page reload
if(darkMode === 'on') {
    enableDarkmode();
}


/* DARK MODE */
//Enable dark mode function
function enableDarkmode() {
    document.body.classList.toggle('dark');
    if(document.contains(modalBtn)){
        modalsvg.classList.toggle('active');
    }
};

darkModeToggle.addEventListener('click', (e) => {
    // Styling toggle
    e.currentTarget.classList.toggle('active');

    // Enable dark mode = Change color theme
    darkMode = localStorage.getItem('darkmode');
    if(darkMode === 'on') {
        enableDarkmode();
        darkMode = localStorage.setItem('darkmode', null);
    } else {
        enableDarkmode();
        darkMode = localStorage.setItem('darkmode', 'on');
    }
});



