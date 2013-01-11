#TribeHR Interface for Node
===
**Author: [Nick Crohn](http://github.com/ncrohn)**

This is a module to provide an interface into TribeHR's API.

### Usage

```
var TribeHrApi = require('tribehr');

var tribehr = TribeHrApi();

/* 
 * Can also set options directly without calling configuration
 */

tribe.configure(function() {
  tribe.set('site', 'example-site');
});

tribe.configure('development', function() {
  tribe.set('username', 'dev-user');
  tribe.set('password', 'dev-password-apikey');  // Can be either password or generated API key
});

tribe.configure('production', function() {
  tribe.set('username', 'prod-user');
  tribe.set('password', 'prod-password-apikey');  // Can be either password or generated API key
});

tribe.listen(); // Used for setting configuration and setting routes for webhooks


// User Records

tribe.list(TribeHrApi.User, function(err, records) {
  if(err) console.log(err);
  
  // returns list of user records
});

var user = new TribeHrApi.User({ id: 2 });

tribe.get(user, function(err, record) {
  if(err) console.log(err);
  
  // returns a hydrated user record
});

var newUser = new TribeHrApi.User({
  "group_id": 3,
  "skip_invite": 1,                                                                                                                                                                                                                                                                                     
  "username": "jdoe",
  "email": "john.doe@meltmedia.com",
  "employee_record": {
    "first_name": "John",
    "middle_name": "M",
    "last_name": "Doe",
    "phone": "480-390-9440"
  },
  "assignment_record": {
    "effective_date": "2012-9-10",
    "date_hired": "2012-9-10",
    "status": 0,
    "pay_type": 1
  }
});

tribe.create(newUser, function(err, record) {
  if(err) console.log(err);
  
  // returns the record with hydrated read-only fields from TribeHR
});

newUser.set('username', 'johndoe');

tribe.update(newUser, function(err, record) {
  if(err) console.log(err);
  
  // returns the updated record
});

tribe.remove('newUser', function(err) {
  if(err) console.log(err);
  
  // will throw an error if remove was unsuccessful.
});

```

### Tests

You will need to specify a config.json file in the ```test``` directory that follows the format below.

```
{
  "site": "test-site",
  "username": "test-user",
  "password": "test-pass-apikey"
}
```

To run test cases simply run the command below.

```
npm test
```

#### Apache License
Copyright ©2013 meltmedia