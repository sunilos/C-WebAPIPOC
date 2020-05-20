using SMART.POC.DTOs;
using log4net.Util;
using SMART.Common.Model;
using SMART.Common.Util;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SMART.POC.Models
{
    /// <summary>
    /// This Model Class have all Buisness and DataAccess Logics For PropertyDescriptionCode
    /// </summary>
    public class PropertyDescriptionCodeModel : BaseModel, IPropertyDescCode
    {
        public PropertyDescriptionCodeModel()
        {
            dbName = BaseModel.SMART_WEB_DB;
        }

        public PropertyDescriptionCodeModel(String db)
        {
            dbName = db;
        }

        #region "IPropertyDescCode"
        /**
        It deletes a PropertyDescCode using primary key id and returns PropertyDescCode details
        @id - Primary key of a PropertyDescCode
        @return PropertyDescriptionCodeDTO - PropertyDescCode details
        */
        public PropertyDescriptionCodeDTO Delete(int id)
        {
            PropertyDescriptionCodeDTO propertyDescCode = FindById(id);
            string sql = String.Format("Delete From [dbo].[r_Property_Desc_Code] Where ID = '{0}'",id);
            ExecuteUpdate(sql);
            return propertyDescCode;
        }

        /**
        It converts the DataReader object to PropertyDescriptionCodeDTO and returns PropertyDescCode details
        @propertyDescCode - DTO of PropertyDescCode
        @dataReader - Contains SQL query result 
        @return PropertyDescriptionCodeDTO - PropertyDescCode details
        */
        private PropertyDescriptionCodeDTO MakeDTO(PropertyDescriptionCodeDTO propertyDescCode, SqlDataReader dataReader) {
            propertyDescCode = new PropertyDescriptionCodeDTO();
            propertyDescCode.ID = ValidationUtility.ToInteger(dataReader["ID"].ToString());
            propertyDescCode.PropertyDescCode = ValidationUtility.ToString(dataReader["Property_Description_Code"].ToString());
            propertyDescCode.PropertyDescCodeDescription = ValidationUtility.ToString(dataReader["Property_Description_Code_Description"].ToString());
            propertyDescCode.CreateDate = ValidationUtility.ToDateTime(dataReader["Create_Date"].ToString());
            propertyDescCode.CreateUserID = ValidationUtility.ToString(dataReader["Create_User_ID"].ToString());
            propertyDescCode.LastUpdateDate = ValidationUtility.ToDateTime(dataReader["Last_Update_Date"].ToString());
            propertyDescCode.LastUpdateUserID = ValidationUtility.ToString(dataReader["Last_Update_User_ID"].ToString());
            propertyDescCode.LoanProgram = ValidationUtility.ToInteger(dataReader["Loan_Program"].ToString());
            return propertyDescCode;
        }

        /**
        It finds a PropertyDescCode using primary key id and returns PropertyDescCode details
        @id - Primary key of a PropertyDescCode
        @return PropertyDescriptionCodeDTO - PropertyDescCode details
        */
        public PropertyDescriptionCodeDTO FindById(int id)
        {
            PropertyDescriptionCodeDTO propertyDescCode = null;
            string sql = "Select * from [dbo].[r_Property_Desc_Code] Where ID = '{0}'";
            sql = string.Format(sql, id);
            using (SqlConnection con = OpenConnection())
            {
                using (SqlDataReader dataReader = ExecuteQuery(sql, con))
                {
                    if (dataReader.Read())
                    {
                        propertyDescCode = MakeDTO(propertyDescCode, dataReader);
                    }
                }
            }
            return propertyDescCode;
        }

        public List<PropertyDescriptionCodeDTO> Search(PropertyDescriptionCodeDTO propertyDescriptionCodeDTO)
        {
            List<PropertyDescriptionCodeDTO> list = new List<PropertyDescriptionCodeDTO>();

            string sql = "Select * from [dbo].[r_Property_Desc_Code] Where 1=1 ";
            sql = string.Format(sql, propertyDescriptionCodeDTO.PropertyDescCode);

            // if property description code is not null then filter with it too.
            if (!ValidationUtility.IsNull(propertyDescriptionCodeDTO.PropertyDescCodeDescription))
            {
                sql = String.Format(sql + " AND Property_Description_Code_Description = '{0}'", propertyDescriptionCodeDTO.PropertyDescCodeDescription);
            }
            if (!ValidationUtility.IsNull(propertyDescriptionCodeDTO.PropertyDescCode))
            {
                sql = String.Format(sql + " AND Property_Description_Code = '{0}'", propertyDescriptionCodeDTO.PropertyDescCode);
            }
            if (propertyDescriptionCodeDTO.LoanProgram > 0)
            {
                sql = String.Format(sql + " AND Loan_Program = '{0}'", propertyDescriptionCodeDTO.LoanProgram);
            }


            using (SqlConnection con = OpenConnection())
            {
                using (SqlDataReader dataReader = ExecuteQuery(sql, con))
                {
                    while (dataReader.Read())
                    {
                        list.Add(MakeDTO(null, dataReader));
                    }
                }
            }

            return list;
        }

        public Dictionary<int, string> DropDownList()
        {
            Dictionary<int, string> list = new Dictionary<int, string>();

            string sql = "Select ID, Property_Description_Code_Description  from [dbo].[r_Property_Desc_Code]";   

            using (SqlConnection con = OpenConnection())
            {
                using (SqlDataReader dataReader = ExecuteQuery(sql, con))
                {
                    while (dataReader.Read())
                    {
                        list.Add(ValidationUtility.ToInteger(dataReader["ID"].ToString()), dataReader["Property_Description_Code_Description"].ToString());
                    }
                }
            }

            return list;
        }

        public int RowCount(PropertyDescriptionCodeDTO propertyDescriptionCodeDTO)
        {
            int i = 0;

            string sql = "Select count(ID) CT from [dbo].[r_Property_Desc_Code] Where 1=1 ";

            // if property description code is not null then filter with it too.
            if (!ValidationUtility.IsNull(propertyDescriptionCodeDTO.PropertyDescCodeDescription))
            {
                sql = String.Format(sql + " AND Property_Description_Code_Description = '{0}'", propertyDescriptionCodeDTO.PropertyDescCodeDescription);
            }
            if (!ValidationUtility.IsNull(propertyDescriptionCodeDTO.PropertyDescCode))
            {
                sql = String.Format(sql + " AND Property_Description_Code = '{0}'", propertyDescriptionCodeDTO.PropertyDescCode);
            }
            if (propertyDescriptionCodeDTO.LoanProgram > 0)
            {
                sql = String.Format(sql + " AND Loan_Program = '{0}'", propertyDescriptionCodeDTO.LoanProgram);
            }

            using (SqlConnection con = OpenConnection())
            {
                using (SqlDataReader dataReader = ExecuteQuery(sql, con))
                {
                    while (dataReader.Read())
                    {
                        i = ValidationUtility.ToInteger(dataReader["CT"].ToString());
                    }
                }
            }

            return i;
        }

        public List<PropertyDescriptionCodeDTO> Search(int pageNo, PropertyDescriptionCodeDTO propertyDescriptionCodeDTO)
        {
            int pageSize = 10;
            int rowStart = (pageNo * pageSize) + 1;
            int rowEnd = rowStart + pageSize - 1;

            List<PropertyDescriptionCodeDTO> list = new List<PropertyDescriptionCodeDTO>();

            string sql = "SELECT  * FROM " +
                "(SELECT ROW_NUMBER() OVER(ORDER BY ID) AS RowNum, * FROM [dbo].[r_Property_Desc_Code] where 1=1 {0}) AS RowConstrainedResult" +
                " WHERE RowNum >= {1} AND RowNum< {2} ORDER BY RowNum";

            string where = "";
            // if property description code is not null then filter with it too.
            if (!ValidationUtility.IsNull(propertyDescriptionCodeDTO.PropertyDescCodeDescription))
            {
                where = String.Format(where + " AND Property_Description_Code_Description = '{0}'", propertyDescriptionCodeDTO.PropertyDescCodeDescription);
            }
            if (!ValidationUtility.IsNull(propertyDescriptionCodeDTO.PropertyDescCode))
            {
                where = String.Format(where + " AND Property_Description_Code = '{0}'", propertyDescriptionCodeDTO.PropertyDescCode);
            }
            if (propertyDescriptionCodeDTO.LoanProgram > 0)
            {
                where = String.Format(where + " AND Loan_Program = '{0}'", propertyDescriptionCodeDTO.LoanProgram);
            }

            sql = String.Format(sql, where, rowStart, rowEnd);

            using (SqlConnection con = OpenConnection())
            {
                using (SqlDataReader dataReader = ExecuteQuery(sql, con))
                {
                    while (dataReader.Read())
                    {
                        list.Add(MakeDTO(null, dataReader));
                    }
                }
            }
            return list;
        }

        public PropertyDescriptionCodeDTO Add(PropertyDescriptionCodeDTO propertyDescriptionCodeDTO)
        {
            PropertyDescriptionCodeDTO propertyDescCode = new PropertyDescriptionCodeDTO();
            propertyDescCode.LastUpdateDate = DateTime.Now;
            propertyDescCode.CreateDate = DateTime.Now;
            string sql = "INSERT INTO [dbo].[r_Property_Desc_Code] (" +
                "Property_Description_Code," +
                "Property_Description_Code_Description," +
                "Loan_Program," +
                "Create_Date," +
                "Create_User_ID," +
                "Last_Update_Date," +
                "Last_Update_User_ID" +
                ") Output Inserted.ID " +
                "VALUES("
                + "{0},"
                + "{1},"
                + "{2},"
                + "{3},"
                + "{4},"
                + "{5},"
                + "{6}"
                + ")";

            sql = String.Format(sql, SQLUtility.getString(propertyDescriptionCodeDTO.PropertyDescCode),
            SQLUtility.getString(propertyDescriptionCodeDTO.PropertyDescCodeDescription),
            SQLUtility.getInteger(propertyDescriptionCodeDTO.LoanProgram),
            SQLUtility.getDateTime(propertyDescriptionCodeDTO.CreateDate),
            SQLUtility.getString(propertyDescriptionCodeDTO.CreateUserID),
            SQLUtility.getDateTime(propertyDescriptionCodeDTO.LastUpdateDate),
            SQLUtility.getString(propertyDescriptionCodeDTO.CreateUserID)
            );

            using (SqlConnection con = OpenConnection())
            {
                using (SqlDataReader dataReader = ExecuteQuery(sql, con))
                {
                    while (dataReader.Read())
                    {
                        propertyDescCode.ID = ValidationUtility.ToInteger(dataReader["ID"].ToString());
                    }
                }
            }
            return propertyDescCode;
        }
        public PropertyDescriptionCodeDTO Update(PropertyDescriptionCodeDTO propertyDescriptionCodeDTO)
        {
            propertyDescriptionCodeDTO.LastUpdateDate = DateTime.Now;
          
            string sql = "UPDATE [dbo].[r_Property_Desc_Code] " +
                "SET Property_Description_Code = {0}, " +
                "Property_Description_Code_Description = {1}, " +
                "Loan_Program = {2}, " +
                "Last_Update_Date = {3}, " +
                "Last_Update_User_ID = {4} " +
                "WHERE ID = {5}";

            sql = String.Format(sql, SQLUtility.getString(propertyDescriptionCodeDTO.PropertyDescCode),
                SQLUtility.getString(propertyDescriptionCodeDTO.PropertyDescCodeDescription),
                SQLUtility.getInteger(propertyDescriptionCodeDTO.LoanProgram),
                SQLUtility.getDateTime(propertyDescriptionCodeDTO.LastUpdateDate),
                SQLUtility.getString(propertyDescriptionCodeDTO.LastUpdateUserID),
                SQLUtility.getInteger(propertyDescriptionCodeDTO.ID)
                );

            int i = ExecuteUpdate(sql);

            return propertyDescriptionCodeDTO;
        }
        #endregion
    }
}