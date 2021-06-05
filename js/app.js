const job = new Job;
const ui = new UI;


/* GET DATA & SHOW UI */
const loadmoreBtn = document.querySelector('#loadmore');
const searchbar = document.querySelector('.header__searchbar');

job.getJobs(job.apiUrl).then(data => {
    if(data.length === 0){
        console.log('No job available.');
    } else {
        ui.jobContainer.style.display = 'grid';
        loadmoreBtn.style.display = 'flex';
        searchbar.style.display = 'flex';
        ui.showJob(data.results);
    }

    // Go to detail page
    let jobCards = document.querySelectorAll('.job__card');
    jobCards.forEach((jobCard) => {
        jobCard.addEventListener('click', (e) => {
            // Hide job div and loadmore
            ui.jobContainer.style.display = 'none';
            loadmoreBtn.style.display = 'none';
            searchbar.style.display = 'none';
            // Show detail page
            ui.showDetail(data.results[e.target.closest('.job__card').dataset.index]);
        });
    })
});



/* LOAD MORE */
if(document.contains(loadmoreBtn)){
    loadmoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(job.currentPage < job.pageCount){
            job.currentPage += 1;
            job.getJobs(job.apiUrl).then(data => {
                if(data.length === 0){
                    console.log('No job available.');
                } else {
                    ui.jobContainer.style.display = 'grid';
                    loadmoreBtn.style.display = 'flex';
                    searchbar.style.display = 'flex';
                    ui.showJob(data.results);
                }

                // Go to detail page
                let jobCards = document.querySelectorAll('.job__card');
                jobCards.forEach((jobCard) => {
                    jobCard.addEventListener('click', (e) => {
                        // Hide job div and loadmore
                        ui.jobContainer.style.display = 'none';
                        loadmoreBtn.style.display = 'none';
                        searchbar.style.display = 'none';
                        // Show detail page
                        ui.showDetail(data.results[e.target.closest('.job__card').dataset.index]);
                    });
                })
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
let category;
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


// Full searchbar - hidden
const searchBtn = document.querySelector('.searchBtn');
searchBtn.addEventListener('click', () => {
    // Set up api link
    let apiLink;
    let categoryLink = inputTitle.value;
    categoryLink = categoryLink ? "&category=" + categoryLink.replace(/\s/g, "%20").replace(/\//g, "%2") : "";
    let levelLink = inputLevel.value;
    levelLink = levelLink ? "&level=" + levelLink.replace(/\s/g, "%20").replace(/\//g, "%2") : "";
    if(remoteHiddenValue){
        apiLink = job.apiUrl + categoryLink + levelLink + remoteLink;
    } else {
        apiLink = job.apiUrl + categoryLink + levelLink;
    }

    // Get data and display
    job.getJobs(apiLink).then(data => {
        if(data.length === 0){
            console.log('No job available.');
        } else {
            ui.clearJob();
            ui.showJob(data.results);
        }

        // Go to detail page
        let jobCards = document.querySelectorAll('.job__card');
        jobCards.forEach((jobCard) => {
            jobCard.addEventListener('click', (e) => {
                // Hide job div and loadmore
                ui.jobContainer.style.display = 'none';
                loadmoreBtn.style.display = 'none';
                searchbar.style.display = 'none';
                // Show detail page
                ui.showDetail(data.results[e.target.closest('.job__card').dataset.index]);
            });
        })
    });
})


// Modal searchbar
const searchBtnModal = document.querySelector('.searchBtnModal');
const searchIcon = document.getElementById('search');
searchBtnModal.addEventListener('click', () => {
    // Set up api link
    let apiLink;
    let categoryLink = inputTitle.value;
    categoryLink = categoryLink ? "&category=" + categoryLink.replace(/\s/g, "%20").replace(/\//g, "%2") : "";
    let levelLink = inputModal.value;
    levelLink = levelLink ? "&level=" + levelLink.replace(/\s/g, "%20").replace(/\//g, "%2") : "";
    if(remoteModalValue){
        apiLink = job.apiUrl + categoryLink + levelLink + remoteLink;
    } else {
        apiLink = job.apiUrl + categoryLink + levelLink;
    }

    // Get data and display
    job.getJobs(apiLink).then(data => {
        if(data.length === 0){
            console.log('No job available.');
        } else {
            ui.clearJob();
            ui.showJob(data.results);
            modalContainer.classList.remove('header__modal-active');
        }

        // Go to detail page
        let jobCards = document.querySelectorAll('.job__card');
        jobCards.forEach((jobCard) => {
            jobCard.addEventListener('click', (e) => {
                // Hide job div and loadmore
                ui.jobContainer.style.display = 'none';
                loadmoreBtn.style.display = 'none';
                searchbar.style.display = 'none';
                // Show detail page
                ui.showDetail(data.results[e.target.closest('.job__card').dataset.index]);
            });
        })
    });
})

searchIcon.addEventListener('click', () => {
    // Set up api link
    let apiLink;
    let categoryLink = inputTitle.value;
    categoryLink = categoryLink ? "&category=" + categoryLink.replace(/\s/g, "%20").replace(/\//g, "%2") : "";
    let levelLink = inputModal.value;
    levelLink = levelLink ? "&level=" + levelLink.replace(/\s/g, "%20").replace(/\//g, "%2") : "";
    if(remoteModalValue){
        apiLink = job.apiUrl + categoryLink + levelLink + remoteLink;
    } else {
        apiLink = job.apiUrl + categoryLink + levelLink;
    }

    // Get data and display
    job.getJobs(apiLink).then(data => {
        if(data.length === 0){
            console.log('No job available.');
        } else {
            ui.clearJob();
            ui.showJob(data.results);
        }

        // Go to detail page
        let jobCards = document.querySelectorAll('.job__card');
        jobCards.forEach((jobCard) => {
            jobCard.addEventListener('click', (e) => {
                // Hide job div and loadmore
                ui.jobContainer.style.display = 'none';
                loadmoreBtn.style.display = 'none';
                searchbar.style.display = 'none';
                // Show detail page
                ui.showDetail(data.results[e.target.closest('.job__card').dataset.index]);
            });
        })
    });
})


/* Media Query */
// const mediaQuery = window.matchMedia('(min-width: 768px)')
// if (mediaQuery.matches) {
//   console.log('Media Query Matched!');
// }
