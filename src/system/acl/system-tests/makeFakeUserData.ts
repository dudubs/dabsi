import faker from "faker";

export default function makeFakeUserData() {
  const gender = faker.random.arrayElement([0, 1]);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  return {
    firstName,
    lastName,
    loginName: faker.internet.userName(firstName, lastName),
  };
}
