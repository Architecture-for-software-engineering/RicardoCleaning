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
// reference database (what is the Data base folder)
var contactFormDB = firebase.database().ref("contactForm");


function ReadData(){
    // Taking snapshot of all the data in the database
    firebase.database().ref('contactForm').once('value',function(snapshot) 
    {
         // remove the old data from the site
        document.getElementById("ClintTable").innerHTML = "";
        clintindx = 0;
        // read the new data
        snapshot.forEach(function(childSnapshot){
        var Clintkey = clintdatabase = childSnapshot.key;
        var Address = childSnapshot.val().Address;
        var BuildingData = childSnapshot.val().BuildingData;
        var Contact1 = childSnapshot.val().Contact1;
        var Contact2 = childSnapshot.val().Contact2;
        var specialRequest = childSnapshot.val().specialRequest;
        var CleaningPerWeek = childSnapshot.val().CleaningPerWeek;
        var EstemaitedPrice = childSnapshot.val().EstemaitedPrice;
        var Status = childSnapshot.val().Status;
        AddItemToTable(Address,BuildingData,Contact1,Contact2,specialRequest,CleaningPerWeek,EstemaitedPrice,Clintkey,Status);
      });
    });
  };

function UpdateClint(){  // Update the clint in the data base baset on the data in the update popup box
    firebase.database().ref('contactForm/'+Key.value).update({
      Contact1: {FirstName: Contact1ChangeFirstName.value, LastName: Contact1LastNameChange.value, PhoneNumber: Contact1PhoneChange.value,email: Contact1MailChange.value},
      Contact2: {FirstName: Contact2ChangeFirstName.value, LastName: Contact2LastNameChange.value, PhoneNumber: Contact2PhoneChange.value,email: Contact2MailChange.value},
      Address: {City: CityChange.value, Street: StreetChange.value, BuildingNum: HouseNumChange.value},
      BuildingData: {Floors: FloorNumChange.value,FloorSize: FloorSizeChange.value,Lobbys: LobbyNumChange.value,Lobbysize: LobbySizeChange.value,
                     Windows: WindowsNumChange.value, ParkingLot: ParkingLotChange.value, ParkingNum: ParkingNumChange.value, GarbageRoom: GarbageRoomChange.value,
                     GarbageNum: GarbageNumChange.value,Garden: GardenChange.value,GardenNum: GardenNumChange.value,StairsClean: StairsChange.value, 
                     ElevatorNum: ElevatorChange.value},
      CleaningPerWeek: CleaningChange.value,
      specialRequest: SpecialRequestChange.value,
      EstemaitedPrice: PriceChange.value,
      Status: StatusChange.value
      
    }).then(
      function() {
    alert("הלקוח עודכן בהצלחה");
    location.reload(); // refresh the page
  
  });
  }

  function RemoveClint(){  // removing the clint in the data base
    firebase.database().ref("/contactForm/"+Key.value).remove().then(
      function() {
             alert("הלקוח הוסר בהצלחה");
             location.reload(); // refresh the page
  
    })
  }