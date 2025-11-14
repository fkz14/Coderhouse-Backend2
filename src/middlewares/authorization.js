const authorizeRole = (role) => {
  return (req, res, next) => {
    // Verificar que el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // Verificar el rol del usuario
    if (req.user.role !== role && req.user.role !== 'admin') {
      return res.status(403).json({ error: `Acceso denegado. Se requiere rol: ${role}` });
    }

    next();
  };
};

module.exports = { authorizeRole };
