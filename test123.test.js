var x = require('./PasswordCheck');

test(" password check", () =>{
    var avalue = x.passwordLengthCheck("asdfghjk")
    expect(avalue).toBe(true);
})

test(" password uppercase check", () =>{
    var avalue = x.passwordUpercaseMatch("asDfghjk")
    expect(avalue).toBe(true);
    var avalue1 = x.passwordUpercaseMatch("asfghjk")
    expect(avalue1).toBe(false);
})