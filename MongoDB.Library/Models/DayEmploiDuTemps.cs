using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace MongoDB.Library.Models
{
    public class DayEmploiDuTemps
    {
        public DayEmploiDuTemps(IEnumerable<Lesson> lessons, int day)
        {
            Hours = new List<HourEmploiDuTemps>();
            Day = day;
            IEnumerable<Enums.Hour> allHours = Enum.GetValues(typeof(Enums.Hour)).Cast<Enums.Hour>();
            foreach(Enums.Hour h in allHours)
            {
                Hours.Add(new HourEmploiDuTemps(lessons.Where(x => x.HourID == h), h));
            }
        }

        public int Day { get; private set; }
        public string Name { get => CultureInfo.GetCultureInfo("fr-FR").DateTimeFormat.DayNames[Day + 1].ToUpperInvariant(); }
        public IList<HourEmploiDuTemps> Hours { get; private set; }
    }
}
