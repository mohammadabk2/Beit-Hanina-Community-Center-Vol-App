// Org class inherits from Person
class Organizer extends Person {
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

    // Additional properties for Org
    this.username = username;
    this.password = password;

    // set permissions
    this.permissions = Person.PERMISSIONS.ORGANIZER;
  }

  getPermissions() {
    return this.permissions;
  }

  // Overriding a method from the Person class
  pwd() {
    console.log("This is in the Org class.");
  }
}
