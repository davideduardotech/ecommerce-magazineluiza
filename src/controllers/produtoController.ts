import express from 'express';
import { ProdutoModel } from '../model/produtoModel';


export const criarProduto = async (req: any, res:any, next:any) =>{
    const produtoData = req.body;
    
    try{
        
        // CODDING: Adicionar ID do usuario
        produtoData['usuario'] = req.user.id;

        // CODDING: Estuturando informações de preço(R$)
        const precoPix = produtoData['preço(R$)']['pix']['preço(R$)'] || 0;
        const descontoPix = produtoData['preço(R$)']['pix']['desconto(%)'] || 0;
        const precoComDescontoPix = precoPix - (precoPix * (descontoPix / 100));

        produtoData['preço(R$)']['pix'] = {
            "preço(R$)": precoPix,
            "desconto(%)": descontoPix,
            "preço com desconto(R$)": precoComDescontoPix,
            "desconto(R$)": precoComDescontoPix ? precoPix - precoComDescontoPix : undefined
        };
      
        // CODDING: Calculando valor 
        const precoCartaoDeCredito = produtoData['preço(R$)']['cartão de crédito']['preço(R$)'] || precoPix;
        const taxaJuros = produtoData['preço(R$)']['cartão de crédito']['juros(%)'] || 0;
        const quantidadeParcelas = produtoData['preço(R$)']['cartão de crédito']['parcelas'] || 0;

        let valorDaParcela;
        if(taxaJuros > 0 && quantidadeParcelas > 0){
            valorDaParcela = (precoCartaoDeCredito * (taxaJuros / 100)) /
            (1 - Math.pow(1 + (taxaJuros / 100), -quantidadeParcelas));
        }else{
            valorDaParcela = precoCartaoDeCredito/quantidadeParcelas
        }
        

        // Estruturando os dados de parcelas
        produtoData['preço(R$)']['cartão de crédito'] = {
            "parcelas disponiveis": Array.from({ length: produtoData['preço(R$)']['cartão de crédito']['parcelas'] }, (_, index) => index + 1),
            "valor da parcela(R$)": valorDaParcela,
            "valor total(R$)":valorDaParcela*produtoData['preço(R$)']['cartão de crédito']['parcelas'],
            "juros(%)": taxaJuros
        };

        // CODDING: Excluindo propriedade desnecessária
        delete produtoData['juros(%)'];
        delete produtoData["desconto(%)"];

        //return res.json(produtoData);
        /*const novoProduto = new ProdutoModel({
            usuario: "65abf1305e27c96109f6ca81",
            nome:"Produto 01",
            categoria: "categoria 01",
            "preço(R$)":{
                pix:{
                    "preço(R$)":197,
                    "preço com desconto(R$)":174.90,
                    "desconto(R$)":19.9,
                    "desconto(%)":10
                },
                "cartão de crédito":{
                    "parcelas disponiveis":[1,2,3,4,5,6,7,8,9],
                    "valor da parcela(R$)":24.9,
                    "valor total(R$)":210,
                    "juros(%)":1

                }
            }
        });*/
        const novoProduto = new ProdutoModel(produtoData);
        await novoProduto.save()
        return res.status(200).json({message: "produto criado",produto:novoProduto});

    }catch(error){
        return res.status(500).json({error: `${error}`});
    }

    
    return res.status(200).json(produtoData);
}


export const searchProduto = async (req: any, res: any, next: any) => {
    try{
        const {limit} = req.query;
        console.log(`limit: ${limit}`);
        const produtos = await ProdutoModel.find().limit(limit);
        console.log('produtos: ',produtos);
        return res.status(200).json({limit: limit, products:produtos});
    }catch(error){
        return res.status(500).json({error:`${error}`});
    }
}

