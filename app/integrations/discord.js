function DiscordIntegration(pronouns) {
    // These are the selectors to be used to find the controls on Discord
    var editGenderButtonSelector = "";
    var editGenderSelectboxSelector= "div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(4) > div:nth-child(2) > div";


    setTimeout(()=>{
        console.log("Clicking edit...")
        document.querySelector(editGenderButtonSelector).click();
        console.log(editGenderButtonSelector);
    }, 500);

}