export default class ValidationsErrors{
  static EMAIL = {
    'required': 'Email is required',
    'pattern':'Invalid Email adress'
  };

  static LOGIN = {
    'required': 'Login is required',
  }

  static PASSWORD = {
    'minLength': 'min length of password 3',
    'maxLength': 'max length of password 20',
    'required': 'Password is required'
  };

  static CONFIRM_PASSWORD = {
    'required': 'Confirm Password is required',
    'equel': 'Confirm Password must by equel Password'
  };
}