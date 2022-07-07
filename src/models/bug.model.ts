import User from "./user.model";

interface Bug {
  id: string;
  title: string;
  description: string;
  isSolved: boolean;
  author: User;
  fixer: User;
}

export default Bug;
