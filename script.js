// --- 1. THE DEVOTIONAL DATA ---
// I have added <span class="footnote" data-note="...">HTML</span> to the text to demonstrate the Rams footnote style.
const devotionals = [
{
day: 1,
title: "Day 1: The Ear That Never Sleeps",
scriptureRef: "Nehemiah 1:6; Psalm 121:3–4; Luke 18:1–8",
scripture: "“Let your ear be attentive and your eyes open, to hear the prayer of your servant that I now pray before you day and night.” — Nehemiah 1:6",
reflection: `
<p>Nehemiah was in the <span class="footnote" data-note="The palace of Artaxerxes I in Susa. The Persian kings were considered divine and access was strictly controlled.">palace</span>. The palace ran on a schedule. The king’s schedule. The wine at the appointed hour. The court at the appointed hour. The night watch. The morning ritual. A man who served the king did not have his own rhythm. He moved when the king moved.</p>
<p>And yet Nehemiah prayed day and night. Not in a quiet room. In the rhythm of the empire. Between the cups. Between the corridors. Between the tasks. He did not wait for a free hour. He made the hour free by refusing to stop praying.</p>
<p>“He will not let your foot be moved; he who keeps you does not slumber.” — Psalm 121:3–4. The One he prayed to never sleeps. The One he served on earth slept. Artaxerxes was a man. He tired. He retired. He was unavailable for hours. The God of heaven was not. And Nehemiah knew it. The ear of heaven was more reliable than the ear of Persia.</p>
<p>The Messiah told the parable of the persistent widow for a reason. Not because Adonai is reluctant. Because His people are. The enemy’s strategy against the wall was not primarily military. It was attrition. Weariness. The slow death of constant prayer. If he cannot stop the prayer, he will exhaust the pray-er.</p>
<p>Nehemiah did not let the palace exhaust his prayer. He let his prayer outlast the palace.</p>
`,
questions: `
<li><strong>Cognitive:</strong> What is your prayer rhythm? Not your intention. Your actual rhythm. Does it survive your schedule, or does your schedule survive it?</li>
<li><strong>Structural:</strong> What in your life is designed to make prayer impossible—the commute, the notifications, the hours? Who built that structure?</li>
<li><strong>Heart:</strong> Have you grown weary? When did you stop praying day and night and start praying only when the crisis demanded it?</li>
`,
prayer: "Abba, You neither slumber nor sleep. I do both. I tire. I quit. I let the schedule of the empire set the schedule of my prayer. Forgive me. Teach me to pray in the palace. Teach me to outlast the weariness. Let my prayer be day and night, not crisis and silence. Amen.",
tactical: "Write down your actual weekly schedule. Mark three fixed moments each day—morning, midday, evening—for prayer. Put them in your calendar as appointments with the King. Keep them for seven days, regardless of how you feel."
},
{
day: 2,
title: "Day 2: The House That Also Sinned",
scriptureRef: "Nehemiah 1:6; Exodus 20:5–6; Lamentations 5:7",
scripture: "“Even I and my father's house have sinned.” — Nehemiah 1:6",
reflection: `
<p>This is the sentence that cost Nehemiah everything. He did not have to say it. He was not in Jerusalem. He was not an exile in Babylon. He was a successful man in the Persian court, a Jew who had risen. He could have prayed, “They have sinned.” It would have been accurate. It would have been safe.</p>
<p>He said, “I and my father’s house.”</p>
<p>His <span class="footnote" data-note="The household in ancient near-east culture was a legal and spiritual unit. The actions of the father impacted generations.">father’s house</span> had stayed. When Cyrus decreed the return, some went. Most stayed. They built businesses. They built synagogues. They built a comfortable exile. They prayed toward Jerusalem but they did not go. And Nehemiah, the son of that house, carried the guilt of a household that had learned to live without the wall.</p>
<p>“Our fathers sinned, and are no more; and we bear their iniquities.” — Lamentations 5:7. The covenant does not deal with individuals only. It deals with households. The house is a unit. The house is a witness. And the house that stayed was a witness against the house that should have gone.</p>
<p>This is the hardest confession a man makes: that the sin he is fighting is not only his own. It is inherited. It is familial. It is the air he breathed before he could choose the air.</p>
<p>The unwept grief of a household is not neutral. It passes down. The father who never wept teaches the son not to weep. The father who never returned teaches the son that returning is optional. And the son inherits a wall he did not break.</p>
<p>Nehemiah wept for a wall he did not break. That is the beginning of repair.</p>
`,
questions: `
<li><strong>Cognitive:</strong> What sin in your father’s house are you still paying for? Name it. Do not spiritualize it.</li>
<li><strong>Structural:</strong> What did your household teach you about Adonai, about money, about work, about women, about conflict? Which of those lessons are covenant and which are exile?</li>
<li><strong>Heart:</strong> Have you ever confessed the sin of your house as your own, or have you only blamed it?</li>
`,
prayer: "Abba, I and my father’s house have sinned. I have blamed the wall on others while carrying the habits of the exile. Forgive my house. Forgive me. Show me what my household taught me that was not Yours. Break the chain here. Let the confession end with me. Amen.",
tactical: "Write down one pattern in your family line that is not of the Kingdom—anger, silence, absence, addiction, unbelief, contempt. Write it as a confession: “I and my father’s house have sinned.” Bring it before Abba each day this week."
},
// ... (Days 3-7 remain the same, just truncated here for brevity. Assume they follow the same pattern)
];

// --- 2. INITIALIZATION LOGIC ---
let currentDayIndex = 0;

function buildDaySelector() {
    const selector = document.getElementById('day-selector');
    selector.innerHTML = ''; 

    devotionals.forEach((dev, index) => {
        const span = document.createElement('span');
        span.className = `day-btn ${index === 0 ? 'active' : ''}`;
        span.innerText = `0${dev.day}`; 
        span.onclick = () => loadDevotional(index);
        selector.appendChild(span);
    });
}

function loadDevotional(index) {
    currentDayIndex = index;
    const data = devotionals[index];

    const buttons = document.querySelectorAll('.day-btn');
    buttons.forEach((btn, i) => {
        if (i === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    document.getElementById('display-day-title').innerText = data.title;
    document.getElementById('display-scripture-ref').innerText = data.scriptureRef;
    document.getElementById('display-scripture').innerText = data.scripture;
    document.getElementById('display-reflection').innerHTML = data.reflection;
    document.getElementById('display-questions').innerHTML = data.questions;
    document.getElementById('display-prayer').innerText = data.prayer;
    document.getElementById('display-tactical').innerText = data.tactical;

    // Load Journal Entry for this specific day
    loadJournalEntry(data.day);

    document.getElementById('screen-content').scrollTo({ top: 0, behavior: 'smooth' });

    // Re-attach footnote listeners
    attachFootnoteListeners();
}

// --- 3. INLINE FOOTNOTES ---
function attachFootnoteListeners() {
    const footnotes = document.querySelectorAll('.footnote');
    const overlay = document.getElementById('footnote-overlay');
    const text = document.getElementById('footnote-text');

    footnotes.forEach(fn => {
        fn.addEventListener('click', (e) => {
            e.stopPropagation();
            text.innerText = fn.getAttribute('data-note');
            overlay.classList.add('visible');
        });
    });

    // Close footnote when clicking anywhere else
    document.addEventListener('click', () => {
        overlay.classList.remove('visible');
    });
}

document.getElementById('close-footnote').addEventListener('click', () => {
    document.getElementById('footnote-overlay').classList.remove('visible');
});

// --- 4. JOURNALING & TRACKING (Local Storage) ---
const journalInput = document.getElementById('journal-input');
let currentDayForJournal = 1;

function loadJournalEntry(day) {
    currentDayForJournal = day;
    const savedText = localStorage.getItem(`pasture_journal_day_${day}`);
    
    if (savedText) {
        journalInput.value = savedText;
        document.getElementById('tracking-text').innerText = "Saved locally.";
    } else {
        journalInput.value = '';
        document.getElementById('tracking-text').innerText = "Your words are saved locally on this device.";
    }
}

// Auto-save logic as the user types
journalInput.addEventListener('input', () => {
    const text = journalInput.value;
    localStorage.setItem(`pasture_journal_day_${currentDayForJournal}`, text);
    document.getElementById('tracking-text').innerText = "Saving...";
    
    // Debounce the "Saved" text so it doesn't flicker
    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => {
        document.getElementById('tracking-text').innerText = "Saved locally.";
    }, 1000);
});

// --- 5. TRANSITIONS & BREATHING ---
let breathingStarted = false;

function revealContent() {
    const splashScreen = document.getElementById('screen-splash');
    const contentScreen = document.getElementById('screen-content');

    splashScreen.classList.remove('visible');
    splashScreen.classList.add('hidden');

    contentScreen.classList.remove('hidden');
    contentScreen.classList.add('visible');

    loadDevotional(0);

    if (!breathingStarted) {
        setTimeout(runBreathingCycle, 1000); 
        setInterval(runBreathingCycle, 8000);
        breathingStarted = true;
    }
}

let isInhaling = false;
function runBreathingCycle() {
    const orb = document.getElementById('breathOrb');
    const text = document.getElementById('breathText');
    
    if (!orb || !text) return;

    if (!isInhaling) {
        orb.classList.add('inhale');
        text.innerText = "Inhale...";
        isInhaling = true;
        
        setTimeout(() => {
            orb.classList.remove('inhale');
            text.innerText = "Exhale...";
            isInhaling = false;
        }, 4000); 
    }
}

// --- 6. THEME LOGIC ---
const themes = ["morning", "afternoon", "evening", "night"];
let currentThemeIndex = 0;

function applyTheme(themeName) {
    themes.forEach(t => document.body.classList.remove(`theme-${t}`));
    document.body.classList.add(`theme-${themeName}`);
    const formattedName = themeName.charAt(0).toUpperCase() + themeName.slice(1);
    document.getElementById('current-time').innerText = `${formattedName} Hue`;
}

function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    
    if (hours >= 5 && hours < 12) currentThemeIndex = 0; 
    else if (hours >= 12 && hours < 17) currentThemeIndex = 1; 
    else if (hours >= 17 && hours < 21) currentThemeIndex = 2; 
    else currentThemeIndex = 3; 
    
    applyTheme(themes[currentThemeIndex]);
}

// --- 7. START THE APP ---
document.getElementById('screen-splash').addEventListener('click', revealContent);

buildDaySelector();
loadDevotional(0);
updateTime(); 