interface Bug {
  id: string;
  title: string;
  description: string;
  isSolved: boolean;
  authorEmail: string;
  fixerEmail: string;
}

export default Bug;
