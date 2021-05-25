const User = require("../models/user");
const Visit = require("../models/visit");
const Summary = require("../models/summary");
require("../db/mongoose");

const companies = [
  "Arbor Capital Management",
  "AQB Asset Management",
  "Bishopsgate Capital",
  "Melior Capital",
  "Nexum Group",
  "Hatton & Partners",
  "Temple Securities",
  "CITX International",
  "ATCG",
  "Senoku Securities",
  "Aandewiel Investments",
  "Rahn Klostermann & Co",
];

const names = [
  "Ahmed Velez",
  "Drew Beltran",
  "Zaid Mitchell",
  "Moises Spencer",
  "Shane Walker",
  "Emilia Ramirez",
  "Cory Mahoney",
  "Maleah Melton",
  "Todd Gonzales",
  "Kiley Estrada",
  "Jack Poole",
  "Lola Barnes",
  "Karly Padilla",
  "Bridger Nicholson",
  "Hana Lara",
  "Leticia Hughes",
  "Erik Mcdonald",
  "Lucia Stevens",
  "Niko Dennis",
  "Lilliana Diaz",
  "Cortez Potter",
  "Marlie Hamilton",
  "Clark Meyer",
  "Jadon Silva",
  "Kaylyn Gould",
  "Johnathon Petty",
  "Desmond Santana",
  "Fabian Lynn",
  "Javier Vargas",
  "Eli Dunn",
  "Alyson Morgan",
  "Kierra Glass",
  "Gia Mccann",
  "Mareli Pace",
  "Amiya Collins",
  "Saul Hull",
  "Joyce Villa",
  "Elsie Quinn",
  "Armani Petty",
  "Kristin Singleton",
  "Justine Chambers",
  "Alayna Petersen",
  "Lucille Hensley",
  "Johan Morris",
  "Avery Underwood",
  "Reagan Schroeder",
  "Kathleen Cordova",
  "Jaiden Goodwin",
  "Carla Salas",
  "India Rollins",
  "Amanda Mays",
  "Ximena English",
  "Jovan Carroll",
  "Madalynn Dunn",
  "Jasmin Chapman",
  "Nigel Hays",
  "Marisa Wagner",
  "Augustus Huber",
  "Maya Bolton",
  "Gordon Saunders",
  "Rocco Hart",
  "Lyla Mullins",
  "Jadyn Bartlett",
  "Theresa Peterson",
  "Annie Johns",
  "Kayden Bauer",
  "Xander Decker",
  "Sullivan Mayer",
  "Madalyn Haas",
  "Damarion Martinez",
  "Colten Duncan",
  "Olive Zimmerman",
  "Trevon Chen",
  "Talan Raymond",
  "Harper Sosa",
  "Haiden Barrera",
  "Laci Jacobs",
  "Jayson Kidd",
  "Alana Jensen",
  "Davis Potter",
  "Philip Hull",
  "Mia Turner",
  "Damian Miller",
  "Madelyn Higgins",
  "Jaquan Zhang",
  "Aimee Rich",
  "Marcus Foster",
  "Muhammad Morrow",
  "Grant Chavez",
  "Zaria Gomez",
  "Junior Delgado",
  "Landon Hamilton",
  "Augustus Palmer",
  "Giuliana Golden",
  "Siena Hood",
  "Yadiel Ruiz",
  "Elianna Larson",
  "Camryn Richardson",
  "Konner Stanton",
  "Miah Gonzalez",
  "Matias Durham",
  "Sylvia Brennan",
  "Gretchen Henson",
  "Valentin Fischer",
  "Teresa Wang",
  "Ryker Odonnell",
  "Cara Lewis",
  "Liam Maddox",
  "Kaitlin Burch",
  "Magdalena Freeman",
  "Allen Hodges",
  "Angela Lamb",
  "Crystal Black",
  "Corbin Newman",
  "Randy Hancock",
  "Jocelyn Castillo",
  "Adan Matthews",
  "Efrain Crosby",
  "Deborah Osborn",
  "Desirae Warren",
  "Zavier Chung",
  "Alanna Mcgrath",
  "Britney Hobbs",
  "Thalia Fleming",
  "Triston Huff",
  "Lyla Nash",
  "Benjamin Silva",
  "Jessie Henderson",
  "Reyna Dougherty",
  "Ireland Haynes",
  "Alisha Barnes",
  "Gilberto Fuller",
  "Aiden Middleton",
  "Aiyana Mcguire",
  "Isiah Boone",
  "Leo Wise",
  "Maci Haas",
  "Ashlyn Ramirez",
  "Amirah Navarro",
  "Mckayla Flynn",
  "Kaia Boone",
  "Lindsey Chan",
  "Hadley Boyd",
  "Royce Townsend",
  "Lee Lozano",
  "Maria Velasquez",
  "Alexa Robinson",
  "Broderick Castro",
  "Genesis Cruz",
  "Reuben Banks",
  "Belinda Butler",
  "Kenyon Rush",
  "Darion Roth",
  "Eileen Villarreal",
  "Deborah Manning",
  "Briana Sellers",
  "Rubi Morse",
  "Javier Woodard",
  "Bailey Bell",
  "Dylan Lopez",
  "Amira Andrade",
  "Case Cherry",
  "Abdiel Carroll",
  "Cristian Pugh",
  "Teagan Ferrell",
  "Memphis Bonilla",
  "Norah Farrell",
  "Sienna Montgomery",
  "Alayna Dunn",
  "Randall Church",
  "Angelina Romero",
  "Tia Higgins",
  "Trenton Lane",
  "Damien Andersen",
  "Reed Dunn",
  "Yael Dunn",
  "Maximo Bailey",
  "Josue Keith",
  "Paloma Castaneda",
  "Moshe Moreno",
  "Matthew Knight",
  "Reilly Yoder",
  "Talia Barnes",
  "Emily Benton",
  "Brody Reid",
  "Ulises Morales",
  "Caitlyn Little",
  "Izabella Paul",
  "Deja Rivers",
  "Kylee Kidd",
  "Emmalee Foster",
  "Chase Suarez",
  "Cloe Lin",
  "Xzavier Davidson",
  "Bella Wade",
  "Jamiya Johns",
  "Cameron Burnett",
  "Marlie Clayton",
  "Santiago Wilkerson",
  "Jefferson Lin",
];

const pages = [
  "Promotional",
  "UK Economic Forecasts",
  "EU Economic Forecasts",
  "Credit Market Forecasts",
  "Housing Market Forecasts",
  "Household Income Forecasts",
  "Portfolio Insight",
  "Mortgage Markets",
  "Commodities",
  "Stress Test Scenarios",
  "Banking Regulation",
  "Commercial Real Estate",
  "Stochastic Scenarios",
];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const generateRandom = (rangeEnd) => {
  return Math.ceil(Math.random() * rangeEnd);
};

var randomChoiceWithWeightMulti = (choices, weights) => {
  let weight = 0;
  let selected;
  const random = Math.random();
  choices.forEach((choice, index) => {
    if (random >= weight && random <= weight + weights[index]) {
      selected = choice;
    }
    weight += weights[index];
  });
  return selected;
};

// const testingProbablilites = () => {
//   let arr = [];
//   for (let i = 0; i < 1000; i++) {
//     const selection = randomChoiceWithWeightMulti(["mobile","desktop","email","URL"],[0.80,0.04,0.06,0.1])
//     if (selection === 'mobile') {
//       arr.push(selection);
//     }
//   }
//   return arr.length;
// };

//// Seeding User Data

// for (name of names) {
//   const [firstName, lastName] = name.split(' ');
//   const randomSelection = generateRandom(companies.length) - 1;
//   const company = companies[randomSelection];
//   const companyEmail = company.split(' ').join('');
//   const email = `${firstName}.${lastName}@${companyEmail}.com`;
//   const user = new User({ firstName, lastName, company, email, visits: [] });
//   user.save();
// }

const getUsersFromDB = async () => {
  const users = await User.find({});
  return users;
};

const getVisitsFromDB = async () => {
  const visits = await Visit.find({});

  return visits;
};

const addToMonthlyTotal = async (visit) => {
  const year = visit.time.getFullYear();
  const monthIndex = visit.time.getMonth();
  const monthName = monthNames[monthIndex];
  const time = new Date(year, monthIndex, 1);

  const monthlyTotal = await Summary.findOne({ year, monthName });

  if (monthlyTotal) {
    await Summary.findByIdAndUpdate(
      { _id: monthlyTotal._id },
      { $inc: { value: 1 } }
    );
  } else {
    const newMonthlyTotal = new Summary({
      time,
      year,
      monthIndex,
      monthName,
      value: 1,
    });
    newMonthlyTotal.save();
  }
};

//Generate a random number of website visits associated with a random user
const createVisitData = async (numOfRecordsToAdd) => {
  const users = await getUsersFromDB();
  for (let i = 0; i < numOfRecordsToAdd; i++) {
    const user = users[generateRandom(users.length - 1)];
    const randomMonth = generateRandom(12) - 1;

    const randomDay = generateRandom(31);
    const randomHour = generateRandom(23);
    const randomMin = generateRandom(59);
    const page = pages[generateRandom(pages.length - 1)];
    const time = new Date(2021, randomMonth, randomDay, randomHour, randomMin);
    const download = randomChoiceWithWeightMulti([true, false], [0.3, 0.7]);
    const subscriber = randomChoiceWithWeightMulti([true, false], [0.98, 0.02]);
    const device = randomChoiceWithWeightMulti(
      ["Mobile", "Desktop"],
      [0.31, 0.69]
    );
    const method = randomChoiceWithWeightMulti(
      ["Link", "Url", "Advert", "Social"],
      [0.12, 0.8, 0.02, 0.06]
    );
    const visitLength = generateRandom(240);
    const visit = new Visit({
      page,
      time,
      download,
      subscriber,
      device,
      method,
      visitLength,
      userId: user._id,
      company: user.company,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    const userID = visit.userId;

    visit.save();
    await User.findByIdAndUpdate(
      {
        _id: userID,
      },
      { $push: { visits: visit._id } }
    );

    await addToMonthlyTotal(visit);
  }
};

// createVisitData(20);

const findVisit = async (id) => {
  const user = await User.findById(id);
  console.log(user);
  const visitId = user.visits[0];
  console.log(visitId);
  const visit = await Visit.findById(visitId);
  console.log(visit);
};

// findVisit('5e948fd0314a8019fc83ed06');
