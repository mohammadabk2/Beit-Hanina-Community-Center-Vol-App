// Org class inherits from Person
class Organizer extends Person {

  #permissions;
  #org_name;
  #tags;

  constructor(person,org_name) {
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

    // extra properties
    this.#org_name= org_name;
    this.#tags = [];
    // set permissions
    this.#permissions = Person.PERMISSIONS.ORGANIZER;
  }

  getPermissions() {
    return this.#permissions;
  }

  #addTag(tag){
    this.#tags.push(tag);
  }

  // Overriding a method from the Person class
  pwd() {
    console.log("This is in the Org class.");
  }
}
