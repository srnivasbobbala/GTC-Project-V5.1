using GTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GTC.Controllers.api
{
    public class QuestionController : ApiController
    {
        private QuestionDBModel db = new QuestionDBModel();

        [HttpGet]
        [Route("api/Question/Group")]
        public IHttpActionResult Get()
        {
            return Ok(db.GetGroups());
        }
    }
}
