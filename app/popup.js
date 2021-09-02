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
    if (tabId != fbTabId) {
        console.log("Updated, but not facebook")
        return;
    }

    console.log(changeInfo.status)

    if (changeInfo.status != "complete") {
        console.log("Updated, but not complete: " + changeInfo.status)
        return;
    }

    console.log("Facebook complete!")

    console.log(gendercode)


    
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: FacebookIntegration,
        args: [gendercode]
        
    });


    return;
    chrome.scripting.executeScript({
        target: {"tabId": tabId},
        files: ["/app/integrations/facebook.js"]//,
        //args: [ gendercode ]
    });
    
    console.log(tab);
});



$("button").click(SetPronouns);

/*
var pronounButtons = document.getElementsByClassName("pronouns");
for (var i=0; i<pronounButtons.length; i++) {
    pronounButtons[i].addEventListener(SetPronouns)
}
*/
