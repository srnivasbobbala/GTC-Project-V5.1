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
        //private SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["GTCDB"].ConnectionString);
        private SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["newgtc"].ConnectionString);

        public Response GetGroups()
        {
            IList<GroupModel> questionGroupModelList = new List<GroupModel>();
            Response response = new Response();
            try
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SP_GetGroup";

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    questionGroupModelList.Add(new GroupModel
                    {
                        Id = int.Parse(reader["ID"].ToString()),
                        Title = reader["Title"].ToString(),
                        Tip = reader["Tip"].ToString(),
                        OrderId = int.Parse(reader["OrderId"].ToString()),
                        TableList = new TableListModel()
                        {
                            Id = int.Parse(reader["TableListId"].ToString()),
                        },
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
            GroupModel QuestionGroup = new GroupModel();
            return response;
        }

        public Response QuestionByGroup(int groupId)
        {
            IList<QuestionDetailsModel> QuestionDetails = new List<QuestionDetailsModel>();

            Response response = new Response();
            try
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SP_GetQuestionByGroup";
                cmd.Parameters.AddWithValue("@GroupId", groupId);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    
                    QuestionDetails.Add(new QuestionDetailsModel
                    {
                        Group = new GroupModel()
                        {
                            Id = int.Parse(reader["GroupId"].ToString()),
                            Title = reader["GroupTitle"].ToString(),
                            Tip = reader["GroupTip"].ToString(),
                            TableList = new TableListModel()
                            {
                                Id = int.Parse(reader["GroupTableListId"].ToString()),
                            },
                            OrderId = int.Parse(reader["GroupOrderId"].ToString()),
                        },
                        Question = new QuestionMasterModel()
                        {
                            Id = int.Parse(reader["QuestionId"].ToString()),
                            Title = reader["QuestionTitle"].ToString(),
                        },
                    });

                }
                response.ResponseId = 1;
                if (QuestionDetails.Count > 0)
                    response.ResponseMessage = "Found Questions";
                else
                    response.ResponseMessage = "No Question found for this Group";
                response.Result = QuestionDetails;
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