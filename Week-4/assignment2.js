const Person = function () {};

Person.prototype.initialize = function (name, age) {
  this.name = name;
  this.age = age;
};

const Teacher = function () {};
Teacher.prototype = Object.create(Person.prototype);

Teacher.prototype.teach = function (subject) {
  console.log(`${this.name} teaches ${subject}`);
};

let him = new Teacher();
him.initialize("Adam", 30);
him.teach("inheritance");
