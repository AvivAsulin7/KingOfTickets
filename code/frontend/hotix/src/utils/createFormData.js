export const createFormData = (ticket) => {
  let formData = new FormData();
  formData.append("age", ticket.age);
  formData.append("price", ticket.price);
  formData.append("row", ticket.row);
  formData.append("seat", ticket.seat);
  formData.append("area", ticket.area);
  formData.append("type", ticket.type);
  formData.append("pdf_file", ticket.pdf_file);
  formData.append("id_owner", ticket.id_owner);
  formData.append("id_event", ticket.id_event);
  return formData;
};
