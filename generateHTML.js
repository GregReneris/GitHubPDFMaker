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

    // p0 = axios.get(`https://api.github.com/users/${username}`);
    // p1 = axios.get(`https://api.github.com/users/${username}/repos?per_page=100&type="owner"`);
    // p2 = axios.get(`https://api.github.com/users/${username}/following`);
    // p3 = axios.get(`https://api.github.com/users/${username}/starred`);


    // Promise.all([p0,p1,p2,p3]).then(function(r){
    //   owner = r[0].data;
    //   repos = r[1].data;
    //   following = r[2].data;
    //   starred = r[3].data;
      
      // data = {};
      // data.color = color;
      // data.url = owner.url;
      // data.following = following.length;
      // data.avatar = owner.avatar_url; // link to headshot
      // data.repos = repos.length;
      // data.blog = owner.blog;
      // data.location = owner.location;
      // data.name = owner.name;
      // data.company = owner.company;
      // data.bio = owner.bio;

      data = {
        color: 'green',
        url: 'https://api.github.com/users/GregReneris',
        following: 3,
        avatar: 'https://avatars2.githubusercontent.com/u/56899750?v=4',
        repos: 12,
        blog: '',
        location: 'Seattle, Washington',
        name: 'Greg Reneris',
        company: 'Reneri Media',
        bio: "I'm developing my skills as a full-stack developer."
      };

      // console.log(owner);
      // console.log(owner.Login);
      // console.log(owner.url); 
      // console.log(starred.length);
      // console.log(following.length);
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
              <title>Document</title>
            
              
              <body>
                <div class="jumbotron jumbotron-fluid">
                <div class="container">
                  <h1 class="display-4">Hi! My name is ${data.name}</h1>
                  <p class="lead">I am from ${data.location}.</p>
                  <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
                  <ul class="list-group">
                    <li class="list-group-item">My GitHub username is ${data.github}</li>
                    <li class="list-group-item">LinkedIn: ${data.linkedin}</li>
                  </ul>
                </div>
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

        axios( {
            method: "post",
            url: "http://api.html2pdfrocket.com/pdf?apikey=cdadb1ff-7374-42bf-8909-f67307f95feb",
            data: {
              //apikey: "cdadb1ff-7374-42bf-8909-f67307f95feb",
              value: encodeURIComponent(generatedHTML)
            }
            //headers: {
            //  "Content-Type": "application/x-www-form-urlencoded"
            //}
          })            
          .then(function(r){
            //console.log("Got here past the axios call");
            //console.log(r);
            fs.writeFile("created.pdf", r.data, function(err){
              if (err) throw err;
              console.log("made the pdf file.");
            })
          });


        //self.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        //self.req.responseType = "blob";

      //}
      
   // })


        // console.log(owner);
        // console.log(owner.following_url.length);
        // console.log(owner.followers_url.length);
        // console.log(owner.starred_url);
        // console.log(`Saved ${repoNames.length} repos`);
        // console.log(owner.avatar_url);
        // console.log(p1);
  });




// function generateHTML(data) {
//   return `<!DOCTYPE html>
// <html lang="en">
//    <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//       <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
//       <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
//       <title>Document</title>
    
      
//       <body>
//         <div class="jumbotron jumbotron-fluid">
//         <div class="container">
//           <h1 class="display-4">Hi! My name is ${data.name}</h1>
//           <p class="lead">I am from ${data.location}.</p>
//           <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
//           <ul class="list-group">
//             <li class="list-group-item">My GitHub username is ${data.github}</li>
//             <li class="list-group-item">LinkedIn: ${data.linkedin}</li>
//           </ul>
//         </div>
//       </div>
//       </body>
      

//       <style>
//           @page {
//             margin: 0;
//           }
//          *,
//          *::after,
//          *::before {
//          box-sizing: border-box;
//          }
//          html, body {
//          padding: 0;
//          margin: 0;
//          }
//          html, body, .wrapper {
//          height: 100%;
//          }
//          .wrapper {
//          background-color: ${colors[data.color].wrapperBackground};
//          padding-top: 100px;
//          }
//          body {
//          background-color: white;
//          -webkit-print-color-adjust: exact !important;
//          font-family: 'Cabin', sans-serif;
//          }
//          main {
//          background-color: #E9EDEE;
//          height: auto;
//          padding-top: 30px;
//          }
//          h1, h2, h3, h4, h5, h6 {
//          font-family: 'BioRhyme', serif;
//          margin: 0;
//          }
//          h1 {
//          font-size: 3em;
//          }
//          h2 {
//          font-size: 2.5em;
//          }
//          h3 {
//          font-size: 2em;
//          }
//          h4 {
//          font-size: 1.5em;
//          }
//          h5 {
//          font-size: 1.3em;
//          }
//          h6 {
//          font-size: 1.2em;
//          }
//          .photo-header {
//          position: relative;
//          margin: 0 auto;
//          margin-bottom: -50px;
//          display: flex;
//          justify-content: center;
//          flex-wrap: wrap;
//          background-color: ${colors[data.color].headerBackground};
//          color: ${colors[data.color].headerColor};
//          padding: 10px;
//          width: 95%;
//          border-radius: 6px;
//          }
//          .photo-header img {
//          width: 250px;
//          height: 250px;
//          border-radius: 50%;
//          object-fit: cover;
//          margin-top: -75px;
//          border: 6px solid ${colors[data.color].photoBorderColor};
//          box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
//          }
//          .photo-header h1, .photo-header h2 {
//          width: 100%;
//          text-align: center;
//          }
//          .photo-header h1 {
//          margin-top: 10px;
//          }
//          .links-nav {
//          width: 100%;
//          text-align: center;
//          padding: 20px 0;
//          font-size: 1.1em;
//          }
//          .nav-link {
//          display: inline-block;
//          margin: 5px 10px;
//          }
//          .workExp-date {
//          font-style: italic;
//          font-size: .7em;
//          text-align: right;
//          margin-top: 10px;
//          }
//          .container {
//          padding: 50px;
//          padding-left: 100px;
//          padding-right: 100px;
//          }

//          .row {
//            display: flex;
//            flex-wrap: wrap;
//            justify-content: space-between;
//            margin-top: 20px;
//            margin-bottom: 20px;
//          }

//          .card {
//            padding: 20px;
//            border-radius: 6px;
//            background-color: ${colors[data.color].headerBackground};
//            color: ${colors[data.color].headerColor};
//            margin: 20px;
//          }
         
//          .col {
//          flex: 1;
//          text-align: center;
//          }

//          a, a:hover {
//          text-decoration: none;
//          color: inherit;
//          font-weight: bold;
//          }

//          @media print { 
//           body { 
//             zoom: .75; 
//           } 
//          }
//       </style>`
// }


      //  module.exports = generateHTML;




      // https://www.html2pdfrocket.com/Examples/javascript
// api key cdadb1ff-7374-42bf-8909-f67307f95feb
/**
* html: HTML string to convert to PDF
* savePdf: Callback for saving PDF
* Returns the binary PDF data
*/
  
function pdfRocket(html, savePdf) {
  var self = this;
  
  self.save = savePdf;
  self.req = new XMLHttpRequest();

  var url = "http://api.html2pdfrocket.com/pdf";
  var apiKey = "cdadb1ff-7374-42bf-8909-f67307f95feb";
  // Additional parameters can be added here
  var data = "apikey=" + apiKey + "&value=" + encodeURIComponent(html);

  self.req.onload = function(event) {
         self.save(self.req.response);
  };

  self.req.open("POST", url, true);
  self.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  self.req.responseType = "blob";

  self.req.send(data);
}
