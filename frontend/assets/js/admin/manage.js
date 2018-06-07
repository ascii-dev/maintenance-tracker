const initializeVars = () => {
  const vars = {};
  vars.url = '/api/v1/requests';
  const pageUrlArray = document.URL.split('/');
  vars.pageId = pageUrlArray[pageUrlArray.length - 1];
  vars.token = localStorage['ascii-mt-token'];
  vars.messageBox = document.querySelector('.message');
  return vars;
};

const approve = () => {
  const {
    url,
    pageId,
    token,
    messageBox,
  } = initializeVars();
  fetch(`${url}/${pageId}/approve`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
      } else {
        messageBox.classList.add('message-success');
        messageBox.classList.remove('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        window.location.href = '/admin';
      }
    });
  })
    .catch((err) => {
      console.log(err);
    });
};

const disapprove = () => {
  const {
    url,
    pageId,
    token,
    messageBox,
  } = initializeVars();

  fetch(`${url}/${pageId}/disapprove`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
      } else {
        messageBox.classList.add('message-success');
        messageBox.classList.remove('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        window.location.href = '/admin';
      }
    });
  })
    .catch((err) => {
      console.log(err);
    });
};

const resolve = () => {
  const {
    url,
    pageId,
    token,
    messageBox,
  } = initializeVars();

  fetch(`${url}/${pageId}/resolve`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
      } else {
        messageBox.classList.add('message-success');
        messageBox.classList.remove('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        window.location.href = '/admin';
      }
    });
  })
    .catch((err) => {
      console.log(err);
    });
};
