const userSearchURL = 'https://api.github.com/search/users?q=';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const search = document.getElementById('search');

    form.addEventListener('submit', event => {
        event.preventDefault();
        findUsers(search.value);
    })
})

function findUsers(user) {
    const userObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
        }
    }

    fetch(userSearchURL + user, userObj)
        .then(resp => resp.json())
        .then(json => renderUsers(json))
}

function renderUsers(users) {
    const items = users.items;
    for (let user of items) {
        renderUser(user);
    }
}

function renderUser(user) {
    const userList = document.getElementById('user-list');
    const card = document.createElement('div');
    const login = document.createElement('h2');
    login.textContent = user.login;
    const url = document.createElement('a');
    url.href = user.html_url;
    url.textContent = 'User Page'
    const avatar = document.createElement('img');
    avatar.src = user.avatar_url;
    const br = document.createElement('br');
    card.appendChild(login)
    card.appendChild(avatar)
    card.appendChild(br)
    card.appendChild(url)
    userList.appendChild(card);

    login.addEventListener('click', () => {
        const repos = renderRepos(user.login);
    })
}

function renderRepos(user) {
    const repoURL = `https://api.github.com/users/${user}/repos`;
    const repoObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
        }
    }
    const repoList = document.getElementById('repos-list');

    fetch(repoURL, repoObj)
        .then(resp => resp.json())
        .then(json => {
            for (let repo of json) {
                const a = document.createElement('a')
                a.textContent = repo.name;
                a.href = repo.html_url;
                repoList.appendChild(a)

            }
        })
}