
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        "oldPronouns": "",
        "reminderInterval": 1,  // Written in days
        "lastReminder": Date.now(),
        "integrations": {
            "facebook": false,
            "discordStatus": false,
            "github": false
        }
    });
});


// Check if a reminder has to be done

function msToDays(ms) {
    return ms 
        / 1000  // s
        / 60 // m
        / 60 // h
        / 24; // d
}


function CheckForReminder() {
    chrome.storage.sync.get(["reminderInterval", "lastReminder"], (result) => {
        var reminderInterval = result.reminderInterval;
        var lastReminder = result.lastReminder;
    
        console.log(reminderInterval);
        console.log(lastReminder)
        console.log(lastReminder)
    
    
        var daysSinceLastReminder = msToDays(lastReminder - Date.now());
        if (daysSinceLastReminder <= reminderInterval) {
            chrome.tabs.create({
                url: `chrome-extension://${chrome.runtime.id}/app/popup.html`
            });
            chrome.storage.sync.set({
                "lastReminder": Date.now() 
            });
        }
    });
}
// Check for reminder on browser startup
chrome.runtime.onStartup.addListener(() => {
    CheckForReminder();
})
