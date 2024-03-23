/* 
    This file is the connecting JS between the First layer(HTML) and
    the Third layer (Js file that makeing contact with the data base) 
*/

// remove spaces before and after str
function trim (str){ // remove spaces before and after str
  return str.replace (/^\s+|\s+$/g, '');
}

function cleanForm() // Reset the from
{
document.getElementById("formId").reset();
document.getElementById('priceResult').innerHTML =""
}

function scrollToForm() // scroll to from 
{
document.getElementById('formDiv').scrollIntoView();
}

function YesShowNoHide(elem,id,row) // Show or hide elements base on selected item and add a empty row in its place
{
if(elem.value == "Yes"){
  document.getElementById(id).style.display = 'block'; 
  document.getElementById(row).style.display = 'none';
}else{
  document.getElementById(id).style.display = "none";
  document.getElementById(row).style.display = 'block';
} 
}

function pullinfo()   //  pulling all info about the client from HTML and retuning it the the function who asked for it
{
var esemitedprice =calc_sum();
var floorNum = document.getElementById('floorNum').value; 
var floorSize = document.getElementById('floorSize').value;
var lobbyNum = document.getElementById('lobbyNum').value;
var lobbySize = document.getElementById('lobbySize').value;
var windowsNum = document.getElementById('windowsNum').value;
var parkingLot = document.getElementById('parkingLot').value;
var parkingNum = document.getElementById('parkingNum').value;
var garbageRoom = document.getElementById('garbageRoom').value;
var garbageNum = document.getElementById('garbageNum').value;
var garden = document.getElementById('garden').value;
var gardenNum = document.getElementById('gardenNum').value;
var onceAWeek = document.getElementById('onceAWeek').checked;
var twiceAWeek = document.getElementById('twiceAWeek').checked;
var ThreeAWeek = document.getElementById('ThreeAWeek').checked;
var CleaningPerWeek = onceAWeek ? "פעם בשבוע" : (twiceAWeek ? "פעמיים בשבוע" : (ThreeAWeek ? "שלוש פעמים בשבוע" : "לא סומן (צריך לבדוק)"));
var city = document.getElementById('city').value;
var street = document.getElementById('street').value;
var buildingNum = document.getElementById('buildingNum').value;
var fName1 = document.getElementById('fName1').value;
var lName1 = document.getElementById('lName1').value;
var phone1 = document.getElementById('phone1').value;
var email1 = document.getElementById('email1').value;
var fName2 = document.getElementById('fName2').value;
var lName2 = document.getElementById('lName2').value;
var phone2 = document.getElementById('phone2').value;
var email2 = document.getElementById('email2').value;
var elevatorNum = document.getElementById('elevatorNum').value;
var stairsClean = document.getElementById('stairsClean').value;
var specialRequest = document.getElementById('specialRequest').value.trim();
if (specialRequest === '') {
  specialRequest = "אין בקשות מיוחדות";
}
  return { fName1 : fName1 ,lName1 : lName1,phone1 : phone1,email1 : email1,
           fName2 : fName2,lName2 : lName2, phone2 : phone2,email2 : email2,
           city: CityTranslate(city),street : street,buildingNum : buildingNum,
           floorNum : floorNum,floorSize : TranslateYesNoMediumLarge(floorSize), lobbyNum : lobbyNum,lobbySize : TranslateYesNoMediumLarge(lobbySize),
           windowsNum : TranslateYesNoMediumLarge(windowsNum), parkingLot : TranslateYesNoMediumLarge(parkingLot),parkingNum : parkingNum,
           garbageRoom : TranslateYesNoMediumLarge(garbageRoom),garbageNum : garbageNum ,garden : TranslateYesNoMediumLarge(garden),gardenNum : gardenNum,
           elevatorNum : elevatorNum,stairsClean : TranslateYesNoMediumLarge(stairsClean),CleaningPerWeek : CleaningPerWeek,
           specialRequest : specialRequest ,esemitedprice : esemitedprice}
}

//The function is adapter between firebase class to the html
function myWriteNewClient()
{
  var myfb = new MyFirebase()
  myfb.WriteNewClient()
}

// checkPrice => return string; write_price => print alert; 
function ordernow() {
// Checking if correct inputs 
checkPrice().then(function(badInputPrices) {
checkInfo().then(function(badInputContact) {
    if ((badInputPrices != "")||(badInputContact != "")) {
      alert(badInputPrices+'\n'+badInputContact);
      return;
    }

    // Calling the function to write all data into the database
    myWriteNewClient();     
    alert("ניצור איתך קשר בקרוב ☺");
  });
});
}

function TranslateYesNoMediumLarge(str) /*Trunstlaeing statments to hebrew */
{
if (str==='Yes')
{
  return 'כן';
}
if (str==='No')
{
  return 'לא';

}
if (str==='Medium')
{
  return 'בינוני';
}
if (str==='Large')
{
  return 'גדול';
}
return str
}

function CityTranslate(str) /*Trunstlaeing statments to hebrew */
{
if (str === 'Akko')
{
  return 'עכו';
}
if (str ===  'Nahariya')
{
  return 'נהריה';
}
return str;
}

/*
The function cycle between photos in the main page
The time between each slide is determined in the last line of the function
*/
function showSlides() {
var i;
var slides = document.getElementsByClassName("mySlides");
for (i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}
slideIndex++;
if (slideIndex > slides.length) {slideIndex = 1}
slides[slideIndex-1].style.display = "block";
setTimeout(showSlides, 3000); // Change image every 3 seconds
} 

/*This function replaces the previous input check functions, it now works based on a variation of ADT formatting
with an implication of multi-threading simulation*/
async function checkPrice() { 
  var alertMsg = "";

  async function checkInput(id, min, max, errorMessage) {
      const value = document.getElementById(id).value;
      if (isNaN(value) || value < min || value > max) {
          alertMsg += errorMessage + "\n";
      }
  }

  async function checkSelection(id, errorMessage) {
      const value = document.getElementById(id).value;
      if (value === "Empty") {
          alertMsg += errorMessage + "\n";
      }
  }

  async function checkOptionalInput(condition, id, min, max, errorMessage) {
      const optionValue = document.getElementById(condition).value;
      if (optionValue === "Yes") {
          await checkInput(id, min, max, errorMessage);
      }
  }

  async function checkCleaningFrequency() {
      const cleaningFrequency = document.querySelector('input[name="cleaningFrequency"]:checked');
      if (!cleaningFrequency) {
          alertMsg += "בתדירות הניקיון, אנא בחר מספר מבין האפשרויות\n";
      }
  }

  await Promise.all([
      checkInput('floorNum', 1, 15, "במספר הקומות, אנא הכנס מספר בין 1 ל15"),
      checkSelection('floorSize', "אנא בחר גודל עבור קומה"),
      checkInput('lobbyNum', 1, 2, "במספר הלובים, אנא הכנס מספר בין 1 ל 2"),
      checkSelection('lobbySize', "אנא בחר גודל לובי"),
      checkSelection('windowsNum', "אנא בחר כמות חלונות"),
      checkOptionalInput('parkingLot', 'parkingNum', 1, 3, "בכמות החניות, אנא הכנס מספר בין 1 ל3"),
      checkOptionalInput('garbageRoom', 'garbageNum', 1, 3, "בכמות חדרי האשפה, אנא הכנס מספר בין 1 ל3"),
      checkOptionalInput('garden', 'gardenNum', 1, 2, "בכמות הגינות, אנא הכנס מספר בין 1 ל 2"),
      checkInput('elevatorNum', 0, 4, "בכמות המעליות, אנא הכנס מספר בין 0 ל 4"),
      checkCleaningFrequency()
  ]);

  return alertMsg;
}

/*This function replaces the previous input check functions, it now works based on a variation of ADT formatting
with an implication of multi-threading simulation*/
async function checkInfo(){ 
  var alertMsg = "";

  async function checkInputName(id,errorMessage) {
      const value = document.getElementById(id).value;
      var abc = /^[a-zA-Z\u0590-\u05FF]+$/;
      if(!abc.test(value))
    {
      alertMsg += errorMessage + "\n";
      }
  }

  async function checkInputNum(id, min, max, errorMessage) {
      const value = document.getElementById(id).value;
      if (isNaN(value) || value < min || value > max) {
          alertMsg += errorMessage + "\n";
      }
  }
  async function checkInputMail(id,errorMessage) {
      const value = document.getElementById(id).value;
      var mailtst = /^[a-zA-Z0-9_\-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(!mailtst.test(value))
      alertMsg += errorMessage + "\n";
  }

  async function checkDuplicatePhones(id1,id2,errorMessage) {
    const value1 = document.getElementById(id1).value;
    const value2 = document.getElementById(id2).value;
    if(value1==value2)
    {
        alertMsg += errorMessage + "\n";
    }
  }
  async function checkDuplicateEmails(id1,id2,errorMessage) {
      const value1 = document.getElementById(id1).value;
      const value2 = document.getElementById(id2).value;
      if(value1==value2)
      {
          alertMsg += errorMessage + "\n";
      }
  }


  await Promise.all([
      checkInputName('street',"ברחוב, אנא רשום שם רחוב (ללא סימנים מיוחדים)"),
      checkInputNum('buildingNum',1,999,"במספר הבניין, אנא רשום מספר (ספרות בלבד)"),
      checkInputName('fName1',"בשם פרטי לקוח 1 אנחנו הזן שם פרטי ללא סימנים מיוחדים"),
      checkInputName('lName1',"בשם משפחה לקוח 1 אנחנו הזן שם משפחה ללא סימנים מיוחדים"),
      checkInputNum('phone1',1,9999999999,"במספר טלפון לקוח 1 אנא הזן מספר בעל 10 ספרות לכל היותר"),
      checkInputMail('email1',"באימייל לקוח 1, אנא הקפד על פורמט נכון (ללא סימנים מיוחדים)"),
      checkInputName('fName2',"בשם פרטי לקוח 2 אנחנו הזן שם פרטי ללא סימנים מיוחדים"),
      checkInputName('lName2',"בשם משפחה לקוח 2 אנחנו הזן שם משפחה ללא סימנים מיוחדים"),
      checkInputNum('phone2',1,9999999999,"במספר טלפון לקוח 2 אנא הזן מספר בעל 10 ספרות לכל היותר"),
      checkInputMail('email2',"באימייל לקוח 2, אנא הקפד על פורמט נכון (ללא סימנים מיוחדים)"),
      checkDuplicatePhones('phone1','phone2',"אנא שים לב הכנסת פעמיים את אותו מספר טלפון"),
      checkDuplicateEmails('email1','email2',"אנא שים לב הכנסת פעמיים את אותו המייל")
  ]);

  
  return alertMsg;
  
}

function calc_sum(){

var sum=0;
  /*getting the values of the number of floor and the size of floor
and calculating the sum of payment on the work of them.*/

var num_of_floors=document.getElementById('floorNum').value;
var size_of_floor=document.getElementById('floorSize').value;
var floor_mult=(size_of_floor==='Medium')? 100 :(size_of_floor==='Large') ?120 : 0;
sum+=num_of_floors*floor_mult;

/*
getting the values of the number of lobbies and the size of a lobby
and calculating the sum of payment on the work of them and adds to the sum.
*/
var num_of_lobbies=document.getElementById('lobbyNum').value;
var size_of_lobby=document.getElementById('lobbySize').value;
var lobby_mult=(size_of_lobby==='Medium')? 200 :(size_of_lobby==='Large') ?300 : 0;
sum+=num_of_lobbies*lobby_mult;

/*
getting the values of the number of windows and calculating the sum of
payemnt of the work on them and adds to the sum. 
*/
var num_of_windows=document.getElementById('windowsNum').value;
var window_mult=(num_of_windows ==='Medium') ? 1.2 :(num_of_windows === 'Large') ? 1.5 :1;
sum*=window_mult;

/*
getting the values of the exitence of a parking lot and its size
if there is one, calculates the sum of payment of the work on it and adds to the sum.
*/
var is_there_parkinglot=document.getElementById('parkingLot').value;
if(is_there_parkinglot.trim()==="Yes")
{
    var parking_size=document.getElementById('parkingNum').value;
    sum+=parking_size*150;
}

/*
getting the values of the exitence of a garbage room and its size
if there is one, calculates the sum of payment of the work on it and adds to the sum.
*/
var is_there_garbageroom=document.getElementById('garbageRoom').value;
if(is_there_garbageroom.trim()==="Yes")
{
    var garbage_size=document.getElementById('garbageNum').value;
    sum+=100*garbage_size;
}

 /*
getting the values of the exitence of a garden and its size
if there is one, calculates the sum of payment of the work on it and adds to the sum.
*/
var is_there_garden=document.getElementById('garden').value;
if(is_there_garden.trim()=="Yes")
{
    var garden_size=document.getElementById('gardenNum').value;
    sum+=garden_size*100;
    
}

/*
getting the number of elevators and adds to the total payment 50 ils per elevator;
*/
var num_of_elevators=document.getElementById('elevatorNum').value;
sum+=num_of_elevators*50;

var stairs_clean=document.getElementById("stairsClean").value;
if(stairs_clean === 'Yes')
{
    stairs_price=(num_of_floors<7 && num_of_floors >1) ?100: (num_of_floors>15) ?150 :0;
    sum+=stairs_price;
}

/*
getting the frequency of cleaning and updating the payment according to it.
*/
var once=document.getElementById('onceAWeek').checked;
var twice=document.getElementById('twiceAWeek').checked;
var three=document.getElementById('ThreeAWeek').checked;
var freq=once? 0.8 : (twice ? 1: (three ? 2 : 0));
sum *=freq;
return sum;


}
//function that prints the calls the function to calculate the sum of payments and prints in in the site
function write_price(){
// Checking if correct inputs for prices
checkPrice().then(function(Badinputprices) {
  if (Badinputprices != "") {
    alert(Badinputprices);
    return;
  }
  var sum = calc_sum();
  var msg = " המחיר הוא"+" "+sum+" "+"שקלים ";
  document.getElementById('priceResult').innerHTML = msg;
});
}

//function that enable the submit button after the capcha has been completed
function recaptchaCallback() {
document.getElementById("submitButton").removeAttribute('disabled');
};

//function that disable the submit button until the capcha has been completed
function disableButton() {
document.getElementById("submitButton").setAttribute('disabled', '');
} 

// Function to toggle the visibility of the popup menu
function togglePopupForm() {
var overlay = document.getElementById("overlayForm");
overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
}

/*function to open the window of the login */
function openLoginModal() 
{
document.getElementById("loginModal").style.display = "block";
}
/*function to close the window of the login */
function closeLoginModal() 
{
document.getElementById("loginForm").reset();
document.getElementById("loginModal").style.display = "none";
}
/*function for the login button if the user puts the correct password and username we are redirected to the admin site 
the event.preventDefault is to stop the refresh of the site when we put the username and the password*/
function submitLoginForm(event) 
{
event.preventDefault();
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
  if (username === "Admin" && password === "Admin") 
  {
    window.open("AdminSite.html", "_blank");
  } 
  else 
  {
      alert("Incorrect username or password.");
  }
  document.getElementById("loginForm").reset();
  closeLoginModal();
}