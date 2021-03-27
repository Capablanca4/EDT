using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MongoDB.Library.DAO
{
    public interface IDAOAppDB
    {
        Task InsertRecord<T>(string table, T data);
        Task<IEnumerable<T>> GetRecords<T>(string table);
        Task<T> getRecordByID<T>(string table, Guid ID);
        Task UpdateRecord<T>(string table, Guid ID, T data);
        Task DeleteRecord<T>(string table, Guid ID);
    }
}