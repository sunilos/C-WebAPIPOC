using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SMART.POC.DTOs
{
    /// <summary>
    /// This DTO is used to communicate between PropertyDescription Controller to Model
    /// </summary>
    public class PropertyDescriptionCodeDTO
    {
        private int _id;
        private String _PropertyDescCode = null;
        private String _PropertyDescCodeDescription = null;
        private DateTime _CreateDate;
        private String _CreateUserID = null;
        private DateTime _LastUpdateDate;
        private String _LastUpdateUserID = null;
        private int _LoanProgram = 0;

        /// <summary>
        /// Unique identification of property descriptiopn code
        /// </summary>
        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }

        /// <summary>
        /// Property description code
        /// </summary>
        public string PropertyDescCode
        {
            get { return _PropertyDescCode; }
            set { _PropertyDescCode = value; }
        }

        /// <summary>
        /// Description of property description code
        /// </summary>
        public string PropertyDescCodeDescription
        {
            get { return _PropertyDescCodeDescription; }
            set { _PropertyDescCodeDescription = value; }
        }

        /// <summary>
        /// Date of creation
        /// </summary>
        public DateTime CreateDate
        {
            get { return _CreateDate; }
            set { _CreateDate = value; }
        }

        /// <summary>
        /// User id of created user
        /// </summary>
        public string CreateUserID
        {
            get { return _CreateUserID; }
            set { _CreateUserID = value; }
        }

        /// <summary>
        /// Last date of update the code
        /// </summary>
        public DateTime LastUpdateDate
        {
            get { return _LastUpdateDate; }
            set { _LastUpdateDate = value; }
        }

        /// <summary>
        /// User id of user who update code at last
        /// </summary>
        public string LastUpdateUserID
        {
            get { return _LastUpdateUserID; }
            set { _LastUpdateUserID = value; }
        }

        /// <summary>
        /// Loan program
        /// </summary>
        public int LoanProgram
        {
            get { return _LoanProgram; }
            set { _LoanProgram = value; }
        }

    }
}