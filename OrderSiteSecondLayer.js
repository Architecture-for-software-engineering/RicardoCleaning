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

function pullinfo()   //  pulling all info about the clint from HTML and retuning it the the function who asked for it
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

function ordernow()
{
    // Checking if correct inputs 
    var Badinputprices = checkPrice();
    if (Badinputprices != "")
    {
      return;
    }
    var Badinputcontact = checkInfo();
    if (Badinputcontact != "")
    {
      return;
    }
    // Calling the function who write all data in to the database
    WriteNewClient();
    alert("ניצור איתך קשר בקרוב ☺");

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

  function checkPrice()
  {
      /*Declaring variables and resetting the alertMsg variable*/ 
      var floorNum = document.getElementById('floorNum').value;
      var floorSize = document.getElementById('floorSize').value;
      var alertMsg="";
      /* 
      isNaN is a funcntion which checks: if a variable isnt a number - returns true, if it is a number - returns false (will appear a lot in the code).
      Checking for correct input in the floorNum variable
      */
      if (isNaN(floorNum)||floorNum<1||floorNum>15)
      {
          alertMsg = alertMsg + "במספר הקומות, אנא הכנס מספר בין 1 ל15\n";
      }
      
      /*Checking for correct input in the floorSize variable*/
      if(floorSize=="Empty")
      {
          alertMsg = alertMsg+"אנא בחר גודל עבור קומה\n"
      }
      
      /*Declaring and checking for correct input in the lobbyNum variable*/
      var lobbyNum = document.getElementById('lobbyNum').value;
      if (isNaN(lobbyNum)||lobbyNum<1||lobbyNum>2)
      {
          alertMsg = alertMsg + "במספר הלובים, אנא הכנס מספר בין 1 ל 2 \n";
      }
  
      /*Declaring and checking for correct input in the lobbySize variable*/
      var lobbySize = document.getElementById('lobbySize').value;
      if(lobbySize=="Empty")
      {
          alertMsg = alertMsg + "אנא בחר גודל לובי\n";
      }
  
      /*Declaring and checking for correct input in the windowsNum variable*/
      var windowsNum = document.getElementById('windowsNum').value;
      if(windowsNum=="Empty")
      {
          alertMsg=alertMsg+"אנא בחר כמות חלונות\n";
      }
  
      /*Declaring and checking for correct input in the parkingNum variable if there is Parking in the Building*/
      var parkingLot = document.getElementById('parkingLot').value;
      var parkingNum = document.getElementById('parkingNum').value;
      if(parkingLot=="Yes")
      {
      if (isNaN(parkingNum)||parkingNum<1||parkingNum>3)
      {
          alertMsg = alertMsg + "בכמות החניות, אנא הכנס מספר בין 1 ל3 \n";
      }
      }
  
      /*Declaring and checking for correct input in the garbageNum variable if there is Garbage room in the Buidling*/
      var garbageRoom = document.getElementById('garbageRoom').value;
      var garbageNum = document.getElementById('garbageNum').value;
      if(garbageRoom=="Yes"){
      if(isNaN(garbageNum)||garbageNum<1||garbageNum>3)
      {
          alertMsg = alertMsg + "בכמות חדרי האשפה, אנא הכנס מספר בין 1 ל3 \n";
      }
      }
  
      /*Declaring and checking for correct input in the gardenNum variable if there is garden in the building*/
      var garden = document.getElementById('garden').value;
      var gardenNum = document.getElementById('gardenNum').value;
      if(garden=="Yes"){
      if(isNaN(gardenNum)||gardenNum<1||gardenNum>2)
      {
          alertMsg = alertMsg + "בכמות הגינות, אנא הכנס מספר בין 1 ל 2 \n";
      }
      }
      /*Declaring and checking for correct input in the elevatorNum variable*/
      var elevatorNum=document.getElementById('elevatorNum').value;
      if(isNaN(elevatorNum)||elevatorNum<0||elevatorNum>4)
      {
          alertMsg = alertMsg + "בכמות המעליות, אנא הכנס מספר בין 0 ל 4 \n";
      }
  
      /*
      querySelector is a function that returns the first element within the document that matches the specified selector (or group of selectors), returns null if no matches are found (no choice was made)
      Declaring and checking for correct input in the cleaningFrequency variable
      */
      var cleaningFrequency = document.querySelector('input[name="cleaningFrequency"]:checked');
      if (cleaningFrequency === null) 
      {
          alertMsg = alertMsg + "בתדירות הניקיון, אנא בחר מספר מבין האפשרויות\n";
      }
  
      /*Printing a pop-up alert if any of the inputs was wrong or illegal*/
      if(alertMsg!='')
      {
          alert(alertMsg);
      }
      return alertMsg;
  }


  function checkInfo()
  {
      /*Declaring and resetting the alertMsg variable*/
      var alertMsg="";
      /*
      abc is a variable which contains English and Hebrew letters only.
       \u0590-\u05FF represents the unicode of Hebrew letters.
       ^-asserts the start of a string
       $-asserts the end of string
       test is a function that matches patterns in (the string), making sure it contains only the chars which were asserted. If there's only asserted chars in the given pattern - returns true, else - returns false. 
      */
      var abc = /^[a-zA-Z\u0590-\u05FF]+$/;
  
      /*Declaring and checking for correct input in the street variable*/
      var street=document.getElementById('street').value;
      if(!abc.test(street))
      {
          alertMsg = alertMsg + "ברחוב, אנא רשום שם רחוב (ללא סימנים מיוחדים)\n";
      }
  
      /*Declaring and checking for correct input in the buildingNum variable*/
      var buildingNum=document.getElementById('buildingNum').value;
      if(isNaN(buildingNum)||buildingNum<1||buildingNum>999)
      {
          alertMsg = alertMsg + "במספר הבניין, אנא רשום מספר (ספרות בלבד)\n";
      }
  
      /*Declaring and checking for correct input in the fName1 variable*/
      var fName1=document.getElementById('fName1').value;
      if(!abc.test(fName1))
      {
          alertMsg = alertMsg + "בשם פרטי לקוח1, אנא רשום שם פרטי (ללא סימנים מיוחדים)\n";
      }
  
      /*Declaring and checking for correct input in the lName1 variable*/
      var lName1=document.getElementById('lName1').value;
      if(!abc.test(lName1))
      {
          alertMsg = alertMsg + "בשם משפחה לקוח1, אנא רשום שם פרטי (ללא סימנים מיוחדים)\n";
      }
  
      /*Declaring and checking for correct input in the phone1 variable*/
      var phone1=document.getElementById('phone1').value;
      if(isNaN(phone1)||phone1<1000000||phone1>9999999999)
      {
          alertMsg = alertMsg + "במספר הטלפון לקוח1, אנא רשום מספר (10 ספרות בלבד)\n";
      }
  
      /*
      mailtst is a variable that matches the pattern of email addresses worldwide.
      ^ asserts the start of the string:
          - The string can start with letters, numbers, underscore (_), or hyphen (-).
      @ represents the mandatory "@" character.
          - After "@" we expect letters and numbers.
      . represents the mandatory dot in the domain part of the email:
          - The dot must be followed by letters and numbers.
      $ asserts the end of the string.
      Example: "user123@example.com" is a valid email matching this pattern.
      */
      var mailtst = /^[a-zA-Z0-9_\-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
      /*Declaring and checking for correct input in the email1 variable*/
      var email1=document.getElementById('email1').value;
      if(!mailtst.test(email1))
      {
          alertMsg = alertMsg + "באימייל לקוח1, אנא הקפד על פורמט נכון (ללא סימנים מיוחדים)\n";
      }
  
      /*Declaring and checking for correct input in the fName2 variable*/
      var fName2=document.getElementById('fName2').value;
      if(!abc.test(fName2))
      {
          alertMsg = alertMsg + "בשם פרטי לקוח2, אנא רשום שם פרטי (ללא סימנים מיוחדים)\n";
      }
  
      /*Declaring and checking for correct input in the lName2 variable*/
      var lName2=document.getElementById('lName2').value;
      if(!abc.test(lName2))
      {
          alertMsg = alertMsg + "בשם משפחה לקוח2, אנא רשום שם פרטי (ללא סימנים מיוחדים)\n";
      }
  
      /*Declaring and checking for correct input in the phone2 variable*/
      var phone2=document.getElementById('phone2').value;
      if(isNaN(phone2)||phone2<1000000||phone2>9999999999)
      {
          alertMsg = alertMsg + "במספר הטלפון לקוח2, אנא רשום מספר (10 ספרות בלבד)\n";
      }
  
      /*Declaring and checking for correct input in the email1 variable*/
      var email2=document.getElementById('email2').value;
      if(!mailtst.test(email2))
      {
          alertMsg = alertMsg + "באימייל לקוח2, אנא הקפד על פורמט נכון (ללא סימנים מיוחדים)\n";
      }

      /*checking if the same phone number was written twice */
      if(phone1==phone2)
      {
          alertMsg = alertMsg + "אנא שים לב הכנסת פעמיים את אותו מספר טלפון\n";
      }
      /*checking if the same Mail address was written twice */
      if(email2==email1)
      {
          alertMsg = alertMsg + "אנא שים לב הכנסת פעמיים את אותו המייל\n";
      }
      /*Printing a pop-up alert if any of the inputs was wrong or illegal*/
      if(alertMsg!='')
      {
          alert(alertMsg);
      }
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
  var Badinputprices = checkPrice();
  if (Badinputprices != "")
  {
    return;
  }
  var sum=calc_sum();
  var msg=" המחיר הוא"+" "+sum+" "+"שקלים ";
  document.getElementById('priceResult').innerHTML = msg;

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
//-----------------------------------------------------------------------------------------------------
/*function to open the window of the login */
function openLoginModal() 
{
  document.getElementById("loginModal").style.display = "block";
}
/*function to close the window of the login */
function closeLoginModal() 
{
  document.getElementById("loginModal").style.display = "none";
}
/*function for the login button if the user puts the correct password and username we are redirected to the admin site 
the event.preventDefault is to stop the refresh of the site when we put the username and the password*/
function submitLoginForm(event) 
{
  event.preventDefault();
  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value.trim();
    if (username === "Admin" && password === "Admin") 
    {
      window.open("AdminSite.html", "_blank");
    } 
    else 
    {
        alert("Incorrect username or password.");
    }
}