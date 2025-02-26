// Org class inherits from Person
class Organizer extends Person {
  #permissions;
  #orgName;
  #tags;

  constructor(person, org_name) {
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
    this.#orgName = orgName;
    this.#tags = [];
    // set permissions
    this.#permissions = Person.PERMISSIONS.ORGANIZER;
  }

  #setOrgName() {
    this.#orgName = orgName;
  }

  getPermissions() {
    return this.#permissions;
  }

  #addTag(tag) {
    this.#tags.push(tag);
  }

  #getTags() {
    return this.#tags;
  }

  #removeTag(tag) {
    const index = this.#tags.indexOf(tag);
    if (-1 !== index) {
      this.#tags.splice(index, 1);
    } else {
      throw new Error("tag is not a valid tag in Tags");
    }
  }

  // Overriding a method from the Person class
  pwd() {
    console.log("This is in the Org class.");
  }
}
