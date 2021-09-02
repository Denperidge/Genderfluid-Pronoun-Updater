// Facebook url: https://www.facebook.com/profile.php?sk=about_contact_and_basic_info

var gendercode;
function SetPronouns(e) {
    gendercode = this.value[0].toLowerCase();
    /*chrome.permissions.request({
        permissions: ["scripting"],
        origins: ["https://www.facebook.com/"]});*/
    SetOnFacebook(gendercode);

}

var fbTabId;
function SetOnFacebook(gendercode) {
    chrome.permissions.request({
        origins: ["https://www.facebook.com/profile.php"]
    }, (granted) => {
        console.log(granted)
        if (!granted) {
            console.error("EYRTDG");
            return;
        } else {
            console.error("YAY");
        }

        console.log(gendercode)
        chrome.tabs.create({
            url: "https://www.facebook.com/profile.php?sk=about_contact_and_basic_info"
        }).then((tab) => {
            fbTabId = tab.id;

            
        }, (err) => {
            console.error(err);
        });    
    });

   
}

chrome.tabs.onActivated.addListener((activationInfo) => {
    
    if (activationInfo.tabId != fbTabId) {
        return;
    }
    console.log("Activate: " + activationInfo.tabId)
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // Whether an action has to be undertook or not, it requires the tab to be done loading
    if (changeInfo.status != "complete") {
        console.log("Updated, but not complete");
        console.log(tab);
        console.log(changeInfo);
        return;
    }

    if (tabId == fbTabId) {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            func: FacebookIntegration,
            args: [gendercode]
            
        });
    }
});



$("button").click(SetPronouns);

/*
var pronounButtons = document.getElementsByClassName("pronouns");
for (var i=0; i<pronounButtons.length; i++) {
    pronounButtons[i].addEventListener(SetPronouns)
}
*/
