const job = new Job;

job.getJobs().then(data => {
    if(data.length === 0){
        console.log('alert');
    } else {
        console.log(data[0].title);
    }
    
});

const jobContainer = document.querySelector('.job');
// jobContainer.innerHTML = `
//     <a href="${data.url}"><div class="job__card">
//     <img src="${data.company_logo}" alt="company logo">
//     <div>
//     <span class="job__type">5h ago</span>
//     <span class="job__type">${data.type}</span>
//     </div>
//     <h3 class="job__title">${data.title}</h3>
//     <p class="job__type">${data.company}</p>
//     <h4 class="job__location">${data.location}</h4>
//     </div></a>
// `;
    