// PersonFactory

class PersonFactory {
  static createPerson(
    type,
    name,
    birthdate,
    sex,
    address,
    phone,
    id_num,
    insurance
  ) {
    const person = new Person(
      name,
      birthdate,
      sex,
      address,
      phone,
      id_num,
      insurance
    );

    // todo generate username based on name and if its free
    let username = "john doe";
    // todo generate random password
    let password = "password";

    person.setUserName(username);
    person.setPassword(password);

    switch (type) {
      case "Volunteer":
        return new Volunteer(person, (totalHours = 0));
      case "Organizer":
        return new Organizer(person);
      case "Admin":
        return new Admin(person);
      default:
        throw new Error("Invalid User type");
    }
  }
}
