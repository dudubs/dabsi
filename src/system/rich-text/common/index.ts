declare global {
  namespace IRichText {
    interface BlockStyleTypes {
      align: StyleType<"CENTER" | "LEFT" | "RIGHT">;
      layout: StyleType<"BLOCK" | "FLOAT" | "INLINE">;
    }

    interface BlockDataTypes {
      regular: DataType;

      header: DataType<{
        level: 1 | 2 | 3 | 4 | 5 | 6;
      }>;

      // listitem
      list: DataType<{
        type: string;
      }>;

      atomic: DataType;
    }
  }
}
export {};
