using MongoDB.Library.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MongoDB.Library.BOB
{
    public interface IBOBEmploiDuTemps
    {
        IList<DayEmploiDuTemps> Days { get; }

        Task GetEmploiDuTemps();
    }
}