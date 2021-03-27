using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Library.BOB;
using MongoDB.Library.DAO;
using MongoDB.Library.Models;

namespace MongoDB.WebApp.Controllers
{
    public class CallendarController : Controller
    {
        private readonly ILogger<CallendarController> _logger;
        private readonly IDAOAppDB _dAOAppDB;

        public CallendarController(ILogger<CallendarController> logger, IDAOAppDB dAOAppDB)
        {
            _logger = logger;
            _dAOAppDB = dAOAppDB;
        }
        
        public async Task<IActionResult> Index()
        {
            /*await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 0, Start = new TimeSpan(8, 10, 0), End = new TimeSpan(9, 0, 0) });
            await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 1, Start = new TimeSpan(9, 05, 0), End = new TimeSpan(9, 55, 0) });
            await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 2, Start = new TimeSpan(10, 5, 0), End = new TimeSpan(10, 55, 0) });
            await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 3, Start = new TimeSpan(11, 0, 0), End = new TimeSpan(11, 50, 0) });
            await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 4, Start = new TimeSpan(11, 55, 0), End = new TimeSpan(12, 45, 0) });
            await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 5, Start = new TimeSpan(12, 55, 0), End = new TimeSpan(13, 45, 0) });
            await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 6, Start = new TimeSpan(13, 50, 0), End = new TimeSpan(14, 40, 0) });
            await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 7, Start = new TimeSpan(14, 45, 0), End = new TimeSpan(15, 35, 0) });
            await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 8, Start = new TimeSpan(15, 45, 0), End = new TimeSpan(16, 35, 0) });
            await _dAOAppDB.InsertRecord("Hour", new Hour() { ID = 9, Start = new TimeSpan(16, 40, 0), End = new TimeSpan(17, 30, 0) });*/
            ViewBag.hours = await _dAOAppDB.GetRecords<Hour>("Hour");
            BOBEmploiDuTemps Model = new BOBEmploiDuTemps(_dAOAppDB);
            await Model.GetEmploiDuTemps();
            return View(Model);
        }

        [HttpPost]
        public async Task CreateLesson([FromForm] Lesson lesson)
        {
            await _dAOAppDB.InsertRecord("Lesson", lesson);
        }

        [HttpPatch]
        public async Task UpdateLesson([FromForm] Lesson lesson)
        {
            await _dAOAppDB.UpdateRecord("Lesson", lesson.ID, lesson);
        }

        [HttpDelete]
        public async Task DeleteLesson([FromForm] Guid ID)
        {
            await _dAOAppDB.DeleteRecord<Lesson>("Lesson", ID);
        }
    }
}
