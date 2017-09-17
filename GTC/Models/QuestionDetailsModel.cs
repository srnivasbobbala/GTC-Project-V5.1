using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class QuestionDetailsModel
    {
        public GroupModel Group { get; set; }
        public QuestionMasterModel Question { get; set; }
    }
}