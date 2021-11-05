var https = require('https');

exports.getTenants = function(params, callBack){

  var options = {
    host: 'api.stormpath.com',
    path: '/v1/tenants/current',
    port: 443,
    auth: params.key,
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(d) {
      callBack(null, d);
    });

  });

  req.end();

  req.on('error', function(e) {
    callBack(e, null);
  });

}

exports.getData = function(params, callBack){

  var options = {
    host: 'api.stormpath.com',
    path: params.url,
    port: 443,
    auth: params.key,
    method: 'GET'

  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(d) {
      callBack(null, d);
    });

  });

  req.end();

  req.on('error', function(e) {
    callBack(e, null);
  });

}


exports.updateAccount = function(params, callBack){

  var options = {
    host: 'api.stormpath.com',
    path: '/v1/accounts/' + params.id,
    //path: '/v1/accounts/225fOdCMfpwBqalfpGBqwr',
    port: 443,
    auth: params.key,
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(d) {
      callBack(null, d);
    });

  });
  req.write(JSON.stringify(params.data));
  req.end();

  req.on('error', function(e) {
    console.log(e);
    callBack(e, null);
  });

}


exports.createAccount = function(params, callBack){

  var options = {
    host: 'api.stormpath.com',
    path: 'https://api.stormpath.com/v1/directories/' + params.id + '/accounts',
    //path: 'https://api.stormpath.com/v1/directories/4J3XVpM6RFSabZKempZ6n5/accounts',
    port: 443,
    auth: params.key,
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }

  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(d) {
      callBack(null, d);
    });

  });
  req.write(JSON.stringify(params.data));
  req.end();

  req.on('error', function(e) {
    console.log(e);
    callBack(e, null);
  });

}

exports.deleteAccount = function(params, callBack){

  var options = {
    host: 'api.stormpath.com',
    path: '/v1/accounts/' + params.id,
    port: 443,
    auth: params.key,
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json'
    }
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(d) {
      callBack(null, "ok");
    });

  });
  req.end();

  req.on('error', function(e) {
    console.log(e);
    callBack(e, null);
  });

}



exports.authenticate = function(params, callBack){

  var options = {
    host: 'api.stormpath.com',
    path: '/v1/applications/' + params.id + "/loginAttempts",
    port: 443,
    auth: params.key,
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }
  };

  var attempt = {
    "type": "basic",
    "value": new Buffer(params.email+":"+params.password).toString('base64')
  }

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(d) {
      callBack(null, d);
    });

  });
  req.write(JSON.stringify(attempt));
  req.end();

  req.on('error', function(e) {
    console.log(e);
    callBack(e, null);
  });

}




