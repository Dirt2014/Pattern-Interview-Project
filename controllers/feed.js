const Advisor = require('../models/Advisor');
const Client = require('../models/Client');

exports.getAdvisors = (req, res, next) => {
    Advisor.find().then(advisors => {
        res.status(200).json({advisors: advisors});
    })
    .catch(err => {
        console.log(err);
    });
};

exports.assignAdvisorToClient = (req, res, next) => {
    const advisorId = req.body.advisorId;
    const clientId = req.body.clientId;
    Client.findById(clientId).then(client => {
        if (!client) {
            const error = new Error('Could not find Client');
            error.statusCode = 404;
            throw error;
        }
        // can throw error if alreay had a advisor
        client.advisorId = advisorId;
        return client.save();
    })
    .then(result => {
        res.status(200).json({client: result});
    }).catch(err => {
        next(err);
    });
};

exports.getAdvisorClients = (req, res, next) => {
    const advisorId = req.params.advisorId;
    Client.find({'advisorId': advisorId}).lean().then(clients => {
        clients.forEach(client => {
            const accounts = client['accounts'];
            let total = 0;
            accounts.forEach(account => {
                total += account['value'];
            });
            client['total_value'] = total;
        });
        res.status(200).json({clients: clients});
    })
    .catch(err => {
        next(err);
    });
};