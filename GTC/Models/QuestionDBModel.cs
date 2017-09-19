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
            IList<QuestionModel> questionsList = new List<QuestionModel>();

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

                    questionsList.Add(new QuestionModel
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
                        QuestionOptions = OptionsByQuestion(int.Parse(reader["ODSQuestionID"].ToString())),
                    });

                }
                response.ResponseId = 1;
                if (questionsList.Count > 0)
                    response.ResponseMessage = "Found Questions";
                else
                    response.ResponseMessage = "No Question found for this Group";
                response.Result = questionsList;
            }
            catch (Exception ex)
            {
                response.ResponseId = 0;
                response.ResponseMessage = ex.Message;
            }
            return response;
        }

        public IList<QuestionOptionsModel> OptionsByQuestion(int questionId)
        {
            IList<QuestionOptionsModel> QuestionOptions = new List<QuestionOptionsModel>();
            //QuestionOptions = null;
            try
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetOptionByQuestion";
                cmd.Parameters.AddWithValue("@ODSQuestionID", questionId);

                //conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    QuestionOptions.Add(new QuestionOptionsModel()
                    {
                        Id = int.Parse(reader["ODSQuestionOptionID"].ToString()),
                        Option = reader["QuestionOption"].ToString(),
                    });
                }
            }
            catch (Exception e)
            {
                return null;
            }
            return QuestionOptions;
        }
    }
}