// Facebook url: https://www.facebook.com/profile.php?sk=about_contact_and_basic_info

var gendercode;  // Code of the gender to be used when only one pronoun can be selected
var pronouns = "";  // Full text of pronouns when they're allowed to be set
var oldPronouns = "";  // Previous full text to be removed from any nickname/textbox
var integrations = {}  // Enabled integrations: key is the service name, value is boolean of whether its enabled


// From the storage, get old pronouns and enabled integrations
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
    // If the above isn't the case, then the pronoun changer doesn't work. So give a heads up with instructions
    if (!oneIntegrationEnabled) {
        document.getElementById("message").innerText = "You have to enable at least one integration in the options before using this (right-click the extension icon and press options!)"
    }



});

// From the input box, try to get the main pronoun (the one that one-pronoun services will default to, assigned to gendercode variable)
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
$("input[type='text']").keyup(ConfigurePronouns).click(ConfigurePronouns).blur(ConfigurePronouns);


// Once the user has selected a main pronoun and wrote out the fulltext pronouns, this function will set them
function SetPronouns(e) {
    // Get gendercode from selected radio button
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
$("button").click(SetPronouns);

// Requests permission, opens the tab, and runs the callback with the tab object
function OpenTab(url, callback) {
    // TODO check if permission has already been granted
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


// Functions to open {website} and save its tab id
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

/* Used during debug
chrome.tabs.onActivated.addListener((activationInfo) => {
    
    if (activationInfo.tabId != fbTabId) {
        return;
    }
    console.log("Activate: " + activationInfo.tabId)
});
*/

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Whether an action has to be undertook or not, it requires the tab to be done loading
    if (changeInfo.status != "complete") {
        /* Used during debugging
        console.log("Updated, but not complete");
        console.log(tab);
        console.log(changeInfo);
        */
        return;
    }

    console.log("Previous pronouns to remove: " + oldPronouns)

    // TODO the following can be written a lot more efficiently
    // If facebook is done loading, run facebook script
    if (tabId == fbTabId) {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            func: FacebookIntegration,
            args: [gendercode]
            
        });
    } 
    // If discord is done loading, run discord script
    else if (tabId == discordTabId) {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            func: DiscordStatusIntegration,
            args: [pronouns, oldPronouns]
        });
    }
});

// Listen for a message from opened tabs, for when to close the tab in question
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    /* Used during debugging
    console.log(message)
    console.log(sender)
    */
    if (message.toLowerCase() == "close") {
        chrome.tabs.remove(sender.tab.id);
    }
});
