const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");



const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

inquirer
  .prompt([{
    type: "input",
    message: "Enter the GitHub username of the person you want to generate a report for:",
    name: "username"
  },
  {
    type: "list",
    message: "What color do you want?",
    name: "color",
    choices: [
      "green", 
      "blue", 
      "red", 
      "pink"
    ]
  }])
  .then(function({ username, color }) {

    p0 = axios.get(`https://api.github.com/users/${username}`);
    p1 = axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
    //p2 = axios.get(`https://api.github.com/users/${username}/following`);
    p2 = axios.get(`https://api.github.com/users/${username}/starred`);


    Promise.all([p0,p1,p2]).then(function(r){
      owner = r[0].data;
      repos = r[1].data;
      //following = r[2].data;
      starred = r[2].data;
      
      data = {};
      data.color = color;
      data.url = owner.html_url;
      data.following = owner.following;
      data.followers = owner.followers;
      data.avatar = owner.avatar_url; // link to headshot
      data.repos = repos.length;
      data.blog = owner.blog;
      data.location = owner.location;
      data.location_url = "http://www.google.com/maps/place/"+encodeURIComponent(owner.location);
      data.name = owner.name;
      data.company = owner.company;
      data.bio = owner.bio;
      data.starred = starred.length;

      if(data.name == null){
        data.name = username;
      }
      if (data.blog == null || data.blog == ''){
        data.blog = "https://en.wikipedia.org/wiki/Blog";
      }
      

      console.log(data);
                
        // make sure html generate function is in here.         
        function generateHTML(data) {
          return `<!DOCTYPE html>
        <html lang="en">
           <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
              <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
              <title>Report on ${data.name}</title>
            
              
              <body class ="wrapper">
               
              

                  

              <div class="container">
                
                <div class ="photo-header">
                  <img src=" ${data.avatar}" alt="">
                  
                  
                <h1>Hi!</h1> 
                <h2>My name is ${data.name}</h2>
                <h6>Currently at ${data.location}</h6>
                
                <div class="links-nav">
                  <a class="nav-link" href="${data.location_url}"> ${data.location} </a>
                  <a class="nav-link" href="${data.url}">GitHub</a>
                  <a class="nav-link" href="${data.blog}"> Blog </a>  
                </div>
                </div>
              </div>

              <div>
                <div class = "container">
                 <main>
                  <h3 align="center" >${data.bio}</h3>
                  <br>
                  
                <div class="row">
                  <div class="col">
                    <div class="card">
                      <p>Public Repositories</p>
                      <p>${data.repos}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <p>Followers</p>
                      <p>${data.followers}</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="card">
                      <p>Git Stars</p>
                      <p> ${data.starred}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <p>Following</p>
                      <p>${data.following}</p>
                    </div>
                  </div>
                </div> 
                <div class="wrapper">
                </main>
            </div>               
            
         
          </body>              
        
              <style>
                  @page {
                    margin: 0;
                  }
                 *,
                 *::after,
                 *::before {
                 box-sizing: border-box;
                 }
                 html, body {
                 padding: 0;
                 margin: 0;
                 }
                 html, body, .wrapper {
                 height: 100%;
                 }
                 .wrapper {
                 background-color: ${colors[data.color].wrapperBackground};
                 padding-top: 100px;
                 }
                 body {
                 background-color: white;
                 -webkit-print-color-adjust: exact !important;
                 font-family: 'Cabin', sans-serif;
                 }
                 main {
                 background-color: #E9EDEE;
                 height: auto;
                 padding-top: 30px;
                 }
                 h1, h2, h3, h4, h5, h6 {
                 font-family: 'BioRhyme', serif;
                 margin: 0;
                 }
                 h1 {
                 font-size: 3em;
                 }
                 h2 {
                 font-size: 2.5em;
                 }
                 h3 {
                 font-size: 2em;
                 }
                 h4 {
                 font-size: 1.5em;
                 }
                 h5 {
                 font-size: 1.3em;
                 }
                 h6 {
                 font-size: 1.2em;
                 }
                 .photo-header {
                 position: relative;
                 margin: 0 auto;
                 margin-bottom: -50px;
                 display: flex;
                 justify-content: center;
                 flex-wrap: wrap;
                 background-color: ${colors[data.color].headerBackground};
                 color: ${colors[data.color].headerColor};
                 padding: 10px;
                 width: 95%;
                 border-radius: 6px;
                 }
                 .photo-header img {
                 width: 250px;
                 height: 250px;
                 border-radius: 50%;
                 object-fit: cover;
                 margin-top: -75px;
                 border: 6px solid ${colors[data.color].photoBorderColor};
                 box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                 }
                 .photo-header h1, .photo-header h2 {
                 width: 100%;
                 text-align: center;
                 }
                 .photo-header h1 {
                 margin-top: 10px;
                 }
                 .links-nav {
                 width: 100%;
                 text-align: center;
                 padding: 20px 0;
                 font-size: 1.1em;
                 }
                 .nav-link {
                 display: inline-block;
                 margin: 5px 10px;
                 }
                 .workExp-date {
                 font-style: italic;
                 font-size: .7em;
                 text-align: right;
                 margin-top: 10px;
                 }
                 .container {
                 padding: 50px;
                 padding-left: 100px;
                 padding-right: 100px;
                 }
        
                 .row {
                   display: flex;
                   flex-wrap: wrap;
                   justify-content: space-between;
                   margin-top: 20px;
                   margin-bottom: 20px;
                 }
        
                 .card {
                   padding: 20px;
                   border-radius: 6px;
                   background-color: ${colors[data.color].headerBackground};
                   color: ${colors[data.color].headerColor};
                   margin: 20px;
                 }
                 
                 .col {
                 flex: 1;
                 text-align: center;
                 }
        
                 a, a:hover {
                 text-decoration: none;
                 color: inherit;
                 font-weight: bold;
                 }
        
                 @media print { 
                  body { 
                    zoom: .75; 
                  } 
                 }
              </style>`
        }
        
        generatedHTML = generateHTML(data);
        //console.log(generatedHTML);
        fs.writeFile("index.html", generatedHTML, (err) => {
          if (err) throw err;
          console.log ("the file was written");
        } ); 

//AXIOS UNDERNEATH COMMENTED OUT.

        // axios( {
        //     method: "get",
        //     url: "http://api.html2pdfrocket.com/pdf",
        //     responsetype: "stream",
        //     params: {
        //       apikey: "cdadb1ff-7374-42bf-8909-f67307f95feb",
        //       value: generatedHTML
        //     }
        //   })            
        //   .then(function (response) {
        //     response.data.pipe(fs.createWriteStream('created.pdf'));
        //     console.log("created.pdf written");
        //     })
        //   });


        

        //self.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        //self.req.responseType = "blob";

      //}
      
    })



  });






