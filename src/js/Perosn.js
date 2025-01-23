class Person {
    // full constructor
    constructor(name, birthdate,sex,address,phone,id_num,insurance) {
      this.name = name;
      this.birthdate = birthdate;
      this.sex = sex;
      this.address = address;
      this.phone = phone;
      this.id_num = id_num;
      this.insurance = insurance
    }

    // do we need an empty constructor
    constructor(){

    }
    // ? maybe to add getters and setters
  
    pwd() {
      console.log("This is in person class.");
    }
  }
  