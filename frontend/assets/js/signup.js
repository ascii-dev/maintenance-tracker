const form = document.getElementById('signup-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm_password').value;
  const errorField = document.getElementById('errors');
  if (password !== confirm) {
    errorField.innerHTML = '<p>Password and Confirm password fields are not the same</p>';
  } else {
    form.submit();
  }
});
