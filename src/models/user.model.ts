interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  country: string;
  position: "intern" | "junior" | "mid" | "senior";
}

export default User;
