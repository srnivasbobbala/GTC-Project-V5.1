using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class QuestionModel
    {
        public int ID { get; set; }

        public string Question { get; set; }

        public QuestionTypeModel QuestionType { get; set; }

        public int QuestionSequence { get; set; }

        public bool QuestionMandatory { get; set; }

        public QuestionCategoryModel QuestionCategory { get; set; }

        public IList<QuestionOptionsModel> QuestionOptions { get; set; }

        public string QuestionAnswer { get; set; }

    }
}