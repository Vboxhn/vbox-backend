// vbox-backend/middleware/adminAuth.js
module.exports = function adminAuth(req, res, next) {
  try {
    const got =
      req.headers['x-admin-key'] ||
      req.get?.('x-admin-key') ||
      req.headers['X-Admin-Key'] ||
      req.query.adminKey ||
      '';

    const need = (process.env.ADMIN_KEY || '').trim();

    if (!need) {
      console.error('⚠️ Falta ADMIN_KEY en .env');
      return res.status(500).json({ message: 'Configuración del servidor incompleta' });
    }
    if ((got || '').trim() !== need) {
      return res.status(401).json({ message: 'No autorizado (admin)' });
    }
    next();
  } catch {
    return res.status(401).json({ message: 'No autorizado (admin)' });
  }
};
