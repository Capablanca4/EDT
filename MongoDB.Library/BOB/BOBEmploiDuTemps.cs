using MongoDB.Library.DAO;
using MongoDB.Library.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace MongoDB.Library.BOB
{
    public class BOBEmploiDuTemps : IBOBEmploiDuTemps
    {
        private readonly IDAOAppDB _dAOAppDB;

        public BOBEmploiDuTemps(IDAOAppDB dAOAppDB)
        {
            _dAOAppDB = dAOAppDB;
        }

        public async Task GetEmploiDuTemps()
        {
            IEnumerable<Lesson> lessons = await _dAOAppDB.GetRecords<Lesson>("Lesson");
            Days = new List<DayEmploiDuTemps>();
            //Create the content of each Day
            for (int i = 0; i < 5; i++)
            {
                Days.Add(new DayEmploiDuTemps(lessons.Where(x => x.Day == i), i));
            }
        }

        public IList<DayEmploiDuTemps> Days { get; private set; }
    }
}
