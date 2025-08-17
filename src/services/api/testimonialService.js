const testimonialService = {
  async getAll() {
    try {
      const tableName = 'testimonial_c';
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "farmer_name_c" } },
          { field: { Name: "farm_location_c" } },
          { field: { Name: "crop_type_c" } },
          { field: { Name: "results_c" } },
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
        console.error(response?.message || "Failed to fetch testimonials");
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching testimonials:", error?.response?.data?.message);
      } else {
        console.error("Error fetching testimonials:", error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const tableName = 'testimonial_c';
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "farmer_name_c" } },
          { field: { Name: "farm_location_c" } },
          { field: { Name: "crop_type_c" } },
          { field: { Name: "results_c" } },
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
        throw new Error(response?.message || "Testimonial not found");
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching testimonial with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching testimonial with ID ${id}:`, error.message);
      }
      throw error;
    }
  },

  async create(testimonialData) {
    try {
      const tableName = 'testimonial_c';
      const params = {
        records: [{
          Name: testimonialData.Name,
          farmer_name_c: testimonialData.farmer_name_c,
          farm_location_c: testimonialData.farm_location_c,
          crop_type_c: testimonialData.crop_type_c,
          results_c: testimonialData.results_c,
          image_c: testimonialData.image_c
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
          console.error(`Failed to create testimonial ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating testimonial:", error?.response?.data?.message);
      } else {
        console.error("Error creating testimonial:", error.message);
      }
      throw error;
    }
  },

  async update(id, testimonialData) {
    try {
      const tableName = 'testimonial_c';
      const updateData = {};
      if (testimonialData.Name !== undefined) updateData.Name = testimonialData.Name;
      if (testimonialData.farmer_name_c !== undefined) updateData.farmer_name_c = testimonialData.farmer_name_c;
      if (testimonialData.farm_location_c !== undefined) updateData.farm_location_c = testimonialData.farm_location_c;
      if (testimonialData.crop_type_c !== undefined) updateData.crop_type_c = testimonialData.crop_type_c;
      if (testimonialData.results_c !== undefined) updateData.results_c = testimonialData.results_c;
      if (testimonialData.image_c !== undefined) updateData.image_c = testimonialData.image_c;
      
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
          console.error(`Failed to update testimonial ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error updating testimonial:", error?.response?.data?.message);
      } else {
        console.error("Error updating testimonial:", error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const tableName = 'testimonial_c';
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
          console.error(`Failed to delete testimonial ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting testimonial:", error?.response?.data?.message);
      } else {
        console.error("Error deleting testimonial:", error.message);
      }
      throw error;
    }
  }
};

export default testimonialService;