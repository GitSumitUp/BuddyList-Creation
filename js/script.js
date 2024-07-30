let status = {
    1: "Available",
    2: "Busy",
    3: "Idle",
    4: "Not logged in",
};

let users_json = [
    {
        userId: 1,
        name: "Jon Snow",
        profilePicture:
            "https://images.nightcafe.studio/jobs/mWfF1s7OOVg5DMTYiNZ8/mWfF1s7OOVg5DMTYiNZ8--4--qccau.jpg?tr=w-1600,c-at_max",
        statusMessage: "We become what we think about!",
        presence: 1,
    },
    {
        userId: 2,
        name: "Daenerys Targaryen",
        profilePicture:
            "https://preview.redd.it/hlxen8gtwpm01.jpg?width=640&crop=smart&auto=webp&v=enabled&s=a3c43bcbfc1db31d542ef67071559264358b3d2b",
        statusMessage: "A positive mindset brings positive things.",
        presence: 3,
    },
    {
        userId: 3,
        name: "Tyrion Lannister",
        profilePicture:
            "https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a3f5237411193.573f25019c8bf.jpg",
        statusMessage: "One small positive thought can change your whole day",
        presence: 3,
    },
    {
        userId: 4,
        name: "Jaime Lannister",
        profilePicture:
            "https://images.nightcafe.studio/jobs/mWfF1s7OOVg5DMTYiNZ8/mWfF1s7OOVg5DMTYiNZ8--4--qccau.jpg?tr=w-1600,c-at_max",
        statusMessage: "I am a rockstar",
        presence: 1,
    },
    {
        userId: 5,
        name: "Arya Stark",
        profilePicture:
            "https://64.media.tumblr.com/21de4501827aba1c6463ce2ae6a36780/tumblr_ps5le9xxRb1w9a5vgo1_1280.jpg",
        statusMessage: "I am using Gradious messenger",
        presence: 4,
    },
];

function getPresenceClass(presence) {
    switch (presence) {
        case 1:
            return 'green';
        case 2:
            return 'red';
        case 3:
            return 'yellow';
        case 4:
            return 'grey';
        default:
            return '';
    }
}

function visibileUserForm() {
    const form = document.getElementById('addUserForm');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

function addUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const statusMessage = document.getElementById('statusMessage').value;
    const profilePicLink = document.getElementById('profilePicLink').value;
    const presence = parseInt(document.getElementById('presence').value);

    if (name === '' || statusMessage === '' || profilePicLink === '' || isNaN(presence)) {
        alert("Please fill in all the details.");
        return;
    }

    const newUserId = users_json.length > 0 ? users_json[users_json.length - 1].userId + 1 : 1;

    const newUser = {
        userId: newUserId,
        name: name,
        profilePicture: profilePicLink,
        statusMessage: statusMessage,
        presence: presence
    };

    users_json.push(newUser);

    alert("Details are added successfully.");
    document.getElementById('name').value = '';
    document.getElementById('statusMessage').value = '';
    document.getElementById('profilePicLink').value = '';
    document.getElementById('presence').value = '1';
   
    document.getElementById('addUserForm').style.display = 'none';
    renderUsers();
}

function renderUsers() {
    const root = document.getElementById('root');
    root.innerHTML = '';

    users_json.forEach(user => {
        const presenceClass = getPresenceClass(user.presence);

        const userDiv = document.createElement('div');
        userDiv.className = 'user';

        userDiv.innerHTML = `
            <div class="img-container">
                <img src="${user.profilePicture}" class='user-image ${presenceClass}' alt="user image" />
            </div>
            <div class="user-detail">
                <p class="user-name">${user.name}</p>
                <p class="user-message">${user.statusMessage}</p>
            </div>
            <div class='three-btn'>
                <div class="dropdown">
                    <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></a>
                    <ul class="dropdown-menu">
                        <li><button id='USR${user.userId}' onclick='deleteItem("USR${user.userId}")' class="dropdown-item">Delete</button></li>
                        <li><button id='update-USR${user.userId}' onclick='updateItem("USR${user.userId}")' class="dropdown-item">Update</button></li>
                    </ul>
                </div>
            </div>
        `;

        root.appendChild(userDiv);
    });
}

function deleteItem(userId) {
    users_json = users_json.filter(user => `USR${user.userId}` !== userId);
    renderUsers();
}

function updateItem(userId) {
    const existingForm = document.getElementById('updateUserForm');
    if (existingForm) {
        existingForm.remove();
    }

    const user = users_json.find(user => `USR${user.userId}` === userId);
    if (user) {
        const updateForm = document.createElement('form');
        updateForm.id = 'updateUserForm';
        updateForm.innerHTML = `
            <div class='form'>
                <div class="input">
                    <input type="text" id="updateName" placeholder="Name" value="${user.name}">
                </div>
                <div class="input">
                    <input type="text" id="updateStatusMessage" placeholder="Status Message" value="${user.statusMessage}">
                </div>
                <div class="input">
                    <input type="text" id="updateProfilePicLink" placeholder="Profile Picture Link" value="${user.profilePicture}">
                </div>
                <div class="input">
                    <select id="updatePresence">
                        <option value="1" ${user.presence === 1 ? 'selected' : ''}>Available</option>
                        <option value="2" ${user.presence === 2 ? 'selected' : ''}>Busy</option>
                        <option value="3" ${user.presence === 3 ? 'selected' : ''}>Idle</option>
                        <option value="4" ${user.presence === 4 ? 'selected' : ''}>Not logged in</option>
                    </select>
                </div>
                <div>
                    <button class="btn">Update</button>
                </div>
            </div>
        `;

        const addUserForm = document.getElementById('addUserForm');
        addUserForm.style.display = 'none';
        addUserForm.parentNode.insertBefore(updateForm, addUserForm);

        updateForm.addEventListener('submit', function(event) {
            event.preventDefault();
            saveUserDetails(event, userId);
        });
    }
}

function saveUserDetails(event, userId) {
    event.preventDefault();

    const name = document.getElementById('updateName').value;
    const statusMessage = document.getElementById('updateStatusMessage').value;
    const profilePicLink = document.getElementById('updateProfilePicLink').value;
    const presence = parseInt(document.getElementById('updatePresence').value);

    if (name === '' || statusMessage === '' || profilePicLink === '' || isNaN(presence)) {
        alert("Please fill in all the details.");
        return;
    }

    const userIndex = users_json.findIndex(user => `USR${user.userId}` === userId);
    if (userIndex !== -1) {
        users_json[userIndex] = {
            userId: userIndex + 1,
            name: name,
            profilePicture: profilePicLink,
            statusMessage: statusMessage,
            presence: presence
        };

        alert("Details updated successfully.");

        document.getElementById('updateUserForm').remove();
        document.getElementById('addUserForm').style.display = 'block';

        renderUsers();
    }
}

document.querySelector('.btn').addEventListener('click', addUser);

renderUsers();
