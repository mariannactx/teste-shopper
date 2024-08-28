print(' ');
print(' mongo-init ####################################### ');

const database = 'shopper';
db = db.getSiblingDB(database);
db.createUser({
  user: 'root',
  pwd: '0123456789',
  roles: [{ role: 'readWrite', db: database }],
});
db.createCollection('measures');
