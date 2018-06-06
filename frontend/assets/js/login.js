const form = document.getElementById('signup-form');
const url = '/api/v1/auth/login';
const message = document.querySelector('.message');

const getFormData = () => {
  const formData = new FormData(form);
  return formData;
};

const login = () => {
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
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json())
      .then((data) => {
        localStorage.setItem('ascii-mt-token', data.token);
        message.classList.add('message-success');
        message.innerHTML = 'Login successful';
        message.classList.remove('hide');
        window.location.href = '/dashboard';
      })
      .catch((err) => {
        console.log(err);
      });
    return null;
  });
};

login();
