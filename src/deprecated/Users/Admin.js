// Admin class inherits from Person
class Admin extends Person {
  #permissions;

  constructor(person) {
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

    // set permissions
    this.#permissions = Person.PERMISSIONS.ADMIN;
  }

  getPermissions() {
    return this.#permissions;
  }

  // Overriding a method from the Person class
  pwd() {
    console.log("This is in the Admin class.");
  }
}
