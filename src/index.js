// Constants for better understanding of magic numbers
const INITIAL_GOLD = 0;
const INITIAL_GOLD_PER_CLICK = 1;
const INITIAL_UPGRADE_COST = 10;
const UPGRADE_COST_MULTIPLIER = 1.5;

// Game state moved into an object
const gameState = {
    gold: INITIAL_GOLD,
    goldPerClick: INITIAL_GOLD_PER_CLICK,
    upgradeCost: INITIAL_UPGRADE_COST,
};

// Helper function to update elements by ID
function updateElement(id, value) {
    document.getElementById(id).textContent = value;
}

// Function to handle earning gold
export function earnGold() {
    gameState.gold += gameState.goldPerClick;
    updateUI();
}

// Function to handle buying upgrades
export function buyUpgrade() {
    if (gameState.gold >= gameState.upgradeCost) {
        gameState.gold -= gameState.upgradeCost;
        gameState.goldPerClick *= 2;
        gameState.upgradeCost = Math.floor(gameState.upgradeCost * UPGRADE_COST_MULTIPLIER);
        updateUI();
    }
}

// Unified UI update function
function updateUI() {
    updateElement('gold', gameState.gold);
    updateElement('goldPerClick', gameState.goldPerClick);
    updateElement('upgradeCost', gameState.upgradeCost);
}

// Save game state to localStorage
function saveGame() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Load game state from localStorage
function loadGame() {
    const savedState = JSON.parse(localStorage.getItem('gameState'));
    if (savedState) {
        Object.assign(gameState, savedState);
    }
    updateUI();
}

// Assign event listeners
window.addEventListener('load', loadGame);
window.addEventListener('beforeunload', saveGame);