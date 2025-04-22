class EnvVarError extends Error {
  constructor() {
    super();
    this.name = 'EnvVarError';
    this.message = 'Missing Environment Variable';
  }
}

export default EnvVarError;
