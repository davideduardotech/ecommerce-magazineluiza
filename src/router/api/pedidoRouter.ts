import express from 'express';
import {criarPedido} from '../../controllers/api/pedidoController'
import { body, validationResult } from 'express-validator';

const pedidoRouter = express.Router();

// criar pedido
pedidoRouter.post('/',[
    // Validação para as informações pessoais
    body('informacoes pessoais.nome').notEmpty().withMessage('O nome é obrigatório'),
    body('informacoes pessoais.sobrenome').notEmpty().withMessage('O sobrenome é obrigatório'),
    body('informacoes pessoais.email').isEmail().withMessage('O email não é válido'),
    body('informacoes pessoais.telefone').notEmpty().withMessage('O telefone não é válido'),

    // Validação para o endereço
    body('endereco.rua').notEmpty().withMessage('A rua é obrigatória'),
    body('endereco.bairro').notEmpty().withMessage('O bairro é obrigatório'),
    body('endereco.cidade').notEmpty().withMessage('A cidade é obrigatória'),
    body('endereco.estado').notEmpty().withMessage('O estado é obrigatório'),
    body('endereco.cep').notEmpty().withMessage('O CEP não é válido'),

    // Validação para o campo 'produtos'
    body('produtos')
    .isArray({min: 1}).withMessage('A lista de produtos deve ser um array com no minimo 1 elemento'),

    // Validação para cada objeto dentro do array 'produtos'
    body('produtos.*.id').isString().withMessage('O ID do produto deve ser uma string'),
    body('produtos.*.nome').isString().withMessage('O nome do produto deve ser uma string'),
    body('produtos.*.preco').isNumeric().withMessage('O preço do produto deve ser um número'),
    body('produtos.*.quantidade').isInt({ min: 1 }).withMessage('A quantidade do produto deve ser um número inteiro positivo')
],criarPedido);


export default pedidoRouter;