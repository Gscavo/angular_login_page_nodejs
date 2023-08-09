const express = require("express");
const UserModel = require("../models/user.model");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
    }
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    await UserModel.findById(id).then(user => {
        console.log(user)
        res.status(200).json(user);
    }).catch(error => {
        console.log(error.message);
        res.status(500).send('<h1>Falha ao encontrar o usuário</h1> <h2>Tente novamente</h2>')
    });
});

router.post('/', async (req, res) => {
    try {
        await UserModel.create(req.body);
        res.redirect('/user');
    } catch (error) {
        console.log(error.message);
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndUpdate(id)
    .then(user => {
        console.log(user)
        res.status(200).json(user);
    }).catch(error => {
        console.log(error.message);
        res.status(500).send('<h1>Falha ao Atualizar o Usuário</h1> <h2>Tente novamente</h2>')
    });
})

router.delete("/", async (req, res) => {
    await UserModel.deleteMany({}).then((_) => {
        console.log('Esvaziando Banco de dados!')
        res.redirect('/user');
    });
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndDelete(id)
    .then(user => {
        console.log(user)
        res.status(200).json(user);
    }).catch(error => {
        console.log(error.message);
        res.status(500).send('<h1>Falha ao Deletar o Usuário</h1> <h2>Tente novamente</h2>')
    });
})

module.exports = router;