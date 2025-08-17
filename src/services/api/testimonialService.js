import testimonialsData from "@/services/mockData/testimonials.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const testimonialService = {
  async getAll() {
    await delay(350);
    return [...testimonialsData];
  },

  async getById(id) {
    await delay(200);
    const testimonial = testimonialsData.find(t => t.Id === parseInt(id));
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }
    return { ...testimonial };
  },

  async create(testimonialData) {
    await delay(400);
    const newTestimonial = {
      ...testimonialData,
      Id: Math.max(...testimonialsData.map(t => t.Id)) + 1
    };
    testimonialsData.push(newTestimonial);
    return { ...newTestimonial };
  },

  async update(id, testimonialData) {
    await delay(300);
    const index = testimonialsData.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Testimonial not found");
    }
    testimonialsData[index] = { ...testimonialsData[index], ...testimonialData };
    return { ...testimonialsData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = testimonialsData.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Testimonial not found");
    }
    const deleted = testimonialsData.splice(index, 1)[0];
    return { ...deleted };
  }
};

export default testimonialService;