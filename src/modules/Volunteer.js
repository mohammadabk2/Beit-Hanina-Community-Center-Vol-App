// Student class inherits from Person
class Volunteer extends Person {

  #totalHours;
  #permissions;

  constructor(person, totalHours = 0) {
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

    this.#totalHours = totalHours;

    // set permissions
    this.#permissions = Person.PERMISSIONS.VOLUNTEER;
  }

  getPermissions() {
    return this.#permissions;
  }

  // Overriding a method from the Person class
  pwd() {
    console.log("This is in the User class.");
  }
}
