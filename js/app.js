const job = new Job;
const ui = new UI;
let currentPage = 1;
let apiLink = job.apiUrl + currentPage; //https://www.themuse.com/api/public/jobs?page=1

/* GET DATA & SHOW UI */
const loadmoreBtn = document.querySelector('#loadmore');
const searchbar = document.querySelector('.header__searchbar');

job.getJobs(apiLink).then(data => {
    if(data.length === 0){
        console.log('No job available.');
    } else {
        ui.jobContainer.style.display = 'grid';
        loadmoreBtn.style.display = 'flex';
        searchbar.style.display = 'flex';
        ui.showJob(data.results);
    }

    // Add clickable cursor to card
    ui.goToDetailPage(loadmoreBtn, searchbar, data);
});



/* LOAD MORE */
if(document.contains(loadmoreBtn)){
    loadmoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(currentPage < job.pageCount){
            currentPage += 1;
            // Change current page
            apiLink = apiLink.substr(0, 45) + currentPage + apiLink.substr(45 + 1);
            job.getJobs(apiLink).then(data => {                
                if(data.length === 0){
                    console.log('No job available.');
                } else {
                    ui.showJob(data.results);
                }

                // Add clickable cursor to card
                ui.goToDetailPage(loadmoreBtn, searchbar, data);
            });
        } else {
            console.log('No job available.');
            loadmoreBtn.disabled = true;
            loadmoreBtn.style.display = 'none';
        }
    });
}



/* SEARCH */
// Remote checkbox value
let remoteHiddenValue = false;
let remoteModalValue = false;
const remoteLink = '&location=Flexible%20%2F%20Remote';
const remoteHidden = document.getElementById('remoteHidden');
const remoteModal = document.getElementById('remoteModal');
remoteHidden.addEventListener('change', (e) => {remoteHiddenValue = !remoteHiddenValue;})
remoteModal.addEventListener('change', (e) => {remoteModalValue = !remoteModalValue;})

// Category input value
const inputTitle = document.querySelector('input.category');
const suggTitle = document.querySelector('.header__autocom-title');
inputTitle.addEventListener('keyup', (e) => {
    ui.searchRequest(e, categorySuggestions, searchbar, suggTitle, inputTitle);
});

// Level input value
const inputLevel = document.querySelector('input.levelHidden');
inputLevel.addEventListener('keyup', (e) => {
    ui.searchRequest(e, levelSuggestions, searchbar, suggTitle, inputLevel);
})

// Modal input value
const modalContainer = document.querySelector('.header__modal');
const inputModal = document.querySelector('input.levelModal');
const suggModal = document.querySelector('.header__autocom-modal');
inputModal.addEventListener('keyup', (e) => {
    ui.searchRequest(e, levelSuggestions, modalContainer, suggModal, inputModal);
})


// Full searchbar - hidden (min-width: 768px)
const searchBtn = document.querySelector('.searchBtn');
searchBtn.addEventListener('click', () => {
    // Set up api link
    job.setUpAPILink(inputTitle, inputLevel, remoteHiddenValue);
    
    // Get data and display
    job.getJobs(apiLink).then(data => {
        if(data.length === 0){
            console.log('No job available.');
        } else {
            ui.clearJob();
            ui.showJob(data.results);
        }

        // Add clickable cursor to card
        ui.goToDetailPage(loadmoreBtn, searchbar, data);
    });
})


// Modal searchbar
const searchBtnModal = document.querySelector('.searchBtnModal');
const searchIcon = document.getElementById('search');
searchBtnModal.addEventListener('click', () => {
    // Set up api link
    job.setUpAPILink(inputTitle, inputModal, remoteModalValue);

    // Get data and display
    job.getJobs(apiLink).then(data => {
        if(data.length === 0){
            console.log('No job available.');
        } else {
            ui.clearJob();
            ui.showJob(data.results);
            modalContainer.classList.remove('header__modal-active');
        }

        // Add clickable cursor to card
        ui.goToDetailPage(loadmoreBtn, searchbar, data);
    });
})

searchIcon.addEventListener('click', () => {
    // Set up api link
    job.setUpAPILink(inputTitle, inputModal, remoteModalValue);

    // Get data and display
    job.getJobs(apiLink).then(data => {
        if(data.length === 0){
            console.log('No job available.');
        } else {
            ui.clearJob();
            ui.showJob(data.results);
        }

        // Add clickable cursor to card
        ui.goToDetailPage(loadmoreBtn, searchbar, data);
    });
})


/* Media Query */
// const mediaQuery = window.matchMedia('(min-width: 768px)')
// if (mediaQuery.matches) {
//   console.log('Media Query Matched!');
// }
