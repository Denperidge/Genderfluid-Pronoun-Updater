// Facebook url: https://www.facebook.com/profile.php?sk=about_contact_and_basic_info

var gendercode;
var pronouns = "";
var oldPronouns = "";
var integrations = {}


chrome.storage.sync.get(['oldPronouns', 'integrations'], (result) => {
    oldPronouns = result.oldPronouns;
    integrations = result.integrations;
    
    // Make sure at least *one* integration is enabled
    var oneIntegrationEnabled = false;
    var integrationKeys = Object.keys(integrations);
    for (var i = 0; i < integrationKeys.length; i++) {
        if (integrations[integrationKeys[i]] == true) {
            oneIntegrationEnabled = true;
            break;
        } 
    }
    if (!oneIntegrationEnabled) {
        document.getElementById("message").innerText = "You have to enable at least one integration in the options before using this (right-click the extension icon and press options!)"
    }



});

// From the input box, get the main pronoun (the one that one-pronoun services will default to)
function ConfigurePronouns(e) {
    pronouns = e.target.value;  // Example value: (She/They)
    console.log(pronouns)

    var selector = "input[name=mainPronoun][value={0}]";


    try {
// Auto select radiobutton
        var firstPronoun = pronouns.match(/[a-z]+/i)[0];  // Example value: She
        switch (firstPronoun[0].toLowerCase()) {
            case "m":
            case "h":
                selector = selector.replace("{0}", "m");
                break;
            case "f":
            case "z":
            case "s":
                selector = selector.replace("{0}", "f");
                break;
            
            default:
                selector = selector.replace("{0}", "n");
                break;
        }
        $(selector).prop("checked", true);
    }
    catch {
        console.log("Not enough info for autoselecting main pronoun")
    }
    
}

function SetPronouns(e) {
    gendercode = $("input[name='mainPronoun']:checked").val().toLowerCase()[0];
    chrome.storage.sync.get(['oldPronouns'], (result) => {
        oldPronouns = result.oldPronouns;
        if (integrations.facebook) SetOnFacebook();
        if (integrations.discordStatus) SetOnDiscord();
        // Save the newly set pronouns to be able to remove them later
        chrome.storage.sync.set({oldPronouns: pronouns}, () => {
            console.log("Pronouns saved: " + pronouns)
        });
    });
    
    
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
function SetOnFacebook() {
    OpenTab("https://www.facebook.com/profile.php?sk=about_contact_and_basic_info",
        (tab) => {
            fbTabId = tab.id;
        })
   
}

var discordTabId;
function SetOnDiscord() {
    OpenTab("https://discord.com/channels/@me",
        (tab) => {
            discordTabId = tab.id;
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

    console.log(oldPronouns)

    if (tabId == fbTabId) {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            func: FacebookIntegration,
            args: [gendercode]
            
        });
    } else if (tabId == discordTabId) {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            func: DiscordStatusIntegration,
            args: [pronouns, oldPronouns]
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)
    if (message.toLowerCase() == "close") {
        chrome.tabs.remove(sender.tab.id);
    }
});



$("button").click(SetPronouns);
$("input[type='text']").keyup(ConfigurePronouns).click(ConfigurePronouns).blur(ConfigurePronouns);

/*
var pronounButtons = document.getElementsByClassName("pronouns");
for (var i=0; i<pronounButtons.length; i++) {
    pronounButtons[i].addEventListener(SetPronouns)
}
*/
