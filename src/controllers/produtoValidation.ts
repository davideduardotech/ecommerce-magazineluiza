import { body, validationResult } from 'express-validator';


export const produtoValidation = {
    criarProduto:[
        body('name').isString(),
        body('price').isNumeric(),
        body('category').isString().optional()
    ]
}
