const form = document.getElementById('create-form');
const url = '/api/v1/users/requests';
const messageBox = document.querySelector('.message');
const token = localStorage['ascii-mt-token'];
const createBtn = document.getElementById('createBtn');

// Get data from the form and convert it into an object for signup
const getFormData = () => {
  const formData = new FormData(form);
  const formObject = {};
  let a; // Created these two variables because
  let b; // eslint was telling me to use array destructuring below
  Array.from(formData.entries()).forEach((value) => {
    [a, b] = value;
    formObject[a] = b;
  });
  return formObject;
};

const create = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createBtn.disable = true;
    createBtn.innerHTML = 'Creating your request...';
    const formObject = getFormData();
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formObject),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status !== 201) {
        createBtn.disable = false;
        createBtn.innerHTML = 'Submit';
        response.json().then((message) => {
          messageBox.classList.add('message-failure');
          messageBox.innerHTML = message.message;
          messageBox.classList.remove('hide');
        });
      } else {
        setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
      }
    })
      .catch((err) => {
        console.log(err);
      });
    return null;
  });
};

create();
