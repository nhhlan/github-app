class Job {
    constructor(){
        // this.currentPage = 1;
        this.pageCount;
        this.apiUrl = `https://www.themuse.com/api/public/jobs?page=`;
    }

    async getJobs(apiUrl){
        const apiKey = '3166ceb57fc84759aeb994d834ae6bf9ff4a28b3d5dd7035bebf445ec59fe9a4';
        const proxyUrl = 'https://vast-shelf-54523.herokuapp.com/';
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // this.currentPage = data.page;
        this.pageCount = data.page_count;
        return data;        
    }

    setUpAPILink(inputTitle, inputLevel, remoteValue){
        let categoryLink = inputTitle.value;
        categoryLink = categoryLink ? "&category=" + categoryLink.replace(/\s/g, "%20").replace(/\//g, "%2") : "";
        let levelLink = inputLevel.value;
        levelLink = levelLink ? "&level=" + levelLink.replace(/\s/g, "%20").replace(/\//g, "%2") : "";
        if(remoteValue){
            apiLink = apiLink + categoryLink + levelLink + remoteLink;
        } else {
            apiLink = apiLink + categoryLink + levelLink;
        }
    }
}

class UI {
    constructor(){
        this.container = document.querySelector('main');
        this.jobContainer = document.querySelector('.job');
    }


	getTimestamp(dateInput){
        const now = new Date();
        const dateInputTimeStamp = (new Date(dateInput)).getTime();
        const nowTimeStamp = now.getTime();
        const microSecondsDiff = Math.abs(dateInputTimeStamp - nowTimeStamp);

        // Number of milliseconds per day = 24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 ms/second
        const daysDiff = Math.round(microSecondsDiff / (1000 * 60 * 60  * 24));
        return daysDiff;
    }


    clearJob(){
        this.jobContainer.innerHTML = '';
    }
    

    showJob(jobs){
        let jobOutput = [];
        jobs.forEach((job, index) => {
            jobOutput += `
            <div class="job__card" data-index="${index}">
                <img src="assets/SR Logo.png" class="job__logo" alt="company logo">
                <div class="job__createTime">
                    <span class="job__type">${this.getTimestamp(job.publication_date)}d ago</span>
                    <span>.</span>
                    <span class="job__type">${job.levels[0].name}</span>
                </div>
                <h3 class="job__title">${job.name}</h3>
                <p class="job__type">${job.company.name}</p>
                <h4 class="job__location">${job.locations[0].name}</h4>
            </div>
            `
        });

	    this.jobContainer.innerHTML += jobOutput;
    };


    showSuggestions(list, suggBox){
        let listData;
        if(list.length){
            listData = list.join('');
        } else {
            listData = '<li style="color: #6E8098;">No category found.</li>'
        }
        suggBox.innerHTML = listData;
    }


    showDetail(job){
        let detailOutput = `
        <div class="detail">
            <div class="detail__company">
                <img src="assets/SR Logo.png" alt="company logo">
                <h3>${job.company.name}</h3>
                <p>${job.company.short_name}</p>
                <a href="${job.refs.landing_page}" class="lightBtn-2">Company Site</a>
            </div>

            <div class="detail__info">
                <div class="job__createTime">
                    <span class="job__type">${this.getTimestamp(job.publication_date)}d ago</span>
                    <span>.</span>
                    <span class="job__type">${job.levels[0].name}</span>
                </div>
                <h3 class="job__title">${job.name}</h3>
                <h4 class="job__location">${job.locations[0].name}</h4>
                <a href="#" class="lightBtn">Apply Now</a>

                <div class="detail__description">${job.contents}</div>
            </div>

            <div class="detail__apply">
                <h3>How To Apply</h3>
                <p>If this describes your interests and experience, please submit your current resume and salary requirements through the following link:
                    <a href="#">${job.company.name}</a>
                </p>
            </div>
        </div>
        <div class="footer">
            <div class="footer__text">
                <h3>${job.name}</h3>
                <p>${job.company.name}</p>
            </div>
            <a href="#" class="lightBtn">Apply Now</a>
        </div>
            `;
        this.container.innerHTML = detailOutput;
    };


    goToDetailPage(loadmoreBtn, searchbar, data){
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
    }


    searchRequest(event, suggList, wrapper, suggBox, inputBox){
        let titleData = event.target.value;
        let emptyArr = [];
        if(titleData){
            emptyArr = suggList.filter((data)=>{
                //filtering array value and return only those words which are start with user enetered chars
                return data.toLocaleLowerCase().startsWith(titleData.toLocaleLowerCase()); 
            }).map((data)=>{
                // passing return data inside li tag
                return data = '<li>'+ data +'</li>';
            });
            //show autocomplete box
            wrapper.classList.add("open"); 
            this.showSuggestions(emptyArr, suggBox);
    
            let allLI = suggBox.querySelectorAll("li");
            for (let i = 0; i < allLI.length; i++) {
                // take value from selection
                allLI[i].addEventListener('click', (e) => {
                    inputBox.value = e.target.textContent;
                    wrapper.classList.remove("open"); 
                    setTimeout(()=> {
                        suggBox.innerHTML = '';
                    },1000);
                })
            }
        } else {
            //hide autocomplete box
            wrapper.classList.remove("open"); 
        }
    }

    showLevel(suggList, wrapper, suggBox, inputBox){
        let titleData = true;
        let emptyArr = [];
        if(titleData){
            emptyArr = suggList.map((data)=>{
                // passing return data inside li tag
                return data = '<li>'+ data +'</li>';
            });
            //show autocomplete box
            wrapper.classList.add("open"); 
            this.showSuggestions(emptyArr, suggBox);
    
            let allLI = suggBox.querySelectorAll("li");
            for (let i = 0; i < allLI.length; i++) {
                // take value from selection
                allLI[i].addEventListener('click', (e) => {
                    inputBox.value = e.target.textContent;
                    wrapper.classList.remove("open"); 
                    setTimeout(()=> {
                        suggBox.innerHTML = '';
                    },1000);
                })
            }
        } else {
            //hide autocomplete box
            wrapper.classList.remove("open"); 
        }
    }
}