const jwt = require('jsonwebtoken');

//Vérification authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) { 
      throw 'id utilisateur invalide';
    } else {
      next();
    }
  } catch { // Si problème d'authentification
    res.status(401).json({
      error: new Error('requete invalide!')
    });
  }
};