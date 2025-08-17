const resourceService = {
  async getAll() {
    try {
      const tableName = 'resource_c';
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "read_time_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "author_c" } },
          { field: { Name: "author_image_c" } },
          { field: { Name: "image_c" } }
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
        console.error(response?.message || "Failed to fetch resources");
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching resources:", error?.response?.data?.message);
      } else {
        console.error("Error fetching resources:", error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const tableName = 'resource_c';
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "read_time_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "author_c" } },
          { field: { Name: "author_image_c" } },
          { field: { Name: "image_c" } }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response || !response.success) {
        throw new Error(response?.message || "Resource not found");
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching resource with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching resource with ID ${id}:`, error.message);
      }
      throw error;
    }
  },

  async getByCategory(category) {
    try {
      const tableName = 'resource_c';
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "read_time_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "author_c" } },
          { field: { Name: "author_image_c" } },
          { field: { Name: "image_c" } }
        ],
        where: [
          {
            FieldName: "category_c",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response || !response.success) {
        console.error(response?.message || "Failed to fetch resources by category");
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching resources by category:", error?.response?.data?.message);
      } else {
        console.error("Error fetching resources by category:", error.message);
      }
      return [];
    }
  },

  async create(resourceData) {
    try {
      const tableName = 'resource_c';
      const params = {
        records: [{
          Name: resourceData.Name,
          title_c: resourceData.title_c,
          description_c: resourceData.description_c,
          category_c: resourceData.category_c,
          type_c: resourceData.type_c,
          read_time_c: resourceData.read_time_c,
          date_c: resourceData.date_c,
          author_c: resourceData.author_c,
          author_image_c: resourceData.author_image_c,
          image_c: resourceData.image_c
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
          console.error(`Failed to create resource ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating resource:", error?.response?.data?.message);
      } else {
        console.error("Error creating resource:", error.message);
      }
      throw error;
    }
  },

  async update(id, resourceData) {
    try {
      const tableName = 'resource_c';
      const updateData = {};
      if (resourceData.Name !== undefined) updateData.Name = resourceData.Name;
      if (resourceData.title_c !== undefined) updateData.title_c = resourceData.title_c;
      if (resourceData.description_c !== undefined) updateData.description_c = resourceData.description_c;
      if (resourceData.category_c !== undefined) updateData.category_c = resourceData.category_c;
      if (resourceData.type_c !== undefined) updateData.type_c = resourceData.type_c;
      if (resourceData.read_time_c !== undefined) updateData.read_time_c = resourceData.read_time_c;
      if (resourceData.date_c !== undefined) updateData.date_c = resourceData.date_c;
      if (resourceData.author_c !== undefined) updateData.author_c = resourceData.author_c;
      if (resourceData.author_image_c !== undefined) updateData.author_image_c = resourceData.author_image_c;
      if (resourceData.image_c !== undefined) updateData.image_c = resourceData.image_c;
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...updateData
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
          console.error(`Failed to update resource ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error updating resource:", error?.response?.data?.message);
      } else {
        console.error("Error updating resource:", error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const tableName = 'resource_c';
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
          console.error(`Failed to delete resource ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting resource:", error?.response?.data?.message);
      } else {
        console.error("Error deleting resource:", error.message);
      }
      throw error;
    }
  }
};

export default resourceService;