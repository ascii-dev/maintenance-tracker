const requestHelper = (req) => {
  let error;
  if (req.body.title === '' || req.body.title === undefined) {
    error = 'Request title can not be blank';
  }
  if (req.body.description === '' || req.body.description === undefined) {
    error = 'Request description can not be blank';
  }
  if (req.body.type === '' || req.body.type === undefined) {
    error = 'Request type can not be blank';
  } else if (!(req.body.type.trim() === 'maintenance' || req.body.type.trim() === 'repair')) {
    error = 'Request type can only be maintenance or repair';
  }
  return error;
};

export default requestHelper;
