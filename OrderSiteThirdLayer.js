// Firebase config data
const firebaseConfig = {
  apiKey: "AIzaSyCi-rUjlhOdlI-jjfrpO0a8eL1_Ztunsfg",
  authDomain: "cleaningil.firebaseapp.com",
  databaseURL: "https://cleaningil-default-rtdb.firebaseio.com",
  projectId: "cleaningil",
  storageBucket: "cleaningil.appspot.com",
  messagingSenderId: "17655733949",
  appId: "1:17655733949:web:ba81ba0d0243f49f6ee1d4",
  measurementId: "G-MBEQZJD79B"
};
// initialize firebase
firebase.initializeApp(firebaseConfig);
// reference database (what is the name in the data base)
var contactFormDB = firebase.database().ref("contactForm");
// Initialize Realtime Database and get a reference to the service

function WriteNewClient(){ // Take all clint info and place it in to fire base

var info=pullinfo(); 
  var newContactForm = contactFormDB.push(); // calling the firebase 
  // Setting the new data in the the fire base  (Name in the database : Data)
  newContactForm.set({
  Contact1: {FirstName: info.fName1, LastName: info.lName1, PhoneNumber: info.phone1,email: info.email1},
  Contact2: {FirstName: info.fName2, LastName: info.lName2, PhoneNumber: info.phone2,email: info.email2},
  Address: {City: info.city, Street: info.street, BuildingNum: info.buildingNum},
  BuildingData: {Floors: info.floorNum,FloorSize: info.floorSize,Lobbys: info.lobbyNum,Lobbysize: info.lobbySize,
                 Windows: info.windowsNum, ParkingLot: info.parkingLot, ParkingNum: info.parkingNum, GarbageRoom: info.garbageRoom,
                 GarbageNum: info.garbageNum,Garden: info.garden,GardenNum: info.gardenNum,StairsClean: info.stairsClean, 
                 ElevatorNum: info.elevatorNum},
  CleaningPerWeek: info.CleaningPerWeek,
  specialRequest: info.specialRequest,
  EstemaitedPrice: info.esemitedprice , Status: "חדש"
  
  });

  // reseting the form
  cleanForm();
};

