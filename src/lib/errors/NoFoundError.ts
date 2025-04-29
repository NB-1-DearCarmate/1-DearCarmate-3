class NoFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoFoundError';
  }
}

export default NoFoundError;
