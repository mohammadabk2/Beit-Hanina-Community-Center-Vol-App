// Student class inherits from Person
class User extends Person {
  constructor(person, username, password, totalHours = 0) {
    // Call the parent class constructor using super
    super(
      person.name,
      person.birthdate,
      person.sex,
      person.address,
      person.phone,
      person.id_num,
      person.insurance
    );

    // Additional properties for User
    this.username = username;
    this.password = password;
    this.totalHours = totalHours;
  }

  login() {
    console.log(`${this.username} has logged in.`);
    //TODO login the user
  }

  // Overriding a method from the Person class
  pwd() {
    console.log("This is in the User class.");
  }

  getPermissions(){
    return Person.PERMISSIONS.USER;
  }
}
