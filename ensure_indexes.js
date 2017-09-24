// Ensure all collections in all databases have required
// indexes in scenario where collections and databases are
// created dynamically.

db = db.getSiblingDB('admin');
dbs = db.runCommand({ listDatabases: 1 }).databases;

dbs.forEach(function(database) {

  db = db.getSiblingDB(database.name);
  cols = db.getCollectionNames();

  cols.forEach(function(col) {
    skip = ['fs.chunks', 'fs.files', 'system.indexes'];
    if (skip.indexOf(col) > -1) return;

    db.getCollection(col).createIndex({ _record: 1 }, { background: true });
  });
});
