using SMART.POC.Service.DTOs;
using SMART.POC.Service.Models;
using Microsoft.Web.Infrastructure.DynamicValidationHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SMART.POC.Service.Controllers
{
    /// <summary>
    /// This Controller communicate with Property Description Model to perform CRUD operation on PropertyDescCode
    /// </summary>
    [RoutePrefix("api/propertydescriptioncode")]
    public class PropertyDescriptionCodeController : ApiController
    {
        private PropertyDescriptionCodeModel _pdcModel = new PropertyDescriptionCodeModel();

        [HttpGet]
        [Route("get/{id:int}")]
        public IHttpActionResult Get([FromUri]int id)
        {
            Dictionary<string, object> response = new Dictionary<string, object>();
            try
            {
                PropertyDescriptionCodeDTO propDescCode = _pdcModel.FindById(id);

                if (propDescCode == null)
                {
                    response.Add("error", true);
                    response.Add("message", "Invalid ID! Data Not Found.");
                }
                else
                {
                    response.Add("error", false);
                    response.Add("message", "Record Found Successfully.");
                    response.Add("dto", propDescCode);
                }
            }
            catch (Exception ex) {
                response.Add("error", true);
                response.Add("message",ex.Message );
            }
            return Ok(response);
        }

        [HttpPost]
        [Route("add")]
        public IHttpActionResult Add([FromBody]PropertyDescriptionCodeDTO propDescCode)
        {
            Dictionary<string, object> response = new Dictionary<string, object>();
            try
            {
                propDescCode = _pdcModel.Add(propDescCode);
                    response.Add("error", false);
                    response.Add("Message", "Record Added Successfully.");
                    response.Add("dto", propDescCode);
            }
            catch (Exception ex)
            {
                response.Add("error", true);
                response.Add("message", ex.Message);
                response.Add("dto", propDescCode);
            }
            return Ok(response);
        }

        [HttpPost]
        [Route("update")]
        public IHttpActionResult Update([FromBody]PropertyDescriptionCodeDTO propDescCode)
        {
            Dictionary<string, object> response = new Dictionary<string, object>();
            try
            {
                propDescCode = _pdcModel.Update(propDescCode);
                response.Add("error", false);
                response.Add("message", "Record Updated Successfully.");
                response.Add("dto", propDescCode);
            }
            catch (Exception ex)
            {
                response.Add("error", true);
                response.Add("message", ex.Message);
                response.Add("dto", propDescCode);
            }
            return Ok(response);
        }

        [HttpGet]
        [Route("delete/{id:int}")]
        public IHttpActionResult Delete([FromUri]int id)
        {
            Dictionary<string, object> response = new Dictionary<string, object>();
            try
            {
                PropertyDescriptionCodeDTO propDescCode = _pdcModel.Delete(id);

                if (propDescCode == null)
                {
                    response.Add("error", true);
                    response.Add("message", "Invalid Request! Data Not Found");
                }
                else
                {
                    response.Add("error", false);
                    response.Add("message", "Record Deleted Successfully.");
                    response.Add("dto", propDescCode);
                }
            }
            catch (Exception ex)
            {
                response.Add("error", true);
                response.Add("message", ex.Message);
            }
            return Ok(response);
        }

        [HttpPost]
        [Route("search/{pageNo:int}")]
        public IHttpActionResult Search([FromUri]int pageNo, [FromBody]PropertyDescriptionCodeDTO propertyDescriptionCodeDTO)
        {
            Dictionary<string, object> response = new Dictionary<string, object>();
            try
            {
                List<PropertyDescriptionCodeDTO> list = _pdcModel.Search(pageNo, propertyDescriptionCodeDTO);
                int count = _pdcModel.RowCount(propertyDescriptionCodeDTO);

                response.Add("list", list);
                response.Add("rowCount", count);

                if (!list.Any())
                {
                    response.Add("error", true);
                    response.Add("message", "No Record Found.");
                }
                else
                {
                    response.Add("error", false);
                    response.Add("message", "Record Searched Successfully.");
                }
            }
            catch (Exception ex)
            {
                response.Add("error", true);
                response.Add("message",ex.Message);
            }
            return Ok(response);
        }
    }
}
