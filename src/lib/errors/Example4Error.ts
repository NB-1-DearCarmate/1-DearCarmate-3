class ForbiddenError extends Error {
  constructor(modelName: string, targetId: number, userId: number) {
    super(`${targetId} is forbidden for ${userId} at ${modelName}`);
    this.name = 'ForbiddenError';
  }
}

export default ForbiddenError;
