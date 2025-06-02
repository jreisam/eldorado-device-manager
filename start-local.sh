#!/bin/bash
export NODE_ENV='local'

# Recebendo informações do sgbd
echo "==== Inicializando banco de dados (mySQL instalado em localhost) ===="
echo "Digite o nome do banco de dados (schema) MySQL:"
read mysql_database
echo "Informe um usuário root ou admin do MySQL:"
read mysql_user
echo "Digite a senha:"
read -s mysql_password
echo -e "\nDigite a porta do MySQL (Enter para a padrão 3306):"
read mysql_port
mysql_port=${mysql_port:-3306}

#exports
export DATABASE_HOST='localhost'
export DATABASE_NAME=$mysql_database
export DATABASE_USER=$mysql_user
export DATABASE_PASSWORD=$mysql_password
export DATABASE_PORT=mysql_port

cd api/src/database/sql
mysql -u "$mysql_user" -p"$mysql_password" -P "$mysql_port" "$mysql_database" < 00-struct-and-populate.sql
cd ../../../..

# Instalar e iniciar o backend
echo "==== Instalando e iniciando o backend ===="
cd api
npm install
npm run start:dev &
BACKEND_PID=$!
cd ..

echo "Aguardando o backend inicializar..."
sleep 5

# Instalar e iniciar o frontend
echo "==== Instalando e iniciando o frontend ===="
cd web
npm install
npm run start &
FRONTEND_PID=$!
cd ..

# Exibir informações de acesso
echo ""
echo "==== Aplicação no ar :tada: ===="
echo "Frontend: http://localhost:4200"
echo "Backend API: http://localhost:3000"
echo "Documentação Swagger: http://localhost:3000/api"
echo ""
echo "Pressione Ctrl+C para encerrar ambos os serviços"
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

# 3. Tornar o script executável
chmod +x start-local.sh

# 4. Executar o script
./start-local.sh
