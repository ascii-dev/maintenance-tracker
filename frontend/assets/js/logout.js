const logout = () => {
  localStorage.removeItem('ascii-mt-token');
  window.location.href = '/';
};

logout();
