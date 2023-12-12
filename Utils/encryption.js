import bcrypt from "bcrypt";

export async function encrypt(password) {
  return await bcrypt.hash(password, 10);
}

export async function checkLogin(inputPassword, hashedPassword) {
  try {
    // Compare the input password with the stored hash
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match; // Returns true if the password matches, false otherwise
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
}
