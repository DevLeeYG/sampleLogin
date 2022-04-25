export interface Person {
  name: string;
  age?: number;
}

interface Developer {
  skills: string[];
}

interface WebDeveloper extends Person, Developer {}

const webDeveloper: WebDeveloper = {
  name: 'Lee',
  age: 20,
  skills: ['HTML', 'CSS', 'JavaScript'],
};
