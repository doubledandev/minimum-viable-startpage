const NAME = "Dan";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format. 
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = 'tab' 

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
    {
        "groupName": "Social",
        "items":[
            {"name": "Telegram", "shortcutKey": "t", "url": "https://web.telegram.org/a"},
            {"name": "Gmail", "shortcutKey": "g", "url": "https://mail.google.com/mail/u/0/#inbox"},
            {"name": "Ozon", "shortcutKey": "z", "url": "https://www.ozon.ru"},
            {"name": "VK", "shortcutKey": "v", "url": "https://vk.com/im"}
        ]
    },
    {
        "groupName": "Working",
        "items":[
            {"name": "ChatGPT", "shortcutKey": "a", "url": "https://chat.openai.com"},
            {"name": "GitHub", "shortcutKey": "h", "url": "https://github.com/doubledandev"}
        ]
    },
    {
        "groupName": "Study",
        "items":[
            {"name": "Balonin", "shortcutKey": "b", "url": "http://livelab.spb.ru"},
            {"name": "GUAP", "shortcutKey": "u", "url": "https://pro.guap.ru/inside/profile"}
        ]
    },
    {
        "groupName": "PirateBay",
        "items":[
            {"name": "Rutracker", "shortcutKey": "r", "url": "https://rutracker.org"},
            {"name": "NoNaMe", "shortcutKey": "n", "url": "https://nnmclub.to/forum/tracker.php"},
            {"name": "Flibusta", "shortcutKey": "f", "url": "https://flibusta.is"}
        ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){
    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();
