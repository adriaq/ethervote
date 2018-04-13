exports.getAllAdmins = function (req, res) {
    console.log('Llistat amb tots els administradors');
    res.send('OK');
};

exports.getAdmin = function (req, res) {
    var id = req.params.adminId;
    console.log('Informació admin');
    res.send('OK');
};

