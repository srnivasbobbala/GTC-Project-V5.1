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
        //private SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["RemoteGTCDB"].ConnectionString);
        private SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["LocalGTCDB"].ConnectionString);

        public Response GetGroups()
        {
            IList<QuestionCategoryModel> questionGroupModelList = new List<QuestionCategoryModel>();
            Response response = new Response();
            try
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetQuestionsCategory";

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    questionGroupModelList.Add(new QuestionCategoryModel
                    {
                        ID = int.Parse(reader["ODSQuestionCategoryID"].ToString()),
                        Category = reader["ODSQuestionCategory"].ToString(),
                        Sequence = int.Parse(reader["ODSQuestionCategorySequence"].ToString()),
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

        public Response GetGroupById(int id)
        {
            Response response = new Response();
            QuestionCategoryModel QuestionGroup = new QuestionCategoryModel();
            return response;
        }

        public Response QuestionByGroup(int groupId)
        {
            IList<QuestionModel> Question = new List<QuestionModel>();

            Response response = new Response();
            try
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetQuestionsByCategory";
                cmd.Parameters.AddWithValue("@ODSQuestionCategoryID", groupId);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {

                    Question.Add(new QuestionModel
                    {
                        ID = int.Parse(reader["ODSQuestionID"].ToString()),
                        Question = reader["ODSQuestion"].ToString(),
                        QuestionCategory = new QuestionCategoryModel()
                        {
                            ID = int.Parse(reader["ODSQuestionCategoryID"].ToString()),
                        },
                        QuestionType = new QuestionTypeModel()
                        {
                            ID = int.Parse(reader["ODSQuestionTypeID"].ToString()),
                        },
                        QuestionMandatory = bool.Parse(reader["ODSQuestionMandatory"].ToString()),
                        QuestionSequence = int.Parse(reader["ODSQuestionSequence"].ToString()),
                    });

                }
                response.ResponseId = 1;
                if (Question.Count > 0)
                    response.ResponseMessage = "Found Questions";
                else
                    response.ResponseMessage = "No Question found for this Group";
                response.Result = Question;
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