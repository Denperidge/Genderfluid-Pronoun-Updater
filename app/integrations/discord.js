function DiscordStatusIntegration(pronouns, oldPronouns) {
    var loadingscreenSelector = "[class^=ready]";

    // These are the selectors to be used to find the controls on Discord
    var avatarButtonSelector = ".avatar-SmRMf2";

    var statusButtonSelector = "[class*=statusItem]";
    var statusButtonIndex = 4;

    var statusInputSelector = ".inputDefault-_djjkz";

    var saveButtonSelector = "[class^='modalRoot'] button";
    var saveButtonIndex = 3;

    var waitForDiscordLoad = setInterval(()=>{
        if (document.querySelector(loadingscreenSelector) == null) {
            SetStatus();
            clearInterval(waitForDiscordLoad);
        }
    }, 500)

    function SetStatus() {
        setTimeout(()=>{
            console.log("Clicking avatar...")
            document.querySelector(avatarButtonSelector).click();
            setTimeout(() => {
                console.log("Clicking custom status button...")
                document.querySelectorAll(statusButtonSelector)[statusButtonIndex].click();
                setTimeout(() => {
                    console.log("Setting input value...");
                    var input = document.querySelector(statusInputSelector);

                    var oldValue = input.value;

                    var newValue = oldValue + " " + pronouns;

                    // React input solution from https://stackoverflow.com/a/46012210
                    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                    nativeInputValueSetter.call(input, newValue);

                    var ev2 = new Event('input', { bubbles: true});
                    input.dispatchEvent(ev2);

                    setTimeout(() => {
                        console.log(document.querySelectorAll(saveButtonSelector)[saveButtonIndex])
                        document.querySelectorAll(saveButtonSelector)[saveButtonIndex].click();
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }


}