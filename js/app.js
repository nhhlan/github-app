const job = new Job;
const ui = new UI;
const loadmoreBtn = document.querySelector('#loadmore');
const searchbar = document.querySelector('.header__searchbar');


/* GET DATA & SHOW UI */
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
// Remote checkbox
const remote = '&location=Flexible%20%2F%20Remote';
const checkboxes = document.querySelectorAll('input[type=checkbox]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        if(e.target.checked){
            job.getJobs(job.apiUrl + remote).then(data => {
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
        } else {
            job.getJobs(job.apiUrl).then(data => {
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
        }
    })
})


// Category input
const category = '&category=Accounting';


// Level input
const level = '&level=Senior%20Level';

