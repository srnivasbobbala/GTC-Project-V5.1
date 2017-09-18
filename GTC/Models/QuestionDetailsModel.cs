using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class QuestionDetailsModel
    {
        public QuestionCategoryModel Group { get; set; }
        public QuestionModel Question { get; set; }
    }
}