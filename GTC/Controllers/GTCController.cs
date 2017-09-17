using GTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GTC.Controllers
{
    public class GTCController : ApiController
    {

        [HttpGet]
        [Route("api/GTC/GetGroup")]
        public IHttpActionResult Get( )
        {

            GetQuestionGroups getQuestiongroup = new GetQuestionGroups();

            return Ok(getQuestiongroup.GetGroups());
        }

       

        



    }
}
