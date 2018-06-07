const deleteRequest = () => {
  const url = '/api/v1/users/requests';
  const pageUrlArray = document.URL.split('/');
  const pageUrl = pageUrlArray[pageUrlArray.length - 1];
  const token = localStorage['ascii-mt-token'];
  const messageBox = document.querySelector('.message');

  fetch(`${url}/${pageUrl}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      response.json().then((message) => {
        messageBox.classList.add('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
      });
    } else {
      window.location.href = '/dashboard';
    }
  })
    .catch((err) => {
      console.log(err);
    });
};
