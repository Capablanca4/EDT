using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MongoDB.Library.Models
{
    public class HourEmploiDuTemps
    {
        public HourEmploiDuTemps(IEnumerable<Lesson> lessons, Enums.Hour hour)
        {
            Hour = hour;
            Lessons = DeepCopy(lessons).OrderBy(x => x.Duration);
        }

        private IEnumerable<Lesson> DeepCopy(IEnumerable<Lesson> lessons)
        {
            return JsonSerializer.Deserialize<IEnumerable<Lesson>>(JsonSerializer.Serialize(lessons));
        }

        public Enums.Hour Hour { get; private set; }
        public IEnumerable<Lesson> Lessons { get; private set; }
    }
}
