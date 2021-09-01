// Facebook url: https://www.facebook.com/profile.php?sk=about_contact_and_basic_info

function SetPronouns(e) {
    var mainPronoun = this.value[0].toLowerCase();
    SetOnFacebook(mainPronoun);

}

function SetOnFacebook(mainPronoun) {
    console.log(mainPronoun)
    chrome.tabs.create({
        url: "https://www.facebook.com/profile.php?sk=about_contact_and_basic_info"
    }).then((tab) => {
        var tabId = tab.id;
        
        console.log(tab);
    }, (err) => {
        console.error(err);
    });
    
}



$("button").click(SetPronouns);

/*
var pronounButtons = document.getElementsByClassName("pronouns");
for (var i=0; i<pronounButtons.length; i++) {
    pronounButtons[i].addEventListener(SetPronouns)
}
*/
