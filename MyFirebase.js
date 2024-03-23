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

class MyFirebase {
    constructor() {      
        if (MyFirebase.object) {
            return MyFirebase.object
        }
        // initialize firebase
        firebase.initializeApp(firebaseConfig);
        Object.freeze(this);
        MyFirebase.object = this;
    }
    
    ReadData(){
        // Taking snapshot of all the data in the database
        firebase.database().ref('contactForm').once('value',function(snapshot) 
        {
             // remove the old data from the site
            document.getElementById("ClientTable").innerHTML = "";
            clientindx = 0;
            // read the new data
            snapshot.forEach(function(childSnapshot){
            var Clientkey = childSnapshot.key;
            var Address = childSnapshot.val().Address;
            var BuildingData = childSnapshot.val().BuildingData;
            var Contact1 = childSnapshot.val().Contact1;
            var Contact2 = childSnapshot.val().Contact2;
            var specialRequest = childSnapshot.val().specialRequest;
            var CleaningPerWeek = childSnapshot.val().CleaningPerWeek;
            var EstemaitedPrice = childSnapshot.val().EstemaitedPrice;
            var Status = childSnapshot.val().Status;
            AddItemToTable(Address,BuildingData,Contact1,Contact2,specialRequest,CleaningPerWeek,EstemaitedPrice,Clientkey,Status);
          });
        });
    }

    UpdateClient(){  // Update the client in the data base based on the data in the update popup box
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

    RemoveClient(){  // removing the client in the data base
        firebase.database().ref("/contactForm/"+Key.value).remove().then(
          function() {
                 alert("הלקוח הוסר בהצלחה");
                 location.reload(); // refresh the page
      
        })
    }

    WriteNewClient(){ // Take all client info and place it in to fire base
        var info=pullinfo(); 
        var newContactForm = firebase.database().ref("contactForm").push(); // calling the firebase 
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
      }
}