// --- 1. 專業詞庫 ---
const DICTIONARY = {
    "genre": [
        {en: "Cyberpunk 2077 style", zh: "賽博龐克 2077"}, {en: "Studio Ghibli anime style", zh: "吉卜力動漫風"},
        {en: "Makoto Shinkai style", zh: "新海誠光影風"}, {en: "Hyper-realistic photography", zh: "超寫實攝影"},
        {en: "Unreal Engine 5 render", zh: "UE5 3D渲染"}, {en: "Oil painting by Van Gogh", zh: "梵谷油畫"}
    ],
    "vibe": [
        {en: "Dystopian and gritty", zh: "反烏托邦"}, {en: "Ethereal and dreamy", zh: "空靈夢幻"},
        {en: "Dark and ominous", zh: "黑暗不祥"}, {en: "Vibrant and energetic", zh: "充滿活力"}
    ],
    "quality": [
        {en: "8k resolution, highly detailed", zh: "8K 極致細節"}, {en: "Masterpiece, award winning", zh: "傑作"},
        {en: "Photorealistic, raw photo", zh: "照片級真實"}
    ],
    "location": [
        {en: "Neon cyberpunk street", zh: "霓虹街道"}, {en: "Magical ancient forest", zh: "魔法森林"},
        {en: "Post-apocalyptic ruins", zh: "末日廢墟"}, {en: "Snowy mountain peak", zh: "雪山頂"}
    ],
    "lighting": [
        {en: "Cinematic lighting", zh: "電影級打光"}, {en: "Golden hour sunlight", zh: "黃昏金光"},
        {en: "Volumetric Tyndall effect", zh: "耶穌光"}, {en: "Neon flickering lights", zh: "霓虹光"}
    ],
    "angle": [
        {en: "Eye-level shot", zh: "水平視角"}, {en: "Low angle hero shot", zh: "仰拍"},
        {en: "High angle bird's eye view", zh: "鳥瞰"}
    ],
    "lens": [
        {en: "35mm cinematic lens", zh: "35mm 電影鏡頭"}, {en: "85mm f/1.8 portrait lens", zh: "85mm 人像鏡"},
        {en: "Bokeh background", zh: "背景虛化"}
    ],
    // 角色屬性 (更新後)
    "ethnicity": [
        {en: "East Asian", zh: "東亞裔"}, {en: "Nordic Caucasian", zh: "北歐白人"},
        {en: "Latina", zh: "拉丁裔"}, {en: "Elf", zh: "精靈族"}, {en: "Cyborg", zh: "生化人"}
    ],
    "gender": [
        {en: "woman", zh: "女性"}, {en: "man", zh: "男性"}, {en: "girl", zh: "女孩"}, {en: "boy", zh: "男孩"}
    ],
    "hair": [
        {en: "long silver hair", zh: "銀色長髮"}, {en: "short messy bob", zh: "凌亂短髮"},
        {en: "neon pink ponytail", zh: "霓虹粉馬尾"}, {en: "braided golden hair", zh: "金色辮子"}
    ],
    "body": [
        {en: "slim and elegant", zh: "苗條優雅"}, {en: "muscular build", zh: "肌肉發達"},
        {en: "petite and small", zh: "嬌小"}, {en: "tall and athletic", zh: "高挑運動型"}
    ],
    "outfit": [
        {en: "futuristic techwear suit", zh: "機能服"}, {en: "cyberpunk leather jacket", zh: "皮革外套"},
        {en: "traditional japanese kimono", zh: "和服"}, {en: "elegant evening gown", zh: "晚禮服"}
    ],
    "pose": [
        {en: "standing confidently", zh: "自信站立"}, {en: "dynamic action pose", zh: "戰鬥姿勢"},
        {en: "sitting on a ledge", zh: "坐在邊緣"}, {en: "looking at viewer", zh: "看著觀眾"}
    ],
    "expression": [
        {en: "expressionless", zh: "冷酷"}, {en: "smiling warmly", zh: "溫暖微笑"},
        {en: "mysterious smirk", zh: "神秘壞笑"}, {en: "serious looking", zh: "嚴肅"}
    ]
};

const LABELS = { 
    "ethnicity": "種族", "gender": "性別", "hair": "頭髮", 
    "body": "身材", "pose": "姿勢", "outfit": "服裝", "expression": "表情" 
};

// 範例文字提示
const HINTS = {
    "ethnicity": "例如：Japanese, Elf", "gender": "例如：woman, man", 
    "hair": "例如：Blue long hair", "body": "例如：Slim, Fit",
    "pose": "例如：Running, Sitting", "outfit": "例如：Armor, Dress",
    "expression": "例如：Happy, Sad"
};

// --- 2. 初始化與工具 ---
function initDatalists() {
    ["genre", "vibe", "quality", "location", "lighting", "angle", "lens"].forEach(key => {
        createDatalist(`list-${key}`, DICTIONARY[key]);
    });
}

function createDatalist(id, items) {
    const dl = document.getElementById(id);
    if(!dl) return;
    dl.innerHTML = items.map(item => `<option value="${item.en}">${item.zh}</option>`).join('');
}

function renderForm() {
    const container = document.getElementById('subjectsContainer');
    const num = document.getElementById('numSubjects').value;
    container.innerHTML = '';
    const attrs = ["ethnicity", "gender", "hair", "body", "outfit", "pose", "expression"];
    
    for(let i=0; i<num; i++) {
        const fieldset = document.createElement('fieldset');
        fieldset.innerHTML = `<legend>👤 角色 Subject ${i+1}</legend><div class="field-grid"></div>`;
        const grid = fieldset.querySelector('.field-grid');
        
        attrs.forEach(attr => {
            const listId = `list-s${i}-${attr}`;
            const inputId = `subject-${i}-${attr}`;
            grid.innerHTML += `
                <div class="input-unit">
                    <label>${LABELS[attr]}:</label>
                    <input type="text" id="${inputId}" list="${listId}" placeholder="選填...">
                    <datalist id="${listId}"></datalist>
                    <span class="hint">${HINTS[attr]}</span>
                </div>
            `;
            setTimeout(() => createDatalist(listId, DICTIONARY[attr]), 0);
        });
        container.appendChild(fieldset);
    }
}

// --- 3. 核心邏輯 ---
function roll(targetId) {
    let key = targetId.includes('subject') ? targetId.split('-').pop() : targetId;
    const el = document.getElementById(targetId);
    if (DICTIONARY[key] && el) {
        const randomItem = DICTIONARY[key][Math.floor(Math.random() * DICTIONARY[key].length)];
        el.value = randomItem.en;
    }
}

document.getElementById('randomizeBtn').onclick = () => {
    ["genre", "vibe", "quality", "location", "lighting", "angle", "lens"].forEach(k => roll(k));
    document.querySelectorAll('input[id^="subject-"]').forEach(input => roll(input.id));
    generatePrompt();
};

function findChinese(key, enValue) {
    if(!enValue) return "";
    const found = DICTIONARY[key]?.find(item => item.en.toLowerCase() === enValue.toLowerCase());
    return found ? found.zh : enValue;
}

function generatePrompt(e) {
    if(e) e.preventDefault();
    const data = { title: document.getElementById('title').value, prompt: "", raw_json: {} };
    let enParts = [];
    let zhParts = [];

    // 處理角色
    const num = document.getElementById('numSubjects').value;
    for(let i=0; i<num; i++) {
        let sEn = []; let sZh = []; let sObj = {};
        ["ethnicity", "gender", "hair", "body", "outfit", "pose", "expression"].forEach(attr => {
            const val = document.getElementById(`subject-${i}-${attr}`).value;
            if(val) {
                sEn.push(val);
                const zhVal = findChinese(attr, val);
                sZh.push(zhVal);
                sObj[attr] = { en: val, zh: zhVal };
            }
        });
        if(sEn.length > 0) {
            enParts.push(sEn.join(", "));
            zhParts.push(`【角色 ${i+1}】${sZh.join(", ")}`);
            data.raw_json[`subject_${i+1}`] = sObj;
        }
    }

    // 環境風格
    ["location", "lighting", "genre", "vibe", "angle", "lens", "quality"].forEach(key => {
        const val = document.getElementById(key).value;
        if(val) {
            enParts.push(val);
            zhParts.push(`【${key}】${findChinese(key, val)}`);
            data.raw_json[key] = { en: val, zh: findChinese(key, val) };
        }
    });

    data.prompt = enParts.join(", ");
    document.getElementById('out-en').textContent = data.prompt || "請輸入內容或點擊隨機";
    document.getElementById('out-zh').textContent = zhParts.join("\n");
    document.getElementById('out-json').textContent = JSON.stringify(data.raw_json, null, 2);
    saveHistory(data.prompt, zhParts.join(" | "));
}

// --- 4. 輔助功能 ---
function saveHistory(en, zh) {
    if(!en) return;
    let history = JSON.parse(localStorage.getItem('v6_history') || '[]');
    if(history[0]?.en === en) return;
    history.unshift({ time: new Date().toLocaleTimeString(), en: en, zh: zh });
    if(history.length > 10) history.pop();
    localStorage.setItem('v6_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('v6_history') || '[]');
    list.innerHTML = history.map((item, index) => `
        <div class="history-item">
            <div class="history-meta"><span>🕒 ${item.time}</span><button class="copy-btn" onclick="copyTextH('${index}')">複製</button></div>
            <div class="history-prompt">${item.en}</div>
            <input type="hidden" id="h-${index}" value="${item.en}">
        </div>
    `).join('');
}

function clearHistory() { localStorage.removeItem('v6_history'); renderHistory(); }
function copyTextH(i) { navigator.clipboard.writeText(document.getElementById(`h-${i}`).value).then(() => alert("已複製")); }
function copyText(id) { navigator.clipboard.writeText(document.getElementById(id).textContent).then(() => alert("已複製")); }

document.getElementById('promptForm').addEventListener('submit', generatePrompt);
document.addEventListener('DOMContentLoaded', () => { initDatalists(); renderForm(); renderHistory(); });