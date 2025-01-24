// Admin class inherits from Person
class Admin extends Person {
  constructor(person, username, password) {
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

     // Additional properties for Admin
    this.username = username;
    this.password = password;
  }

  login() {
    console.log(`${this.username} has logged in.`);
    //TODO login the Admin
  }

  // Overriding a method from the Person class
  pwd() {
    console.log("This is in the Admin class.");
  }
}
