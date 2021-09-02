// Facebook url: https://www.facebook.com/profile.php?sk=about_contact_and_basic_info

var gendercode;
function SetPronouns(e) {
    gendercode = this.value[0].toLowerCase();
    /*chrome.permissions.request({
        permissions: ["scripting"],
        origins: ["https://www.facebook.com/"]});*/
    SetOnFacebook(gendercode);

}

// Requests permission, opens the tab, and runs the callback with the tab object
function OpenTab(url, callback) {
    chrome.permissions.request({
        origins: [url]
    }, (granted) => {
        if (!granted) {
            console.error("Permission for url not granted!");
            callback(false);
        }

        chrome.tabs.create({
            url: url
        }).then((tab) => {
            callback(tab)
        }, (err) => {
            console.error(err);
        });    
    });
}


var fbTabId;
function SetOnFacebook(gendercode) {
    OpenTab("https://www.facebook.com/profile.php?sk=about_contact_and_basic_info",
        (tab) => {
            fbTabId = tab.id;
        })
   
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
