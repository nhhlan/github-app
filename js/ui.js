const modalBtn = document.querySelector('#modal');
const modal = document.querySelector('.header__modal');

// Show modal when click on filter icon
modalBtn.addEventListener('click', () => {
    modal.classList.add('header__modal-active');
});
// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if((!e.target.closest('.header__modal-content')) && (e.target.id !== 'modal')){
        modal.classList.remove('header__modal-active');
    }
});