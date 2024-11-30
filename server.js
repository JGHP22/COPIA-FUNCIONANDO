import sequelize from './src/config/dbConfig.js';
import app from './app.js';

sequelize.sync({ force: true })
  .then(() => {
    console.log('Banco de dados e tabelas criados!');
  })
  .catch((error) => {
    console.error('Erro ao criar o banco de dados:', error);
});

app.listen(3000, () => 
    console.log('Servidor iniciado na porta 3000')
);