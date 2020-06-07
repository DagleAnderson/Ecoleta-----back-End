import Knex from 'knex';

export async function seed(Knex:Knex){
    await Knex('items').insert([
        {title:'Lâmpadas',image:'lampadas.svg'},
        {title:'Pilhas e Baterias',image:'lampadas.svg'},
        {title:'Papéis e Papelões',image:'papeis-papelao.svg'},
        {title:'Resíduos eletrônicos ',image:'eletronicos.svg'},
        {title:'Resíduos orgânicos',image:'organicos.svg'},
        {title:'Óleo de cozinha',image:'oleo.svg'},

    ])
}