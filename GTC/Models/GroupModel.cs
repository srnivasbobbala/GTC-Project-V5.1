using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class GroupModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public TableListModel TableList { get; set; }

        public string Tip { get; set; }

        public int OrderId { get; set; }
    }
}