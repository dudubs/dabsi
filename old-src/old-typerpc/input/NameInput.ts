import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";

export const NameInput = () =>
  TextInput({
    minLength: 2,
    maxLength: 20,
    required: true,
    trim: true,
  });
