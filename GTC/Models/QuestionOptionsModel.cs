using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class QuestionOptionsModel
    {
        public int Id { get; set; }
        public QuestionModel question { get; set; }
        public string Option { get; set; }

    }
}