const VerifyToken = () => {
  const token = localStorage['ascii-mt-token'];
  if (typeof token !== 'string') {
    window.location.href = '/login';
  }
};

VerifyToken();
