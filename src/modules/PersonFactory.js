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
    person = new Person(name,birthdate,sex,address,phone,id_num,insurance);

    // todo generate username based on name and if its free
    // todo generate random one time password
    let username = "";
    let password = "";

    switch (type) {
      case "Volunteer":
        return new Volunteer(person, username, password, totalHours = 0);
      case "Organizer":
        return new Organizer(person, username, password);
      case "Admin":
        return new Admin(person, username, password);
      default:
        throw new Error("Invalid person type");
    }
  }
}
