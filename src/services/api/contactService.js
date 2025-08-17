const contactService = {
  async submitLead(leadData) {
    try {
      const tableName = 'contact_lead_c';
      const params = {
        records: [{
          Name: leadData.name,
          email_c: leadData.email,
          phone_c: leadData.phone,
          farm_size_c: parseInt(leadData.farmSize) || 0,
          region_c: leadData.region,
          message_c: leadData.message,
          submitted_at_c: new Date().toISOString(),
          status_c: "new"
        }]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create contact lead ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error submitting contact lead:", error?.response?.data?.message);
      } else {
        console.error("Error submitting contact lead:", error.message);
      }
      throw error;
    }
  },

  async getAll() {
    try {
      const tableName = 'contact_lead_c';
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "farm_size_c" } },
          { field: { Name: "region_c" } },
          { field: { Name: "message_c" } },
          { field: { Name: "submitted_at_c" } },
          { field: { Name: "status_c" } }
        ],
        orderBy: [{ fieldName: "Id", sorttype: "DESC" }]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response || !response.success) {
        console.error(response?.message || "Failed to fetch contact leads");
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching contact leads:", error?.response?.data?.message);
      } else {
        console.error("Error fetching contact leads:", error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const tableName = 'contact_lead_c';
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "farm_size_c" } },
          { field: { Name: "region_c" } },
          { field: { Name: "message_c" } },
          { field: { Name: "submitted_at_c" } },
          { field: { Name: "status_c" } }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response || !response.success) {
        throw new Error(response?.message || "Contact lead not found");
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching contact lead with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching contact lead with ID ${id}:`, error.message);
      }
      throw error;
    }
  },

  async updateStatus(id, status) {
    try {
      const tableName = 'contact_lead_c';
      const params = {
        records: [{
          Id: parseInt(id),
          status_c: status
        }]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update contact lead status ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        const successfulUpdates = response.results.filter(result => result.success);
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating contact lead status:", error?.response?.data?.message);
      } else {
        console.error("Error updating contact lead status:", error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const tableName = 'contact_lead_c';
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete contact lead ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting contact lead:", error?.response?.data?.message);
      } else {
        console.error("Error deleting contact lead:", error.message);
      }
      throw error;
    }
  }
};
export default contactService;