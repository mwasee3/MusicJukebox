 function passwordLengthCheck(pswrd) {
    
    if (pswrd.length >= 8) {
        if (100 > pswrd.length) {
            return true;
        }
    }
    return false;
  };

 function passwordUpercaseMatch(password) {
        var i=0;
        while (i <= password.length){
            i = i+1;

            character = password.charAt(i);
            if (!isNaN(character * 1)){
                continue;
            }
            else if (character == character.toUpperCase()) {
                return true;
            }
           
        }
    return false;
  };

  module.exports = {passwordLengthCheck,passwordUpercaseMatch}