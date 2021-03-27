using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Library.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MongoDB.Library.Models
{
    public class Lesson
    {
        [BsonId]
        public Guid ID { get; set; }
        public string Student { get; set; }
        public string Name { get; set; }
        public int Day { get; set; }
        public Enums.Hour HourID { get; set; }
        public Duration Duration { get; set; }
        public string Week { get; set; }
        public string Room { get; set; }
    }
}
