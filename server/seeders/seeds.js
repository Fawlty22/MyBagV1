const faker = require("faker");
const bcrypt = require("bcrypt");

const db = require("../config/connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    let password = faker.internet.password(8, true);
    
    const discs = [
      {
        speed: "2",
        glide: "3",
        turn: "0",
        fade: "1",
        name: "Aviar",
        flightType: "Putter",
        brand: "Innova",
        flightPath: "https://mst12.inboundsdiscgolf.com/6275754.png",
      },
      {
        speed: "1",
        glide: "1",
        turn: "0",
        fade: "2",
        name: "Berg",
        flightType: "Putter",
        brand: "Kastaplast",
        flightPath: "https://mst12.inboundsdiscgolf.com/0125099.png",
      },
      {
        speed: "3",
        glide: "3",
        turn: "0",
        fade: "3",
        name: "Luna",
        flightType: "Putter",
        brand: "Discraft",
        flightPath: "https://mst12.inboundsdiscgolf.com/1010339.png",
      },
    ];
    userData.push({ username, email, password, discs });
  }

  const createdUsers = await User.collection.insertMany(userData);

  console.log("all done!");
  process.exit(0);
});
