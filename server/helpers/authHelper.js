const authHelper = (caller, req) => {
  let error;
  const pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;
  const passwordFormat = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (req.body.password === '' || req.body.password === undefined) {
    error = 'Password can not be blank';
  }
  if (caller === 'signup') {
    if (req.body.name === '' || req.body.name === undefined) {
      error = 'Name can not be blank';
    }
    if (req.body.password.length <= 3) {
      error = "Password length must be greater than 3";
    }
    if (passwordFormat.test(req.body.password)) {
      error = "Password can not contain special characters";
    }
  }
  if (req.body.email === '' || req.body.email === undefined) {
    error = 'Email can not be blank';
  } else if (!pattern.test(req.body.email.trim())) {
    error = 'Email is invalid';
  }
  return error;
};

export default authHelper;
