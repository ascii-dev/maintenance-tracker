const VerifyUser = () => {
  const user = localStorage['ascii-mt-is_admin'];
  if (user !== '0') {
    window.location.href = '/admin';
  }
};

VerifyUser();
