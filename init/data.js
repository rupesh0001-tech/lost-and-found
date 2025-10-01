const mongoose = require('mongoose');

const authorId = new mongoose.Types.ObjectId("68dc1c4aa2d7f0f59b7ca994");

const data = [
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad001"),
    title: "Black Leather Wallet",
    describtion: "Lost near the cafeteria, contains ID and some cash.",
    location: "College Cafeteria",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Leather_wallet.jpg",
    createdAt: new Date("2025-10-01T09:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad002"),
    title: "Blue Backpack",
    describtion: "Contains engineering books and a calculator.",
    location: "Library Reading Hall",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Backpack_blue.jpg",
    createdAt: new Date("2025-10-01T10:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad003"),
    title: "Black iPhone 12",
    describtion: "Lost during a football match.",
    location: "Sports Ground",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/12/IPhone_12_Pro_Blue.svg",
    createdAt: new Date("2025-10-01T11:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad004"),
    title: "Spectacles",
    describtion: "Black frame spectacles lost near lab.",
    location: "Physics Lab",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Glasses_black_frame.jpg",
    createdAt: new Date("2025-10-01T12:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad005"),
    title: "Water Bottle",
    describtion: "Steel bottle with sticker, left in canteen.",
    location: "Canteen",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Stainless_steel_bottle.jpg",
    createdAt: new Date("2025-10-01T13:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad006"),
    title: "ID Card",
    describtion: "College ID card lost somewhere in hostel.",
    location: "Hostel Block A",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/65/ID_Card_Sample.jpg",
    createdAt: new Date("2025-10-01T14:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad007"),
    title: "Wrist Watch",
    describtion: "Silver wristwatch misplaced during exam.",
    location: "Exam Hall",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Classic_watch.jpg",
    createdAt: new Date("2025-10-01T15:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad008"),
    title: "Umbrella",
    describtion: "Red umbrella left in library.",
    location: "Library Entrance",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/58/Red_umbrella.jpg",
    createdAt: new Date("2025-10-01T16:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad009"),
    title: "Laptop Charger",
    describtion: "Dell charger lost near computer lab.",
    location: "Computer Lab",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Dell_Laptop_Charger.jpg",
    createdAt: new Date("2025-10-01T17:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad010"),
    title: "Mathematics Notebook",
    describtion: "Green cover, filled with calculus notes.",
    location: "Lecture Hall 3",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Notebook_green_cover.jpg",
    createdAt: new Date("2025-10-01T18:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad011"),
    title: "Earphones",
    describtion: "White wired earphones left in bus.",
    location: "College Bus",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Wired_earphones.jpg",
    createdAt: new Date("2025-10-01T19:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad012"),
    title: "Shoes",
    describtion: "Sports shoes lost during practice.",
    location: "Basketball Court",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/89/Sports_shoes.jpg",
    createdAt: new Date("2025-10-01T20:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad013"),
    title: "Calculator",
    describtion: "Scientific calculator misplaced in exam hall.",
    location: "Hall 2",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/17/Scientific_calculator.jpg",
    createdAt: new Date("2025-10-01T21:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad014"),
    title: "Bike Helmet",
    describtion: "Black helmet left in parking lot.",
    location: "Main Parking",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Motorbike_helmet.jpg",
    createdAt: new Date("2025-10-01T22:00:00.000Z"),
    Author: [authorId]
  },
  {
    _id: new mongoose.Types.ObjectId("66fcd9a2b7e2f5a34f9ad015"),
    title: "Lab Coat",
    describtion: "White lab coat forgotten after chemistry lab.",
    location: "Chemistry Lab",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Lab_coat_white.jpg",
    createdAt: new Date("2025-10-01T23:00:00.000Z"),
    Author: [authorId]
  }
];

module.exports = data;
