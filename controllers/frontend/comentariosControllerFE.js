const Meeti = require('../../models/Meeti');
const Comentarios = require('../../models/Comentarios');

exports.agregarComentario = async (req, res, next) => {
    // Obtener comentario
    const { comentario } = req.body;
    // Crear comentario en la BD
    await Comentarios.create({
        mensaje : comentario,
        usuarioId : req.user.id,
        meetiId : req.params.id
    });
    // Redireccionar a la misma pagina
    res.redirect('back');
    next();
}

// Elimina un comentario de la base de datos
exports.eliminarComentario = async (req, res, next) => {
    // Tomar el ID del comentario
    const { comentarioId } = req.body;
    // Consultar el comentario
    const comentario = await Comentarios.findOne({ where : { id : comentarioId } });
    // Verificar si existe el comentario
    if(!comentario) {
        res.status(404).send('Acción no valida');
        return next();
    }
    // Verificar si existe el comentario
    const meeti = await Meeti.findOne({ where : { id : comentario.meetiId }});
    // Verificar que quien lo borra es el creador 
    if(comentario.usuarioId === req.user.id || meeti.usuarioId === req.user.id) {
        await Comentarios.destroy({ where : { id : comentario.id }});
        res.status(200).send("Eliminado correctamente");
        return next();
    } else {
        res.status(403).send("Acción no valida");
        return next();
    }
}