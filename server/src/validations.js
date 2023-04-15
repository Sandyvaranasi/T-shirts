const validate = function (a) {
  if (a.match(/^([a-z A-Z]){2,50}$/)) return true;
};

const validateEmail = function (a) {
  if (a.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return true;
};

const validatePassword = function (a) {
  if (a.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/))
    return true;
};

const validatePhone = function (a) {
  if (a.match(/^[6-9][0-9]{9}$/)) return true;
};

const isValidImage = function (value) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/.test(value);
};
