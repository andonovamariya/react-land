import User from "./user.model";

interface GoodPractice {
  id: string;
  title: string;
  description: string;
  author: User;
}

export default GoodPractice;
