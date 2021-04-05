let counter = 0;

const runtime = new Date().getTime().toString(36);

export function generateRandomId(): string {
  return `${(++counter).toString(36).padStart(3, "x")}${runtime}`;
}


