function GithubIntegration(pronouns) {
    setTimeout(()=>{
        console.log('test')
        document.getElementById("user_profile_pronouns_select").selectedIndex = 4;
        document.getElementById("user_profile_pronouns_select").dispatchEvent(new Event("change"));
        document.getElementById("user_profile_pronouns").value = pronouns;
        document.getElementsByClassName("Button--primary Button--medium Button")[0].click();
    }, 500);
}