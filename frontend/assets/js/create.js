const form = document.getElementById('create-form');
const url = '/api/v1/users/requests';
const messageBox = document.querySelector('.message');
const token = localStorage['ascii-mt-token'];

const getFormData = () => {
  const formData = new FormData(form);
  return formData;
};

const create = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = getFormData();
    const formObject = {};
    for (const [key, value] of formData.entries()) {
      formObject[key] = value;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formObject),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(formObject);
      if (response.status !== 201) {
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
    return null;
  });
};

create();
