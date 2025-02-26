class Person {
  // full constructor

  #name;
  #birthDate;
  #sex;
  #address;
  #phoneNumber;
  #idNumber;
  #insurance;

  #username;
  #password;

  constructor(name, birthDate, sex, address, phoneNumber, idNumber, insurance) {
    this.#name = name;
    this.#birthDate = birthDate;
    this.#sex = sex;
    this.#address = address;
    this.#phoneNumber = phone;
    this.#idNumber = idNumber;
    this.#insurance = insurance;
    //TODO add id pic here maybe
  }

  #setName(name) {
    this.#name = name;
  }

  #getName() {
    return this.#name;
  }

  #setBirthDate(birthDate) {
    this.#birthDate = birthDate;
  }

  #getBirthDate() {
    return this.#birthDate;
  }

  #setSex(sex) {
    this.#sex = sex;
  }

  #getSex() {
    return this.#sex;
  }

  #setAddress(address) {
    this.#address = address;
  }

  #getAddress() {
    return this.#address;
  }

  #setPhone(phone) {
    this.#phoneNumber = phoneNumber;
  }

  #getPhoneNumber() {
    return this.#phoneNumber;
  }

  #setID(idNumber) {
    this.#idNumber = idNumber;
  }

  #getIDNumber() {
    return this.idNumber;
  }

  #setInsurance(insurance) {
    this.#insurance = insurance;
  }

  #getInsurance(){
    return this.#insurance;
  }

  #setUserName(username) {
    this.#username = username;
  }

  #getUserName() {
    return this.#username;
  }

  #setPassword(password) {
    this.#password = password;
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
