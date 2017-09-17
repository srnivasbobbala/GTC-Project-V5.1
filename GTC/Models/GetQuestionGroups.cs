using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace GTC.Models
{
    public class GetQuestionGroups
    {

        private SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["GTCDB"].ConnectionString);
        Response response = new Response();

        public IList<QuestionGroupModel> GetGroups()
        {
            IList<QuestionGroupModel> questionGroupModelList = new List<QuestionGroupModel>();
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
                }
                   
                );
                    
            }

                return questionGroupModelList;
        }
            catch (Exception ex)
            {
                Console.WriteLine("{0} Exception caught.", ex);
                return questionGroupModelList;
            }

            finally
            {
                conn.Close();
            }

        }



    }
}