export const authAdminMiddleware = (req, res, next) => {
  const userLogged = req.usuario;

  //     userLogged.id

  //   req.body
  //   req.params id

  //   req.header

  if (!decoded.role !== "admin") {
    return res.status(401).json({
      msg: "Usted no tiene los permisos",
    });
  }

  next();
};
