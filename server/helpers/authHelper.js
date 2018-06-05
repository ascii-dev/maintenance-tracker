const authHelper = (caller, req) => {
  let error;
  const pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;
  if (req.body.email === '' || req.body.email === undefined) {
    error = 'Email can not be blank';
  } else if (!pattern.test(req.body.email.trim())) {
    error = 'Email is invalid';
  }
  if (req.body.password === '' || req.body.password === undefined) {
    error = 'Password can not be blank';
  }
  if (caller === 'signup') {
    if (req.body.name === '' || req.body.name === undefined) {
      error = 'Name can not be blank';
    }
  }
  return error;
};

export default authHelper;
