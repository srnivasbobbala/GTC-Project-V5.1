using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string EmailID { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
    }
}