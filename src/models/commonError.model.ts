import User from "./user.model";

interface Error {
  id: string;
  title: string;
  description: string;
  isSolved: boolean;
  author: User | "";
  fixer: User | "";
}

export default Error;
