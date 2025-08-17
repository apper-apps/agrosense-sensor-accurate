const productService = {
  async getAll() {
    try {
      const tableName = 'product_c';
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "price_c" } },
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
        console.error(response?.message || "Failed to fetch products");
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products:", error?.response?.data?.message);
      } else {
        console.error("Error fetching products:", error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const tableName = 'product_c';
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "price_c" } },
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
        throw new Error(response?.message || "Product not found");
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching product with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching product with ID ${id}:`, error.message);
      }
      throw error;
    }
  },

  async create(productData) {
    try {
      const tableName = 'product_c';
      const params = {
        records: [{
          Name: productData.Name,
          description_c: productData.description_c,
          features_c: Array.isArray(productData.features_c) 
            ? productData.features_c.join(',') 
            : productData.features_c,
          price_c: parseFloat(productData.price_c) || 0,
          image_c: productData.image_c
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
          console.error(`Failed to create product ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating product:", error?.response?.data?.message);
      } else {
        console.error("Error creating product:", error.message);
      }
      throw error;
    }
  },

  async update(id, productData) {
    try {
      const tableName = 'product_c';
      const updateData = {};
      if (productData.Name !== undefined) updateData.Name = productData.Name;
      if (productData.description_c !== undefined) updateData.description_c = productData.description_c;
      if (productData.features_c !== undefined) {
        updateData.features_c = Array.isArray(productData.features_c) 
          ? productData.features_c.join(',') 
          : productData.features_c;
      }
      if (productData.price_c !== undefined) updateData.price_c = parseFloat(productData.price_c) || 0;
      if (productData.image_c !== undefined) updateData.image_c = productData.image_c;
      
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
          console.error(`Failed to update product ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error updating product:", error?.response?.data?.message);
      } else {
        console.error("Error updating product:", error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const tableName = 'product_c';
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
          console.error(`Failed to delete product ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting product:", error?.response?.data?.message);
      } else {
        console.error("Error deleting product:", error.message);
      }
      throw error;
    }
  }
};

export default productService;