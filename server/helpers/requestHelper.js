const requestHelper = (req) => {
  let error;
  if (req.body.title === '') {
    error = 'Email can not be blank';
  }
  if (req.body.description === '') {
    error = 'Password can not be blank';
  }
  if (req.body.type === '') {
    error = 'Name can not be blank';
  }
  return error;
};

export default requestHelper;
