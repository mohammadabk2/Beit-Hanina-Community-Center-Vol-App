// Student class inherits from Person
class Volunteer extends Person {
  #totalHours;
  #permissions;
  #tags;

  constructor(person, totalHours = 0) {
    // Call the parent class constructor using super
    super(
      person.name,
      person.birthDate,
      person.sex,
      person.address,
      person.phoneNumber,
      person.idNumber,
      person.insurance
    );

    this.#totalHours = totalHours;
    this.#tags = [];
    // set permissions
    this.#permissions = Person.PERMISSIONS.VOLUNTEER;
  }

  getPermissions() {
    return this.#permissions;
  }

  #incrementTotalHours(hour) {
    this.#totalHours += hour;
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
    console.log("This is in the User class.");
  }
}
