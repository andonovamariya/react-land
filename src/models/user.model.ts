enum Position {
  INTERN = "intern",
  JUNIOR = "junior",
  MID = "mid",
  SENIOR = "senior",
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  country: string;
  position: Position;
}

export default User;
