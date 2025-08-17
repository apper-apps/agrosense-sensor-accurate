const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let contactLeads = [];
let nextId = 1;

const contactService = {
  async submitLead(leadData) {
    await delay(500);
    
    const newLead = {
      ...leadData,
      Id: nextId++,
      submittedAt: new Date().toISOString(),
      status: "new"
    };
    
    contactLeads.push(newLead);
    return { ...newLead };
  },

  async getAll() {
    await delay(300);
    return [...contactLeads];
  },

  async getById(id) {
    await delay(200);
    const lead = contactLeads.find(l => l.Id === parseInt(id));
    if (!lead) {
      throw new Error("Lead not found");
    }
    return { ...lead };
  },

  async updateStatus(id, status) {
    await delay(250);
    const index = contactLeads.findIndex(l => l.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Lead not found");
    }
    contactLeads[index].status = status;
    contactLeads[index].updatedAt = new Date().toISOString();
    return { ...contactLeads[index] };
  },

  async delete(id) {
    await delay(250);
    const index = contactLeads.findIndex(l => l.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Lead not found");
    }
    const deleted = contactLeads.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default contactService;