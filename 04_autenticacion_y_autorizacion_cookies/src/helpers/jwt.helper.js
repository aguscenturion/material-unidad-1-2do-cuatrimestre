export const generateToken = (user) => {
  // LOGICA PARA GENERAR EL TOKEN Y MANEJAR ERRORES (AGREGAR)

  // generar un token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.person.name,
      lastname: user.person.lastname,
    },
    "s3cr3t",
    {
      expiresIn: "1h",
    }
  );

  return token;
};

export const verifyToken = (token) => {
  // AGREGAR LOGICA PARA VERIFICAR EL TOKEN Y MANEJAR ERRORES

  return decoded;
};
