const VerifyAdmin = () => {
  const admin = localStorage['ascii-mt-is_admin'];
  if (admin !== '1') {
    window.location.href = '/dashboard';
  }
};

VerifyAdmin();
