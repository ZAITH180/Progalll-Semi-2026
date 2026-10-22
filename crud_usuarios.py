from mysql.connector.errors import Error
import conexion

db = conexion.Conexion()

class crud_usuarios:
    def consultar(self, buscar):
        return db.consultar(f"SELECT * FROM usuarios_usss009724 WHERE usuario LIKE '%{buscar}%' OR nombre LIKE '%{buscar}%'")

    def administrar(self, datos):
        try:
            if datos['accion'] == 'nuevo':
                sql = """
                    INSERT INTO usuarios_usss009724(usuario, clave, nombre, direccion, telefono)
                    VALUES(%s, %s, %s, %s, %s)
                """
                valores = (datos['usuario'], datos['clave'], datos['nombre'], datos['direccion'], datos['telefono'])
            elif datos['accion'] == 'modificar':
                sql = """
                    UPDATE usuarios_usss009724 SET usuario=%s, clave=%s, nombre=%s, direccion=%s, telefono=%s
                    WHERE idUsuario=%s
                """
                valores = (datos['usuario'], datos['clave'], datos['nombre'], datos['direccion'], datos['telefono'], datos['idUsuario'])
            else:
                sql = """
                    DELETE FROM usuarios_usss009724 WHERE idUsuario=%s
                """
                valores = (datos['idUsuario'],)
            return db.ejecutar(sql, valores)
        except Error as e:
            return f"Error al guardar el usuario: {e}"

    def validar_login(self, usuario, clave):
        # Método para validar el acceso en el login (Punto 5)
        sql = f"SELECT * FROM usuarios_usss009724 WHERE usuario = '{usuario}' AND clave = '{clave}'"
        return db.consultar(sql)