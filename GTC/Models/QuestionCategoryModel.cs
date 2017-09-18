using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class QuestionCategoryModel
    {
        public int ID { get; set; }

        public string Category { get; set; }

        public int Sequence { get; set; }
    }
}