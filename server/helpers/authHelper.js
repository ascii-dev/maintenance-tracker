const authHelper = (caller, req) => {
  let error;
  if (req.body.email === '') {
    error = 'Email can not be blank';
  }
  if (req.body.password === '') {
    error = 'Password can not be blank';
  }
  if (caller === 'signup') {
    if (req.body.name === '') {
      error = 'Name can not be blank';
    }
  }
  return error;
};

export default authHelper;
