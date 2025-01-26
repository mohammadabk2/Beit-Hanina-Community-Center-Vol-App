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
      //TODO add picture support here 
      this.permissions = []; // stars with no permssions
    }

    // ? maybe to add getters and setters
  
    getPermissions() {
      throw new Error(`${this.constructor.name} must implement the 'getPermissions' method.`);
    }

    pwd() {
      console.log("This is in person class.");
    }

    
    static PERMISSIONS = {
      USER: ['read'],
      ADMIN: ['read', 'write', 'delete'],
      ORGANIZER: ['organize', 'schedule'],
    };
  }
  