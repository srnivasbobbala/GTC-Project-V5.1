using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class QuestionMaster
    {
        public int QuestionMasterId { get; set; }

        public int TableNameId { get; set; }

        public string QuestionMasterName { get; set; }

        public string QuestionMasterDescription { get; set; }

        public bool ActiveIndicator { get; set; }

       
    }
}