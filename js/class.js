class Job {
    async getJobs(){
        const proxyUrl = 'https://vast-shelf-54523.herokuapp.com/';
        const apiUrl = 'https://jobs.github.com/positions.json?description=&location=';
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        return data;        
    }
}