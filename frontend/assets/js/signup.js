const form = document.getElementById('signup-form');
const url = '/api/v1/auth/signup';
const message = document.querySelector('.message');

const getFormData = () => {
  const formData = new FormData(form);
  return formData;
};

const signup = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = getFormData();
    const formObject = {};
    for (const [key, value] of formData.entries()) {
      formObject[key] = value;
    }
    const { password, confirmPassword } = formObject;
    if (password !== confirmPassword) {
      message.classList.add('message-failure');
      message.innerHTML = 'Password and Confirm password fields are not the same';
      message.classList.remove('hide');
      return null;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formObject),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json())
      .then((data) => {
        localStorage.setItem('ascii-mt-token', data.token);
        message.classList.add('message-success');
        message.innerHTML = 'Account created successfully';
        message.classList.remove('hide');
        window.location.href = '/dashboard';
      })
      .catch((err) => {
        console.log(err);
      });
    return null;
  });
};

signup();
