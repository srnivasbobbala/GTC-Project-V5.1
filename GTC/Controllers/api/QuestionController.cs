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
        public IHttpActionResult Group()
        {
            return Ok(db.GetGroups());
        }

        [HttpGet]
        [Route("api/Question/Group")]
        public IHttpActionResult Group(int id)
        {
            return Ok(db.GetGroupById(id));
        }

        [HttpGet]
        [Route("api/Question/QuestionByGroup")]
        public IHttpActionResult QuestionByGroup(int groupId)
        {
            return Ok(db.QuestionByGroup(groupId));
        }


    }
}
