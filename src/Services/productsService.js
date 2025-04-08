import supabase from "../helper/supabaseClient";
// Service for CRUD operations
const productService = {
  // Get all products
  getProducts: async () => {
    const { data, error } = await supabase.from("product").select("*");
    return { data, error };
  },

  // Get a single product by id
  getProductById: async (id) => {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .eq("id", id)
      .single(); // Fetch single row with ID
    return { data, error };
  },

  // Create a new product
  createProduct: async (product) => {
    const { data, error } = await supabase
      .from("product")
      .insert([product])
      .select();
    return { data, error };
  },

  // Update an existing product by id
  updateProduct: async (id, updatedProduct) => {
    const { data, error } = await supabase
      .from("product")
      .update(updatedProduct)
      .eq("id", id);
    return { data, error };
  },

  // Delete a product by id
  deleteProduct: async (id) => {
    const { data, error } = await supabase
      .from("product")
      .delete()
      .eq("id", id);
    return { data, error };
  },
};

export default productService;
