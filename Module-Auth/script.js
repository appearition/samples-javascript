const tenant = ''; // enter your tenant name here
const channelID = ''; // enter your channel ID here
const appId = ''; // enter your app ID here
const authToken = ''; // enter your authentication token here

function loginUser(email, password) {
  const apiUrl = `https://api.appearition.com/${tenant}/api/Account/Authenticate/${channelID}`;

  const requestBody = {
    username: email,
    password: password,
    appId: appId,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Version': 2,
      'Authentication-Token': authToken,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Data', data);

      const popup = document.getElementById('popup');
      const popupText = document.getElementById('popup-text');
      const closePopupButton = document.getElementById('close-popup');
      closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
      });
      if (data.IsSuccess) {
        // Do something with the response, such as redirecting to a new page or displaying a success message
        popupText.innerText = 'Login successful!';
        popup.style.display = 'block';

        setTimeout(() => {
          popup.style.display = 'none';
        }, 3000);
      } else {
        popupText.innerText = data.Errors[0];
        popup.style.display = 'block';

        setTimeout(() => {
          popup.style.display = 'none';
        }, 3000);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error, such as displaying an error message to the user
    });
}

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent default form submission behavior
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;

  loginUser(email, password);
});
