  // Student class inherits from Person
  class Student extends Person {
    constructor(name, birthdate, sex, address, phone, id_num,insurance, schoolName,parentNumber) {
      // Call the parent class constructor using super
      super(name, birthdate, sex, address, phone, id_num,insurance);
  
      // Additional properties for Student
      this.schoolName = schoolName;
      this.parentNumber=parentNumber;
    }
  
    // Overriding a method from the Person class
    pwd() {
      console.log("This is in the Student class, overriding Person's method.");
    }
  }
  