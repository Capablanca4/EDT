using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MongoDB.Library.DAO
{
    public class DAOAppDB : IDAOAppDB
    {
        private readonly IMongoDatabase _db;

        public DAOAppDB(string connectionString, string dataBase)
        {
            var client = new MongoClient(connectionString);
            _db = client.GetDatabase(dataBase);
        }

        public async Task InsertRecord<T>(string table, T data)
        {
            var collection = _db.GetCollection<T>(table);
            await collection.InsertOneAsync(data);
        }
        
        public async Task<IEnumerable<T>> GetRecords<T>(string table)
        {
            var collection = _db.GetCollection<T>(table);
            var document = await collection.FindAsync(new BsonDocument());
            return document.ToList();
        }

        public async Task<T> getRecordByID<T>(string table, Guid ID)
        {
            var collection = _db.GetCollection<T>(table);
            var filters = Builders<T>.Filter.Eq("ID", ID);
            var document = await collection.FindAsync(filters);
            return document.FirstOrDefault();
        }

        public async Task UpdateRecord<T>(string table, Guid ID, T data)
        {
            var collection = _db.GetCollection<T>(table);
            await collection.ReplaceOneAsync(new BsonDocument("_id", ID), data, new ReplaceOptions { IsUpsert = true });
        }

        public async Task DeleteRecord<T>(string table, Guid ID)
        {
            var collection = _db.GetCollection<T>(table);
            var filters = Builders<T>.Filter.Eq("ID", ID);
            await collection.DeleteOneAsync(filters);
        }
    }
}
