function lockedProfile() {
    let buttons = document.querySelectorAll('button');

    for (let button of buttons) {
        button.addEventListener('click', (e) => {
            let profile = e.target.parentElement;
            let isLocked = profile.querySelector('input[value="lock"]').checked;
            let hiddenDiv = profile.querySelector('.hiddenInfo');

            if (isLocked) return;

            if (button.textContent === 'Show more') {
                hiddenDiv.style.display = 'block';
                button.textContent = 'Hide it';
            } else {
                hiddenDiv.style.display = 'none';
                button.textContent = 'Show more';
            }
        });
    }
}