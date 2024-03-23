
// Setting client index and client list global variables
var clientindx = 0;
var clientlist = [];

function AddItemToTable(Address,BuildingData,Contact1,Contact2,specialRequest,CleaningPerWeek,EstemaitedPrice,Clientkey,Status) /*Add all data takeing from the data base and add it to the html site */
{
  // creating all vairbles for the table
  var tbody1 = document.getElementById("ClientTable");
  var trow = document.createElement("tr");
  var td0 = document.createElement("td");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var td6 = document.createElement("td");
  var td7 = document.createElement("td"); 
  var td8 = document.createElement("td");
  var td9 = document.createElement("td");
  
  // creating every cell in the table
  clientlist.push([Contact1.FirstName,Contact1.LastName,Contact1.PhoneNumber,Contact1.email,
                  Contact2.FirstName,Contact2.LastName,Contact2.PhoneNumber,Contact2.email,
                  Address.City,Address.Street,Address.
                  BuildingNum,BuildingData.Floors,BuildingData.FloorSize,BuildingData.Lobbys,
                  BuildingData.Lobbysize,BuildingData.Windows,BuildingData.ParkingLot,BuildingData.ParkingNum,
                  BuildingData.GarbageRoom,BuildingData.GarbageNum,BuildingData.Garden,BuildingData.GardenNum,
                  BuildingData.ElevatorNum,BuildingData.StairsClean,CleaningPerWeek,specialRequest,EstemaitedPrice,Status,Clientkey]);

  td0.innerHTML = ++clientindx; 
  td1.innerHTML =  "שם פרטי: " + Contact1.FirstName +"</br>" + "</br>" + "שם משפחה: " + Contact1.LastName + "</br>" + "</br>" + "טלפון: " + Contact1.PhoneNumber + "</br>" + "</br>" + "אימייל : <span dir=\"ltr\">" + Contact1.email + "</span>" ; 
  td2.innerHTML = "שם פרטי: " + Contact2.FirstName +"</br>"  +  "</br>" + "שם משפחה: " + Contact2.LastName + "</br>" + "</br>" + "טלפון: " + Contact2.PhoneNumber + "</br>" +  "</br>" +"אימייל : <span dir=\"ltr\">" + Contact2.email + "</span>"; 
  td3.innerHTML = "עיר: " + Address.City + "</br>" + "</br>" + "רחוב: " + Address.Street + "</br>" + "</br>" + "מספר ביניין: " + Address.BuildingNum;
  td4.innerHTML = "</br>" + "מספר קומות: " + BuildingData.Floors + "</br>" +  "גודל קומות: " + BuildingData.FloorSize + "</br>" + "</br>" + "מספר לובים: " + BuildingData.Lobbys + "</br>" + "גודל לובים: " + BuildingData.Lobbysize
                  + "</br>" +  "</br>" + "כמות חלונות: " + BuildingData.Windows + "</br>" + "</br>" + "לנקות חניונים: " + BuildingData.ParkingLot + "</br>" +  "כמות חניונים: " +BuildingData.ParkingNum + "</br>" + "</br>" + "לנקות חדר אשפה: " + BuildingData.GarbageRoom
                  + "</br>" +  "מספר חדרי אשפה: " + BuildingData.GarbageNum + "</br>" + "</br>" + "האם לנקות גינות: " + BuildingData.Garden + "</br>" +  "מספר גינות: " + BuildingData.GardenNum + "</br>" + "</br>" +  "לנקות מדרגות: " + BuildingData.StairsClean
                  + "</br>" +  "מספר מעליות: " + BuildingData.ElevatorNum + "</br>" +"</br>"   ;
  td5.innerHTML = CleaningPerWeek;
  td6.innerHTML =   specialRequest;
  td7.innerHTML = EstemaitedPrice + " ש\"ח";
  td8.innerHTML = "סטטוס: " + Status;
  td9.innerHTML ='</br></br></br><button type="button" class="yellowButton" onclick="FillTboxses('+clientindx+')">עדכון/מחיקת לקוח</button></br></br></br></br>';  
  // Adding all data in to the row
  trow.appendChild(td0);
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(td7);
  trow.appendChild(td8);
  trow.appendChild(td9);
  // Adding the row to the table
  tbody1.append(trow);
}
function FillTboxses(clientindx) /*Filling the empty client eddit boxes with the client data */
{
    togglePopup() // open popup for client edit
    // Getting all data from the HTML 
    var Contact1Change = document.getElementById("Contact1Change");
    var Contact2Change = document.getElementById("Contact2Change");
    var AddressChange = document.getElementById("AddressChange");
    var BuildingDataChange = document.getElementById("BuildingDataChange");
    var specialRequestChange = document.getElementById("specialRequestChange");
    var CleaningPerWeekChange = document.getElementById("CleaningPerWeekChange");
    var EstemaitedPriceChange = document.getElementById("EstemaitedPriceChange");
    var StatusChange = document.getElementById("StatusChange");
    var Clientkey = document.getElementById("key");

    var SaveChangesButton = document.getElementById("SaveChangesButton");

    --clientindx; // the index is 1 more then the array index so we remove one
    // Adding the client in data to the correct text box 
    Contact1ChangeFirstName.value = clientlist[clientindx][0];
    Contact1LastNameChange.value = clientlist[clientindx][1];
    Contact1PhoneChange.value = clientlist[clientindx][2];
    Contact1MailChange.value = clientlist[clientindx][3];
    Contact2ChangeFirstName.value = clientlist[clientindx][4];
    Contact2LastNameChange.value = clientlist[clientindx][5];
    Contact2PhoneChange.value = clientlist[clientindx][6];
    Contact2MailChange.value = clientlist[clientindx][7];
    CityChange.value = clientlist[clientindx][8];
    StreetChange.value = clientlist[clientindx][9];
    HouseNumChange.value = clientlist[clientindx][10];
    FloorNumChange.value = clientlist[clientindx][11];
    FloorSizeChange.value = clientlist[clientindx][12];
    LobbyNumChange.value = clientlist[clientindx][13];
    LobbySizeChange.value = clientlist[clientindx][14];
    WindowsNumChange.value = clientlist[clientindx][15];
    ParkingLotChange.value = clientlist[clientindx][16];
    ParkingNumChange.value = clientlist[clientindx][17];
    GarbageRoomChange.value = clientlist[clientindx][18];
    GarbageNumChange.value = clientlist[clientindx][19];
    GardenChange.value = clientlist[clientindx][20];
    GardenNumChange.value = clientlist[clientindx][21];
    ElevatorChange.value = clientlist[clientindx][22];
    StairsChange.value = clientlist[clientindx][23];
    CleaningChange.value = clientlist[clientindx][24];
    SpecialRequestChange.value = clientlist[clientindx][25];
    PriceChange.value = clientlist[clientindx][26];
    StatusChange.value = clientlist[clientindx][27];
    Key.value = clientlist[clientindx][28];
    // disable the text box
    Key.disabled = true; 
}

 // Function to toggle the visibility of the popup menu
 function togglePopup() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
}

//The function is adapter between firebase class to the html
function myReadData() {
  var myfb = new MyFirebase()
  myfb.ReadData()
}

//The function is adapter between firebase class to the html
function myUpdateClient() {
  var myfb = new MyFirebase()
  myfb.UpdateClient()
}

//The function is adapter between firebase class to the html
function myRemoveClient() {
  var myfb = new MyFirebase()
  myfb.RemoveClient()
}