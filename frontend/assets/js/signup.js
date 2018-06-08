const form = document.getElementById('signup-form');
const url = '/api/v1/auth/signup';
const messageBox = document.querySelector('.message');

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

const signup = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formObject = getFormData();
    const { password, confirmPassword } = formObject;
    if (password !== confirmPassword) {
      messageBox.classList.add('message-failure');
      messageBox.classList.remove('message-success');
      messageBox.innerHTML = 'Password and Confirm password fields are not the same';
      messageBox.classList.remove('hide');
      return null;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formObject),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      response.json().then((message) => {
        if (response.status !== 201) {
          messageBox.classList.add('message-failure');
          messageBox.classList.remove('message-success');
          messageBox.innerHTML = message.message;
          messageBox.classList.remove('hide');
          return null;
        }
        localStorage.setItem('ascii-mt-token', message.token);
        localStorage.setItem('ascii-mt-is_admin', message.is_admin);
        messageBox.classList.add('message-success');
        messageBox.classList.remove('message-failure');
        messageBox.innerHTML = 'Account created successfully';
        messageBox.classList.remove('hide');
        window.location.href = '/dashboard';
        return null;
      });
    })
      .catch((err) => {
        console.log(err);
      });
    return null;
  });
};

signup();
