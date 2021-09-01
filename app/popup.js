// Facebook url: https://www.facebook.com/profile.php?sk=about_contact_and_basic_info

function SetPronouns(e) {
    var gendercode = this.value[0].toLowerCase();
    /*chrome.permissions.request({
        permissions: ["scripting"],
        origins: ["https://www.facebook.com/"]});*/
    SetOnFacebook(gendercode);

}

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
            let tabId = tab.id;
    
            /*
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                func: () => {
                    var gendercode = "n";
                }
            });
            */
    
    
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                files: ["/app/integrations/facebook.js"]//,
                //args: [ gendercode ]
            });
            
            console.log(tab);
        }, (err) => {
            console.error(err);
        });    
    });

   
}



$("button").click(SetPronouns);

/*
var pronounButtons = document.getElementsByClassName("pronouns");
for (var i=0; i<pronounButtons.length; i++) {
    pronounButtons[i].addEventListener(SetPronouns)
}
*/
