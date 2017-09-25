using GTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GTC.Controllers.api
{
    public class ProfileController : ApiController
    {
        private DBModel db = new DBModel();

        [HttpPost]
        [Route("api/Login/")]
        public IHttpActionResult Login(Profile loginDetails)
        {
            return Ok(db.LoginUser(loginDetails));
        }
    }
}
