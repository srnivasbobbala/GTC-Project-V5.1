using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class QuestionDBModel
    {
        private SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["GTCDB"].ConnectionString);

        public Response GetGroups()
        {
            IList<QuestionGroupModel> questionGroupModelList = new List<QuestionGroupModel>();
            Response response = new Response();
            try
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SP_GetQuestionGroup";

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    questionGroupModelList.Add(new QuestionGroupModel
                    {
                        QuestionGroupId = int.Parse(reader["ID"].ToString()),
                        QuestionGroupName = reader["QuestionGroupName"].ToString()
                    });
                }
                response.ResponseId = 1;
                if (questionGroupModelList.Count > 0)
                    response.ResponseMessage = "Found Question Groups";
                else
                    response.ResponseMessage = "No Question Groups Found";
                response.Result = questionGroupModelList;
            }
            catch (Exception ex)
            {
                response.ResponseId = 0;
                response.ResponseMessage = ex.Message;
            }
            return response;
        }
    }
}