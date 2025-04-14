const btns = document.querySelectorAll('button');
class Candidates {
    partyName;
    candidateName;
    #vote = 0;
    constructor(party, name) {
        this.partyName = party;
        this.candidateName = name;
    }
    voteParty() {
        return this.#vote++;
    }
    get vote() {
        return this.#vote;
    }
}

const voter1 = new Candidates('RCB', 'MALYA');
const voter2 = new Candidates('MI', 'AMBANI');
const voter3 = new Candidates('CSK', 'THALA');
const voter4 = new Candidates('NOTA', 'NOTA');
const lead = [voter1, voter2, voter3, voter4];

// Define total number of voters
const MAX_VOTERS = 10;
let totalVotesCast = 0;

// DOM elements for status
const votesLeftElement = document.getElementById('votesLeft');
const timeLeftElement = document.getElementById('timeLeft');

// Set election end time (5 minutes from now)
const ELECTION_END_TIME = new Date(Date.now() + 5 * 60 * 1000);

// Store click handlers to remove them later
const clickHandlers = [];

// Update time remaining
function updateTimeLeft() {
    const now = Date.now();
    const timeRemaining = ELECTION_END_TIME.getTime() - now;

    if (timeRemaining <= 0) {
        timeLeftElement.textContent = "0:00";
        return;
    }

    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    timeLeftElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Add click handlers to buttons
btns.forEach((element, index) => {
    const clickHandler = () => {
        lead[index].voteParty();
        totalVotesCast++;

        // Update votes left
        votesLeftElement.textContent = MAX_VOTERS - totalVotesCast;

        // Check if voting should end
        if (totalVotesCast >= MAX_VOTERS || Date.now() >= ELECTION_END_TIME.getTime()) {
            endVoting();
        }
    };

    // Store reference to the handler
    clickHandlers.push(clickHandler);

    // Add event listener
    element.addEventListener('click', clickHandler);
});

// Function to end voting
function endVoting() {
    // Remove all event listeners
    btns.forEach((element, index) => {
        element.removeEventListener('click', clickHandlers[index]);
        element.disabled = true; // Disable buttons visually
        element.style.backgroundColor = "rgba(80, 80, 80, 0.5)";
        element.style.cursor = "not-allowed";
    });

    // Clear the intervals
    clearInterval(checkInterval);
    clearInterval(timeUpdateInterval);

    // Declare final result
    declareWinner();
}

// Declare winner function
function declareWinner() {
    let votes = lead.map(candidate => candidate.vote);
    let maximum = Math.max(...votes);

    if (maximum === 0) {
        alert("No votes were cast in this election.");
        return;
    }

    // Find all candidates with maximum votes (in case of a tie)
    let winners = lead.filter(candidate => candidate.vote === maximum);

    if (winners.length === 1) {
        alert(`FINAL RESULT: ${winners[0].partyName} wins with ${maximum} votes!`);
    } else {
        // Handle tie
        const tiedCandidates = winners.map(w => w.partyName).join(" and ");
        alert(`FINAL RESULT: TIE between ${tiedCandidates} with ${maximum} votes each!`);
    }
}

// Check progress regularly
const checkInterval = setInterval(() => {
    // Check if time is up
    if (Date.now() >= ELECTION_END_TIME.getTime()) {
        endVoting();
        return;
    }

    // Show current leader
    let votes = lead.map(candidate => candidate.vote);
    let maximum = Math.max(...votes);

    if (maximum === 0) {
        return;
    }

    let position = votes.indexOf(maximum);
    alert(`${lead[position].partyName} leading with ${lead[position].vote} votes`);
}, 5000);

// Update time display every second
const timeUpdateInterval = setInterval(updateTimeLeft, 1000);

// Initialize display
updateTimeLeft();
votesLeftElement.textContent = MAX_VOTERS;