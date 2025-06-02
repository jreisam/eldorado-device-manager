interface Environment {
  production: boolean;
  apiUrl: string;
}

const local: Environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};

const prod: Environment = {
  production: true,
  apiUrl: 'http://localhost:3000',
};
export default local;
