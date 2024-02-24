
// Setting clint index and clint list global virbles
var clintindx = 0;
var clintlist = [];

function AddItemToTable(Address,BuildingData,Contact1,Contact2,specialRequest,CleaningPerWeek,EstemaitedPrice,Clintkey,Status) /*Add all data takeing from the data base and add it to the html site */
{
  // creating all vairbles for the table
  var tbody1 = document.getElementById("ClintTable");
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
  


  // creating evrey cell in the table
  clintlist.push([Contact1.FirstName,Contact1.LastName,Contact1.PhoneNumber,Contact1.email,
                  Contact2.FirstName,Contact2.LastName,Contact2.PhoneNumber,Contact2.email,
                  Address.City,Address.Street,Address.
                  BuildingNum,BuildingData.Floors,BuildingData.FloorSize,BuildingData.Lobbys,
                  BuildingData.Lobbysize,BuildingData.Windows,BuildingData.ParkingLot,BuildingData.ParkingNum,
                  BuildingData.GarbageRoom,BuildingData.GarbageNum,BuildingData.Garden,BuildingData.GardenNum,
                  BuildingData.ElevatorNum,BuildingData.StairsClean,CleaningPerWeek,specialRequest,EstemaitedPrice,Status,Clintkey]);

  td0.innerHTML = ++clintindx; 
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
  td9.innerHTML ='</br></br></br><button type="button" id="updatebutton" onclick="FillTboxses('+clintindx+')">עדכון/מחיקת לקוח</button></br></br></br></br>';  
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
function FillTboxses(clintindx) /*Filling the empty clint eddit boxes with the clint data */
{
    togglePopup() // open popup for clint edit
    // Getting all data from the HTML 
    var Contact1Change = document.getElementById("Contact1Change");
    var Contact2Change = document.getElementById("Contact2Change");
    var AddressChange = document.getElementById("AddressChange");
    var BuildingDataChange = document.getElementById("BuildingDataChange");
    var specialRequestChange = document.getElementById("specialRequestChange");
    var CleaningPerWeekChange = document.getElementById("CleaningPerWeekChange");
    var EstemaitedPriceChange = document.getElementById("EstemaitedPriceChange");
    var StatusChange = document.getElementById("StatusChange");
    var Clintkey = document.getElementById("key");

    var SaveChangesButton = document.getElementById("SaveChangesButton");

    --clintindx; // the index is 1 more then the array index so we removing one
    // Adding the clint in data to the correct text box 
    Contact1ChangeFirstName.value = clintlist[clintindx][0];
    Contact1LastNameChange.value = clintlist[clintindx][1];
    Contact1PhoneChange.value = clintlist[clintindx][2];
    Contact1MailChange.value = clintlist[clintindx][3];
    Contact2ChangeFirstName.value = clintlist[clintindx][4];
    Contact2LastNameChange.value = clintlist[clintindx][5];
    Contact2PhoneChange.value = clintlist[clintindx][6];
    Contact2MailChange.value = clintlist[clintindx][7];
    CityChange.value = clintlist[clintindx][8];
    StreetChange.value = clintlist[clintindx][9];
    HouseNumChange.value = clintlist[clintindx][10];
    FloorNumChange.value = clintlist[clintindx][11];
    FloorSizeChange.value = clintlist[clintindx][12];
    LobbyNumChange.value = clintlist[clintindx][13];
    LobbySizeChange.value = clintlist[clintindx][14];
    WindowsNumChange.value = clintlist[clintindx][15];
    ParkingLotChange.value = clintlist[clintindx][16];
    ParkingNumChange.value = clintlist[clintindx][17];
    GarbageRoomChange.value = clintlist[clintindx][18];
    GarbageNumChange.value = clintlist[clintindx][19];
    GardenChange.value = clintlist[clintindx][20];
    GardenNumChange.value = clintlist[clintindx][21];
    ElevatorChange.value = clintlist[clintindx][22];
    StairsChange.value = clintlist[clintindx][23];
    CleaningChange.value = clintlist[clintindx][24];
    SpecialRequestChange.value = clintlist[clintindx][25];
    PriceChange.value = clintlist[clintindx][26];
    StatusChange.value = clintlist[clintindx][27];
    Key.value = clintlist[clintindx][28];
    // disable the text box
    Key.disabled = true; 
}


 // Function to toggle the visibility of the popup menu
 function togglePopup() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
}
