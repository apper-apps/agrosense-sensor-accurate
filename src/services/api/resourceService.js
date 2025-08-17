import resourcesData from "@/services/mockData/resources.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const resourceService = {
  async getAll() {
    await delay(300);
    return [...resourcesData];
  },

  async getById(id) {
    await delay(200);
    const resource = resourcesData.find(r => r.Id === parseInt(id));
    if (!resource) {
      throw new Error("Resource not found");
    }
    return { ...resource };
  },

  async getByCategory(category) {
    await delay(250);
    return resourcesData.filter(r => r.category === category).map(r => ({ ...r }));
  },

  async create(resourceData) {
    await delay(400);
    const newResource = {
      ...resourceData,
      Id: Math.max(...resourcesData.map(r => r.Id)) + 1
    };
    resourcesData.push(newResource);
    return { ...newResource };
  },

  async update(id, resourceData) {
    await delay(300);
    const index = resourcesData.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Resource not found");
    }
    resourcesData[index] = { ...resourcesData[index], ...resourceData };
    return { ...resourcesData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = resourcesData.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Resource not found");
    }
    const deleted = resourcesData.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default resourceService;