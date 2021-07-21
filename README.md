# Website usage report
A recreation of a website I built for my previous company which enables a sales manager to query a database in order to retrieve client website usage statistics and a summary of the results. A key aspect of creating this application was building the node.js back-end which focused around a database seeding solution which recreates realistic patterns in the usage data which should more accurately illustrate the real-world application.

Note: Dummy data and fictional companies used.

Live Demo: https://web-usage-report.herokuapp.com/

<img src="./Thumbnail.png">

-How I built this:
* This is a recreation of an application that I built at my previous workplace. Our product website had a C# back-end which published website activity that could be accessed by administrators from a Json endpoint using dates as query strings. I worked with a sales manager to determine their needs of how to better understand how clients are making use of the website and I built an interactive front-end to present this data. 
* For this replica application, I used a node.js backend with a MongoDB database and then presented the data using vanilla javascript and charts.js for attractive chart animations.
* As I did not have access to any real data, I developed a database seeding program. To do this I first randomly generated users from a list of company and employee names and added these to a User's collection in the database. Then I created a seeding program that acted similarly to the real-world website activity. For each attribute of a visit e.g. length of visit, page visited, whether they downloaded anything, I set a range of values for which each could satisfy. I then generated a number of visits, each taking a random value from each range and assigning it to a user from the user collection. I could then specify how many I generated for each month to make the data closer to the patterns in the real data, e.g. December and January had much less activity than the other months.

-What I learnt:
* Being a server-side rendered site, I had to learn how templating engines work to generate HTML. For this project I used Handlebars.js.
* I learnt how to use Mongoose.js to create schema's for the dummy data that is stored in MongoDB. 
* As the original site was for a well established business with strict design and presentation principles I had to follow a company style guide which set out CSS rules on margins, padding, colors, fonts etc. This taught me how to design within a pre-defined framework and to adhere to design princples set out by experienced designers.    
* An important aspect of the web-usage report was to communicate with a sales manager to understand the insights they aimed to derive from the data - which was essentially a list of activity and timestamps. I then had to find the most appropriate way to extract the relevant information, aggregate it and then present it in a way that was easily digestible and satisfied their requirements.
* To replicate the original application as close as possible I wanted to have realistic dummy companies so I gained some understanding of logo design and typography to create authentic company names and logos.  

