using SMART.POC.Service.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMART.POC.Service.Models
{
    public interface IPropertyDescCode
    {
        /// <summary>
        /// Search data with given property description code and its description
        /// </summary>
        /// <param name="propertyDescriptionCodeDTO"></param>
        /// <returns>List of Property Description Codes</returns>
         List<PropertyDescriptionCodeDTO> Search(PropertyDescriptionCodeDTO propertyDescriptionCodeDTO);

        /// <summary>
        /// Insert data in property description code
        /// </summary>
        /// <param name="propertyDescriptionCodeDTO"></param>
        /// <returns>Added DTO</returns>
         PropertyDescriptionCodeDTO Add(PropertyDescriptionCodeDTO propertyDescriptionCodeDTO);

        /// <summary>
        /// Update Data in property description code
        /// </summary>
        /// <param name="propertyDescriptionCodeDTO"></param>
        /// <returns>Update DTO</returns>
         PropertyDescriptionCodeDTO Update(PropertyDescriptionCodeDTO propertyDescriptionCodeDTO);

        /// <summary>
        /// Delete property description code by given id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>deleted DTO</returns>
        PropertyDescriptionCodeDTO Delete(int id);

        /// <summary>
        /// Get property description code by given id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>DTO of property description code</returns>
         PropertyDescriptionCodeDTO FindById(int id);

        /// <summary>
        /// Serach data by filtering with the given page number
        /// </summary>
        /// <param name="pageNo"></param>
        /// <param name="propertyDescriptionCodeDTO"></param>
        /// <returns>List of DTOs filtered</returns>
         List<PropertyDescriptionCodeDTO> Search(int pageNo,PropertyDescriptionCodeDTO propertyDescriptionCodeDTO);
    }
}
