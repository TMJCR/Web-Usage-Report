const User = require('../models/user');
const Visit = require('../models/visit');

const companies = [
  'Abore Capital Management',
  'AQB Asset Management',
  'Bishopgate Capital',
  'Melior Capital',
  'New Peak Group',
  'Hatton & Partners',
  'Temple Securities',
  'CTIX International',
  'ATCG',
  'Senoku Securities',
  'Aandewiel Investments',
  'Rahn Klostermann & Co',
];

const names = [
  'Ahmed Velez',
  'Drew Beltran',
  'Zaid Mitchell',
  'Moises Spencer',
  'Shane Walker',
  'Emilia Ramirez',
  'Cory Mahoney',
  'Maleah Melton',
  'Todd Gonzales',
  'Kiley Estrada',
  'Jack Poole',
  'Lola Barnes',
  'Karly Padilla',
  'Bridger Nicholson',
  'Hana Lara',
  'Leticia Hughes',
  'Erik Mcdonald',
  'Lucia Stevens',
  'Niko Dennis',
  'Lilliana Diaz',
  'Cortez Potter',
  'Marlie Hamilton',
  'Clark Meyer',
  'Jadon Silva',
  'Kaylyn Gould',
  'Johnathon Petty',
  'Desmond Santana',
  'Fabian Lynn',
  'Javier Vargas',
  'Eli Dunn',
  'Alyson Morgan',
  'Kierra Glass',
  'Gia Mccann',
  'Mareli Pace',
  'Amiya Collins',
  'Saul Hull',
  'Joyce Villa',
  'Elsie Quinn',
  'Armani Petty',
  'Kristin Singleton',
  'Justine Chambers',
  'Alayna Petersen',
  'Lucille Hensley',
  'Johan Morris',
  'Avery Underwood',
  'Reagan Schroeder',
  'Kathleen Cordova',
  'Jaiden Goodwin',
  'Carla Salas',
  'India Rollins',
  'Amanda Mays',
  'Ximena English',
  'Jovan Carroll',
  'Madalynn Dunn',
  'Jasmin Chapman',
  'Nigel Hays',
  'Marisa Wagner',
  'Augustus Huber',
  'Maya Bolton',
  'Gordon Saunders',
  'Rocco Hart',
  'Lyla Mullins',
  'Jadyn Bartlett',
  'Theresa Peterson',
  'Annie Johns',
  'Kayden Bauer',
  'Xander Decker',
  'Sullivan Mayer',
  'Madalyn Haas',
  'Damarion Martinez',
  'Colten Duncan',
  'Olive Zimmerman',
  'Trevon Chen',
  'Talan Raymond',
  'Harper Sosa',
  'Haiden Barrera',
  'Laci Jacobs',
  'Jayson Kidd',
  'Alana Jensen',
  'Davis Potter',
  'Philip Hull',
  'Mia Turner',
  'Damian Miller',
  'Madelyn Higgins',
  'Jaquan Zhang',
  'Aimee Rich',
  'Marcus Foster',
  'Muhammad Morrow',
  'Grant Chavez',
  'Zaria Gomez',
  'Junior Delgado',
  'Landon Hamilton',
  'Augustus Palmer',
  'Giuliana Golden',
  'Siena Hood',
  'Yadiel Ruiz',
  'Elianna Larson',
  'Camryn Richardson',
  'Konner Stanton',
  'Miah Gonzalez',
  'Matias Durham',
  'Sylvia Brennan',
  'Gretchen Henson',
  'Valentin Fischer',
  'Teresa Wang',
  'Ryker Odonnell',
  'Cara Lewis',
  'Liam Maddox',
  'Kaitlin Burch',
  'Magdalena Freeman',
  'Allen Hodges',
  'Angela Lamb',
  'Crystal Black',
  'Corbin Newman',
  'Randy Hancock',
  'Jocelyn Castillo',
  'Adan Matthews',
  'Efrain Crosby',
  'Deborah Osborn',
  'Desirae Warren',
  'Zavier Chung',
  'Alanna Mcgrath',
  'Britney Hobbs',
  'Thalia Fleming',
  'Triston Huff',
  'Lyla Nash',
  'Benjamin Silva',
  'Jessie Henderson',
  'Reyna Dougherty',
  'Ireland Haynes',
  'Alisha Barnes',
  'Gilberto Fuller',
  'Aiden Middleton',
  'Aiyana Mcguire',
  'Isiah Boone',
  'Leo Wise',
  'Maci Haas',
  'Ashlyn Ramirez',
  'Amirah Navarro',
  'Mckayla Flynn',
  'Kaia Boone',
  'Lindsey Chan',
  'Hadley Boyd',
  'Royce Townsend',
  'Lee Lozano',
  'Maria Velasquez',
  'Alexa Robinson',
  'Broderick Castro',
  'Genesis Cruz',
  'Reuben Banks',
  'Belinda Butler',
  'Kenyon Rush',
  'Darion Roth',
  'Eileen Villarreal',
  'Deborah Manning',
  'Briana Sellers',
  'Rubi Morse',
  'Javier Woodard',
  'Bailey Bell',
  'Dylan Lopez',
  'Amira Andrade',
  'Case Cherry',
  'Abdiel Carroll',
  'Cristian Pugh',
  'Teagan Ferrell',
  'Memphis Bonilla',
  'Norah Farrell',
  'Sienna Montgomery',
  'Alayna Dunn',
  'Randall Church',
  'Angelina Romero',
  'Tia Higgins',
  'Trenton Lane',
  'Damien Andersen',
  'Reed Dunn',
  'Yael Dunn',
  'Maximo Bailey',
  'Josue Keith',
  'Paloma Castaneda',
  'Moshe Moreno',
  'Matthew Knight',
  'Reilly Yoder',
  'Talia Barnes',
  'Emily Benton',
  'Brody Reid',
  'Ulises Morales',
  'Caitlyn Little',
  'Izabella Paul',
  'Deja Rivers',
  'Kylee Kidd',
  'Emmalee Foster',
  'Chase Suarez',
  'Cloe Lin',
  'Xzavier Davidson',
  'Bella Wade',
  'Jamiya Johns',
  'Cameron Burnett',
  'Marlie Clayton',
  'Santiago Wilkerson',
  'Jefferson Lin',
];

const pages = [
  'UK Economic Forecasts',
  'European Economic Forecasts',
  'Credit Market Forecasts',
  'Housing Market Forecasts',
  'Disposable Income Forecasts',
  'Portfolio Insight',
  'Mortgage Markets',
  'Commodities',
  'Promotional',
];
// page, userid, time

const generateRandom = (rangeEnd) => {
  return Math.ceil(Math.random() * rangeEnd);
};

// Seeding User Data
// for (name of names) {
//   const [firstName, lastName] = name.split(' ');
//   const randomSelection = generateRandom(companies.length - 1);
//   const company = companies[randomSelection];
//   const companyEmail = company.split(' ').join('');
//   const email = `${firstName}.${lastName}@${companyEmail}.com`;
//   const user = new User({ firstName, lastName, company, email, visits: [] });
//   user.save();
// }

const getUserIDsFromDB = async () => {
  const users = await User.find({});
  const userIDs = [];
  for (user of users) {
    userIDs.push(user._id);
  }
  return userIDs;
};

const createVisitData = async (numOfRecordsToAdd) => {
  const users = await getUserIDsFromDB();
  for (let i = 0; i < numOfRecordsToAdd; i++) {
    const user = users[generateRandom(users.length - 1)];
    const randomMonth = generateRandom(4);
    const randomDay = generateRandom(27);
    const randomHour = generateRandom(23);
    const randomMin = generateRandom(59);
    const page = pages[generateRandom(pages.length - 1)];
    const time = new Date(2020, randomMonth, randomDay, randomHour, randomMin);

    const visit = new Visit({ page, time, userId: user._id });
    const userID = visit.userId;

    visit.save();
    await User.findByIdAndUpdate(
      {
        _id: userID,
      },
      { $push: { visits: visit._id } }
    );
  }
};

createVisitData(1000);

const findVisit = async (id) => {
  const user = await User.findById(id);
  console.log(user);
  const visitId = user.visits[0];
  console.log(visitId);
  const visit = await Visit.findById(visitId);
  console.log(visit);
};

// findVisit('5e948fd0314a8019fc83ed06');
