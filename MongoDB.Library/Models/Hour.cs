using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace MongoDB.Library.Models
{
    public class Hour
    {
        [BsonId]
        public int ID { get; set; }

        public TimeSpan Start { get; set; }

        public TimeSpan End { get; set; }

        public override string ToString() => $"{Start.ToString(@"hh\:mm")} - {End.ToString(@"hh\:mm")}";
    }
}
