const form = document.getElementById('signup-form');
const url = '/api/v1/auth/login';
const messageBox = document.querySelector('.message');
const loginBtn = document.getElementById('loginBtn');

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

const login = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    loginBtn.disabled = true;
    loginBtn.innerHTML = 'Signing you in...';
    const formObject = getFormData();
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formObject),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      response.json().then((message) => {
        if (response.status !== 200) {
          messageBox.classList.add('message-failure');
          messageBox.classList.remove('message-success');
          messageBox.innerHTML = message.message;
          messageBox.classList.remove('hide');
          loginBtn.disabled = false;
          loginBtn.innerHTML = 'Login';
        } else {
          localStorage.setItem('ascii-mt-token', message.token);
          localStorage.setItem('ascii-mt-is_admin', message.is_admin);
          messageBox.classList.add('message-success');
          messageBox.classList.remove('message-failure');
          messageBox.innerHTML = 'Login successful';
          messageBox.classList.remove('hide');
          window.setTimeout(() => {
            if (message.is_admin === 1) {
              window.location.href = '/admin';
            } else {
              window.location.href = '/dashboard';
            }
          }, 1000);
        }
      });
    })
      .catch((err) => {
        console.log(err);
      });
    return null;
  });
};

login();
