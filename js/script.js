const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid-view');
    membersContainer.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list-view');
    membersContainer.classList.remove('grid-view');
});

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = '';
    members.forEach((member) => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';

        // First image is LCP priority, others lazy load
        const fetchPriority = member.image === '1.jpg' ? 'high' : 'auto';
        const loadingAttr = member.image === '1.jpg' ? '' : 'loading="lazy"';

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" fetchpriority="${fetchPriority}" ${loadingAttr}>
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${member.membership}</p>
        `;
        membersContainer.appendChild(memberCard);
    });
}

// Set footer year and last modified
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-mod').textContent = document.lastModified;

getMembers();
