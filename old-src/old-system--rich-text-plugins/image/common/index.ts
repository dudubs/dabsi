declare global {
  namespace IRichText {
    interface BlockDataTypes {
      image: DataType<{}, { url: string }, { imageKey: string }>;
    }
  }
}

export {};
