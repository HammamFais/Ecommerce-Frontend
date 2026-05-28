const auth = {
  getToken: () => localStorage.getItem('token'),
  getRole: () => localStorage.getItem('role'),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn: () => !!localStorage.getItem('token'),

  saveSession: (token, role, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearSession: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  },

  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success) {
      auth.saveSession(res.data.token, res.data.user.role, res.data.user);
    }
    return res;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout', {});
    } catch (_) {}
    auth.clearSession();
    window.location.href = '/auth/login.html';
  },

  register: async (name, email, password, role) => {
    return await api.post('/auth/register', { name, email, password, password_confirmation: password, role });
  },

  requireAuth: (allowedRoles = []) => {
    if (!auth.isLoggedIn()) {
      window.location.href = '/auth/login.html';
      return false;
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(auth.getRole())) {
      window.location.href = '/index.html';
      return false;
    }
    return true;
  },

  redirectIfLoggedIn: () => {
    if (auth.isLoggedIn()) {
      const role = auth.getRole();
      if (role === 'seller') window.location.href = '/seller/dashboard.html';
      else window.location.href = '/buyer/catalog.html';
    }
  },
};
