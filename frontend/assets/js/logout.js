const logout = () => {
  localStorage.removeItem('ascii-mt-token');
  localStorage.removeItem('ascii-mt-is_admin');
  window.location.href = '/';
};

logout();
