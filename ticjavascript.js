// Game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// DOM elements
const grid = document.getElementById('grid');
const status = document.getElementById('status');
const resetButton = document.querySelector('.reset-button');

// Create celebration container
const celebrationContainer = document.createElement('div');
celebrationContainer.style.position = 'fixed';
celebrationContainer.style.top = '0';
celebrationContainer.style.left = '0';
celebrationContainer.style.width = '100%';
celebrationContainer.style.height = '100%';
celebrationContainer.style.pointerEvents = 'none';
celebrationContainer.style.zIndex = '1000';
document.body.appendChild(celebrationContainer);

// Initialize the game
function initGame() {
    // Create grid cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        grid.appendChild(cell);
    }
    
    // Add grid styles
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    grid.style.gap = '10px';
    grid.style.maxWidth = '300px';
    grid.style.margin = '20px auto';
    
    // Add cell styles
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'var(--container-bg)';
        cell.style.border = '2px solid var(--primary-color)';
        cell.style.aspectRatio = '1';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.fontSize = '2rem';
        cell.style.fontWeight = 'bold';
        cell.style.cursor = 'pointer';
        cell.style.transition = 'all 0.3s ease';
    });
    
    // Add reset button styles
    resetButton.style.padding = '10px 20px';
    resetButton.style.backgroundColor = 'var(--primary-color)';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.margin = '20px auto';
    resetButton.style.display = 'block';
    
    updateStatus();
}

// Create popper celebration
function createPopperCelebration() {
    const colors = ['#6c63ff', '#4CAF50', '#ff6b6b', '#ffd93d', '#ff8c42'];
    const popperCount = 50; // Number of particles per side
    
    // Create particles from left side
    for (let i = 0; i < popperCount; i++) {
        createPopperParticle('left', colors);
    }
    
    // Create particles from right side
    for (let i = 0; i < popperCount; i++) {
        createPopperParticle('right', colors);
    }
}

function createPopperParticle(side, colors) {
    const particle = document.createElement('div');
    const size = Math.random() * 15 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Base styles
    particle.style.position = 'absolute';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.zIndex = '1000';
    
    // Position based on side
    if (side === 'left') {
        particle.style.left = '0';
        particle.style.transform = 'translateX(-100%)';
    } else {
        particle.style.right = '0';
        particle.style.transform = 'translateX(100%)';
    }
    
    // Random vertical position
    particle.style.top = Math.random() * 100 + 'vh';
    
    celebrationContainer.appendChild(particle);
    
    // Animate particle
    requestAnimationFrame(() => {
        particle.style.transition = 'all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
        
        if (side === 'left') {
            particle.style.transform = `translateX(${Math.random() * 100 + 50}vw) translateY(${Math.random() * 100 - 50}px)`;
        } else {
            particle.style.transform = `translateX(-${Math.random() * 100 + 50}vw) translateY(${Math.random() * 100 - 50}px)`;
        }
        
        particle.style.opacity = '0';
    });
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 800);
}

// Highlight winning cells
function highlightWinningCells(pattern) {
    pattern.forEach(index => {
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.style.backgroundColor = currentPlayer === 'X' ? '#6c63ff33' : '#4CAF5033';
        cell.style.transform = 'scale(1.1)';
    });
}

// Handle cell click
function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateCell(index);
        
        const winningPattern = checkWin();
        if (winningPattern) {
            gameActive = false;
            highlightWinningCells(winningPattern);
            createPopperCelebration();
            
            // Create celebration message
            const celebration = document.createElement('div');
            celebration.style.position = 'fixed';
            celebration.style.top = '50%';
            celebration.style.left = '50%';
            celebration.style.transform = 'translate(-50%, -50%)';
            celebration.style.backgroundColor = 'var(--container-bg)';
            celebration.style.padding = '20px 40px';
            celebration.style.borderRadius = '10px';
            celebration.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
            celebration.style.zIndex = '1001';
            celebration.style.textAlign = 'center';
            celebration.style.animation = 'celebrate 0.5s ease-out';
            
            celebration.innerHTML = `
                <h2 style="color: ${currentPlayer === 'X' ? '#6c63ff' : '#4CAF50'}; margin-bottom: 10px;">
                    Player ${currentPlayer} Wins! 🎉
                </h2>
                <p style="color: var(--text-color);">Congratulations!</p>
            `;
            
            document.body.appendChild(celebration);
            
            // Remove celebration message after 3 seconds
            setTimeout(() => {
                celebration.remove();
            }, 3000);
            
            return;
        }
        
        if (checkDraw()) {
            gameActive = false;
            status.textContent = "It's a draw!";
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

// Update cell display
function updateCell(index) {
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.textContent = gameBoard[index];
    cell.style.color = gameBoard[index] === 'X' ? '#6c63ff' : '#4CAF50';
}

// Update game status
function updateStatus() {
    status.textContent = `Player ${currentPlayer}'s turn`;
    status.style.textAlign = 'center';
    status.style.fontSize = '1.2rem';
    status.style.margin = '20px 0';
    status.style.color = 'var(--text-color)';
}

// Check for win
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]) {
            return pattern;
        }
    }
    return null;
}

// Check for draw
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Reset game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    // Clear grid and reset styles
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = 'var(--container-bg)';
        cell.style.transform = 'scale(1)';
    });
    
    updateStatus();
}

// Add celebration animation
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrate {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);

// Event listeners
resetButton.addEventListener('click', resetGame);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame); 