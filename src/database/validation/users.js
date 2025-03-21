export default {
  name: /^([a-zA-Z\u0621-\u064A\s]){1,100}$/,
  birth_date: /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  email:
    /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  id_number: /^\d{9}$/,
  insurance: /^[a-zA-Z]{1,50}$/,
  address: /^[a-zA-Z\s]{1,255}$/,
  phone: /^\d{10}$/,
};
