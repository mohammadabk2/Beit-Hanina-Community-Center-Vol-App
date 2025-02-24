class Person {
  // full constructor
  constructor(name, birthdate, sex, address, phone, id_num, insurance) {
    this.name = name;
    this.birthdate = birthdate;
    this.sex = sex;
    this.address = address;
    this.phone = phone;
    this.id_num = id_num;
    this.insurance = insurance;
    //TODO add picture support here
    this.permissions = []; // stars with no permssions
  }

  pwd() {
    console.log("This is in person class.");
  }

  static PERMISSIONS = {
    VOLUNTEER: ["r"],
    ADMIN: ["ra", "wa"],
    ORGANIZER: ["ro", "wo"],
  };
}
