exports.getAdmins = function(req, res, next) {
    console.log('Llistat amb tots els administradors');
    res.send('OK');
};

exports.getAdminInfo = function(req, res, next) {
    var id = req.params.adminId;
    console.log('Informació admin');
    res.send('OK');
};
