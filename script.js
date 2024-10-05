let totalCoins = 0;
let age = 14;
let day = 0;
const lifespan = 70;

// Coin Tiers
const tierCounts = {
    bronze: 0,
    silver: 0,
    gold: 0,
    platinum: 0,
    diamond: 0,
    crystal: 0,
    emerald: 0,
    ruby: 0,
    sapphire: 0,
    obsidian: 0,
    mythril: 0,
    celestial: 0
};

// Happiness and Evil values
let happiness = 100;
let evil = 0;

// Task Progress
let currentJob = null;
let currentSkill = null;
let jobProgress = 0;
let skillProgress = 0;

// Jobs and Skills Data
const jobs = {
    miner: { name: "Miner", xpPerTask: 10, taskTime: 5000 },
    lumberjack: { name: "Lumberjack", xpPerTask: 15, taskTime: 7000 }
};

const skills = {
    fishing: { name: "Fishing", xpPerTask: 12, taskTime: 6000 },
    crafting: { name: "Crafting", xpPerTask: 20, taskTime: 8000 }
};

// Update display for various elements
function updateDisplay() {
    document.getElementById("coinCount").innerText = totalCoins;
    document.getElementById("ageDisplay").innerText = age;
    document.getElementById("dayDisplay").innerText = day;
    document.getElementById("happinessDisplay").innerText = happiness;
    document.getElementById("evilDisplay").innerText = evil;
    
    // Update tier counts
    for (const tier in tierCounts) {
        document.getElementById(`${tier}Count`).innerText = tierCounts[tier];
    }
    
    // Update job and skill progress
    document.getElementById("jobName").innerText = currentJob ? currentJob.name : "None";
    document.getElementById("skillName").innerText = currentSkill ? currentSkill.name : "None";
    document.getElementById("jobProgressFill").style.width = jobProgress + "%";
    document.getElementById("skillProgressFill").style.width = skillProgress + "%";
}

// Coin clicking functionality
document.getElementById("coinButton").addEventListener("click", function() {
    totalCoins++;
    checkCoinTiers();
    updateDisplay();
});

// Coin tier check
function checkCoinTiers() {
    if (totalCoins >= 10 && tierCounts.bronze < 1) {
        tierCounts.bronze++;
    } else if (totalCoins >= 50 && tierCounts.silver < 1) {
        tierCounts.silver++;
    } else if (totalCoins >= 100 && tierCounts.gold < 1) {
        tierCounts.gold++;
    } else if (totalCoins >= 250 && tierCounts.platinum < 1) {
        tierCounts.platinum++;
    } else if (totalCoins >= 500 && tierCounts.diamond < 1) {
        tierCounts.diamond++;
    } else if (totalCoins >= 1000 && tierCounts.crystal < 1) {
        tierCounts.crystal++;
    } else if (totalCoins >= 2000 && tierCounts.emerald < 1) {
        tierCounts.emerald++;
    } else if (totalCoins >= 5000 && tierCounts.ruby < 1) {
        tierCounts.ruby++;
    } else if (totalCoins >= 10000 && tierCounts.sapphire < 1) {
        tierCounts.sapphire++;
    } else if (totalCoins >= 20000 && tierCounts.obsidian < 1) {
        tierCounts.obsidian++;
    } else if (totalCoins >= 50000 && tierCounts.mythril < 1) {
        tierCounts.mythril++;
    } else if (totalCoins >= 100000 && tierCounts.celestial < 1) {
        tierCounts.celestial++;
    }
}

// Task management
function startJob(job) {
    currentJob = job;
    jobProgress = 0;
    updateDisplay();
    const interval = setInterval(() => {
        jobProgress += (100 / (job.taskTime / 1000));
        if (jobProgress >= 100) {
            clearInterval(interval);
            totalCoins += job.xpPerTask; // Earning coins
            checkCoinTiers();
            updateDisplay();
            currentJob = null; // Reset current job
            updateDisplay();
        }
        updateDisplay();
    }, 1000);
}

function startSkill(skill) {
    currentSkill = skill;
    skillProgress = 0;
    updateDisplay();
    const interval = setInterval(() => {
        skillProgress += (100 / (skill.taskTime / 1000));
        if (skillProgress >= 100) {
            clearInterval(interval);
            totalCoins += skill.xpPerTask; // Earning coins
            checkCoinTiers();
            updateDisplay();
            currentSkill = null; // Reset current skill
            updateDisplay();
        }
        updateDisplay();
    }, 1000);
}

// Aging and day tracking
setInterval(() => {
    day++;
    if (day % 365 === 0 && age < lifespan) {
        age++;
    }

    // Decrease happiness over time
    if (happiness > 0) {
        happiness--;
    }

    // Simulate evil gain
    if (evil < 100) {
        evil++;
    }

    updateDisplay();
}, 1000); // Change to a suitable interval as needed

// Pause functionality
document.getElementById("pauseButton").addEventListener("click", function() {
    alert("Game Paused");
});

// Auto-promote feature
document.getElementById("autoPromote").addEventListener("change", function() {
    if (this.checked) {
        setInterval(() => {
            if (currentJob) {
                startJob(currentJob);
            }
        }, 10000); // Automatically promote to the next job every 10 seconds
    }
});

// Auto-learn feature
document.getElementById("autoLearn").addEventListener("change", function() {
    if (this.checked) {
        setInterval(() => {
            if (currentSkill) {
                startSkill(currentSkill);
            }
        }, 10000); // Automatically learn a skill every 10 seconds
    }
});
